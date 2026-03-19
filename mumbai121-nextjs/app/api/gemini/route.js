import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { questions, answers, category } = await request.json()

    const pairs = questions.map((q, i) => `Q${i + 1}: ${q}\nAnswer: ${answers[i]}`).join('\n\n')
    const prompt = `You are an expert HR interview evaluator for freshers applying to Mumbai startups and small companies.

Evaluate the following ${questions.length} interview answers for the job category: "${category}".

For each answer, give:
1. A score out of 10 (be fair but honest — a one-line answer should not score above 4)
2. Brief feedback in 1–2 sentences on what was good and how to improve

Respond ONLY in this exact JSON format, no extra text:
{
  "evaluations": [
    { "score": 7, "feedback": "Good answer with clear examples. Try to be more specific about outcomes." }
  ]
}

Here are the answers:

${pairs}`

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.3, maxOutputTokens: 2048 },
        }),
      }
    )

    if (!response.ok) {
      const err = await response.json()
      return NextResponse.json({ error: err?.error?.message || `HTTP ${response.status}` }, { status: response.status })
    }

    const data = await response.json()
    const parts = data.candidates?.[0]?.content?.parts || []
    const raw = parts.map(p => p.text || '').join('')
    if (!raw.trim()) return NextResponse.json({ error: 'Empty response from Gemini.' }, { status: 500 })

    const jsonMatch = raw.match(/\{[\s\S]*\}/)
    if (!jsonMatch) return NextResponse.json({ error: 'Could not parse Gemini response.' }, { status: 500 })

    const parsed = JSON.parse(jsonMatch[0])
    return NextResponse.json(parsed)

  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}