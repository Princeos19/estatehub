export const config = { runtime: 'edge' }

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  try {
    const { messages, listings } = await req.json()
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY

    if (!GEMINI_API_KEY) {
      return new Response(JSON.stringify({ error: 'AI service not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const listingsContext = (listings || []).map((l) =>
      `ID:${l.id} | ${l.title} | ${l.priceLabel} | ${l.location} | ${l.bedrooms}bed/${l.bathrooms}bath | ${l.type} | ${l.status}`
    ).join('\n')

    const systemPrompt = `You are EstateHub's friendly AI property assistant for a real estate website in Accra, Ghana.

Your job:
- Help visitors find properties based on their needs (budget, location, bedrooms, type)
- Answer questions about buying, renting, and the property process
- Be warm, concise, and helpful — keep responses short (2-4 sentences)
- When recommending specific properties, mention them by title and ALWAYS include their ID in this exact format: [PROPERTY:id] so the website can show a card for it
- If asked something unrelated to real estate, politely redirect to property topics
- Never make up properties that aren't in the list below

CURRENT AVAILABLE PROPERTIES:
${listingsContext || 'No properties currently loaded.'}

Keep responses conversational and brief. If recommending properties, mention 1-3 max with their [PROPERTY:id] tags.`

    const contents = messages.map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }))

    const response = await fetch(
`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents,
          systemInstruction: { parts: [{ text: systemPrompt }] },
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 300,
          },
        }),
      }
    )

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error?.message || 'AI request failed')
    }

    const data = await response.json()
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I had trouble responding. Please try again.'

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}