import { NextResponse } from 'next/server';
import { generateResponse } from '@/configs/AiModel';

export async function POST(request) {
  const { prompt } = await request.json();
  try {
    const message = await generateResponse(prompt);
    return NextResponse.json({ message });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
