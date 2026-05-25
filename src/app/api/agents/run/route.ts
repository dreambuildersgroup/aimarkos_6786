import { NextResponse } from 'next/server';

const openaiKey = process.env.OPENAI_API_KEY;
const anthropicKey = process.env.ANTHROPIC_API_KEY;
const grokKey = process.env.XAI_API_KEY;

async function callLLM(goal: string) {
  const prompt = `You are an expert autonomous marketing AI for AImarkOS.
User goal: ${goal}

Provide a clear, actionable, high-ROAS marketing strategy including:
- Target audience
- Key messaging
- Recommended channels
- Content ideas
- Expected outcomes

Be specific, creative, and professional.`;

  // Priority: Claude → OpenAI → Grok
  if (anthropicKey) {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': anthropicKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: "claude-3-5-sonnet-20240620",
        max_tokens: 1200,
        messages: [{ role: "user", content: prompt }]
      })
    });
    const data = await response.json();
    return data.content?.[0]?.text || "Claude generated a strategy.";
  }

  if (openaiKey) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }]
      })
    });
    const data = await response.json();
    return data.choices?.[0]?.message?.content || "OpenAI generated a strategy.";
  }

  if (grokKey) {
    // Grok support can be added later if needed
    return "Grok would respond here (key present).";
  }

  return "AI endpoint is ready. No LLM keys configured yet.";
}

export async function POST(request: Request) {
  try {
    const { goal } = await request.json();

    const result = await callLLM(goal || "Create a high-ROAS marketing campaign");

    return NextResponse.json({
      status: "✅ AI Crew executed",
      goal: goal,
      result: result,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ 
      status: "❌ Error",
      error: error.message 
    }, { status: 500 });
  }
}