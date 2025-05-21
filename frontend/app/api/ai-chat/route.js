import { NextResponse } from 'next/server';
import { generateResponse } from '@/configs/AiModel';

export async function POST(request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 },
      );
    }

    // real AI invocation
    const AIres = await generateResponse(prompt);
    console.log('🤖 AI responded:', AIres);

    // return under “message” so your front end doesn’t break
    return NextResponse.json({ message: AIres });
  } catch (error) {
    console.error('❌ Error in /api/ai-chat:', error);
    return NextResponse.json(
      { error: 'Error generating response' },
      { status: 500 },
    );
  }
}
