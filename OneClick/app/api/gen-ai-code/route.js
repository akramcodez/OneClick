import { NextResponse } from 'next/server';
import { generateCode } from '@/configs/AiModel';

export async function POST(request) {
  const { prompt } = await request.json();
  try {
    const code = await generateCode(prompt);
    return NextResponse.json(JSON.parse(code));
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
