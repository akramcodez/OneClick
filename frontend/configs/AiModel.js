export async function generateResponse(prompt) {
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_URL}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      },
    );

    const payload = await res.json();
    console.log('🧪 raw fetch status:', res.status, 'body:', payload);

    if (!res.ok) {
      throw new Error(payload.error?.message || 'Failed to fetch response');
    }

    const text = payload.candidates?.[0]?.content?.parts?.[0]?.text;
    return text;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
