// === CONFIGURATION ===
const GenerationConfig = {
  default: {
    model: 'gemini-2.0-flash',
    temperature: 1,
    maxOutputTokens: 10000,
    topP: 0.95,
    topK: 40,
    responseMimeType: 'text/plain',
  },
  code: {
    model: 'gemini-2.0-flash',
    temperature: 1,
    maxOutputTokens: 10000,
    topP: 0.95,
    topK: 40,
    responseMimeType: 'application/json',
  },
};

// === HISTORY TRACKING (only for code generation) ===
let codeChatHistory = [
  {
    role: 'user',
    parts: [{ text: 'Hello' }],
  },
  {
    role: 'model',
    parts: [{ text: 'Great to meet you. What would you like to know?' }],
  },
];

// === INTERNAL: GENERATE CONTENT ===
async function generateContent(prompt, configType = 'default') {
  const config = GenerationConfig[configType];
  let contentsToSend;

  if (configType === 'code') {
    codeChatHistory.push({
      role: 'user',
      parts: [{ text: prompt }],
    });

    if (codeChatHistory.length > 20) {
      codeChatHistory.shift();
    }

    contentsToSend = codeChatHistory;
  } else {
    contentsToSend = [
      {
        role: 'user',
        parts: [{ text: prompt }],
      },
    ];
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${config.model}:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_URL}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: contentsToSend,
        generationConfig: {
          temperature: config.temperature,
          maxOutputTokens: config.maxOutputTokens,
          topP: config.topP,
          topK: config.topK,
          responseMimeType: config.responseMimeType,
        },
      }),
    },
  );

  const payload = await response.json();
  console.log('📡 Gemini response:', response.status, payload);

  if (!response.ok) {
    throw new Error(payload.error?.message || 'Failed to fetch response');
  }

  const modelReply = payload.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!modelReply) {
    throw new Error('No valid response from model');
  }

  if (configType === 'code') {
    codeChatHistory.push({
      role: 'model',
      parts: [{ text: modelReply }],
    });
  }

  return modelReply;
}

// === PUBLIC API ===
export async function generateResponse(prompt) {
  return generateContent(prompt, 'default');
}

export async function generateCode(prompt) {
  return generateContent(prompt, 'code');
}
