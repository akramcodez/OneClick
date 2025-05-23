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

async function generateContent(prompt, configType = 'default') {
  try {
    const config = GenerationConfig[configType];
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${config.model}:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_URL}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
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

    const payload = await res.json();
    console.log('🧪 raw fetch status:', res.status, 'body:', payload);

    if (!res.ok) {
      throw new Error(payload.error?.message || 'Failed to fetch response');
    }

    const text = payload.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      throw new Error('No text content found in response');
    }

    // Parse JSON if responseMimeType is 'application/json'
    return text;
  } catch (err) {
    console.error(`Error generating content (${configType}):`, err);
    throw err;
  }
}

export async function generateResponse(prompt) {
  return generateContent(prompt, 'default');
}

export async function generateCode(prompt) {
  return generateContent(prompt, 'code');
}
