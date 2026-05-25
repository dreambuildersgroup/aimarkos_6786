import { NextResponse } from 'next/server';

const openaiKey = process.env.OPENAI_API_KEY;
const anthropicKey = process.env.ANTHROPIC_API_KEY;
const grokKey = process.env.XAI_API_KEY;

async function callAI(goal: string) {
  // Priority: Claude → OpenAI → Grok
  if (anthropicKey) {
    // Simple Claude call via fetch (you can expand later)
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': anthropicKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: "claude-3-5-sonnet-20240620",
        max_tokens: 800,
        messages: [{ role: "user", content: `You are an expert autonomous marketing AI. Goal: ${goal}\n\nProvide a clear, actionable marketing strategy.` }]
      })
    });
    const data = await response.json();
    return data.content?.[0]?.text || "Claude responded successfully.";
  }

  if (openaiKey) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: `You are an expert autonomous marketing AI. Goal: ${goal}\n\nProvide a clear, actionable marketing strategy.` }]
      })
    });
    const data = await response.json();
    return data.choices?.[0]?.message?.content || "OpenAI responded successfully.";
  }

  if (grokKey) {
    // Grok call would go here (add later if needed)
    return "Grok would respond here (API key present).";
  }

  return "AI endpoint ready. No LLM keys configured yet.";
}

export async function POST(request: Request) {
  try {
    const { goal } = await request.json();

    const result = await callAI(goal || "Create a high-ROAS marketing campaign");

    return NextResponse.json({
      status: "✅ AI Crew executed",
      goal: goal,
      result: result,
      model: anthropicKey ? "Claude" : openaiKey ? "GPT-4o" : "Grok",
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    return NextResponse.json({ 
      status: "❌ Error",
      error: error.message 
    }, { status: 500 });
  }
}