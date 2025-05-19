import 'dotenv/config';
import express, { Request, Response } from 'express';
import { BASE_PROMPT, getSystemPrompt } from './prompts';
import { basePrompt as nodeBasePrompt } from './defaults/node';
import { basePrompt as reactBasePrompt } from './defaults/react';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/template', async (req: Request, res: Response): Promise<void> => {
  const userPrompt = req.body.prompt;

  try {
    const response = await fetch(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: process.env.MODEL,
          messages: [
            {
              role: 'user',
              content: userPrompt,
            },
            {
              role: 'system',
              content:
                "Return either node or react based on what do you think this project should be. Only return a single word either 'node' or 'react'. Do not return anything extra",
            },
          ],
        }),
      },
    );

    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content?.trim().toLowerCase();

    if (answer === 'react') {
      res.json({
        prompts: [
          BASE_PROMPT,
          `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`,
        ],
        uiPrompts: [reactBasePrompt],
      });
      return;
    }

    if (answer === 'node') {
      res.json({
        prompts: [
          BASE_PROMPT,
          `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${nodeBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`,
        ],
        uiPrompts: [nodeBasePrompt],
      });
      return;
    }

    res
      .status(403)
      .json({ message: 'You cannot access this. Invalid model response.' });
  } catch (error) {
    console.error('Error fetching from OpenRouter:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/chat', async (req: Request, res: Response): Promise<void> => {
  const messages = req.body.messages;

  try {
    const response = await fetch(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: process.env.MODEL,
          messages: messages,
        }),
      },
    );

    const data = await response.json();

    const aiReply = data.choices?.[0]?.message?.content ?? '';

    res.json({ response: aiReply });
  } catch (error) {
    console.error('Error in /chat:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
