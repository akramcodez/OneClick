import { GoogleGenAI } from '@google/genai';

// Log to verify it's coming through
console.log('⚙️ GEMINI_API_KEY:', process.env.NEXT_PUBLIC_GEMINI_API_URL);

const genAI = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_URL, // ← server-only env var
});

export async function generateResponse(prompt) {
  console.log('🧠 Prompt received:', prompt);
  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash', // or 'gemini-2.0-flash-exp' if you have access
    });
    const result = await model.generateContent(prompt);
    const text = await result.response.text();
    console.log('🤖 raw response:', text);
    return text;
  } catch (error) {
    console.error('❌ Error in generateResponse:', error);
    throw error;
  }
}
