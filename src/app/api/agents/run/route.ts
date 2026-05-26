import { NextResponse } from 'next/server';

const openaiKey = process.env.OPENAI_API_KEY;
const anthropicKey = process.env.ANTHROPIC_API_KEY;

async function generateStrategy(goal: string) {
  const prompt = `You are an expert autonomous marketing strategist for AImarkOS.

User goal: ${goal}

Deliver a professional, high-ROAS marketing strategy with this exact structure:

**Target Audience**
- Primary personas
- Key pain points and desires

**Key Messaging**
- Core value proposition
- 3 strong headline ideas

**Recommended Channels**
- Best platforms and why

**Content Ideas**
- 4-5 specific, ready-to-use content concepts

**Expected Results**
- Projected ROAS or KPIs
- Success benchmarks

**Actionable Next Steps**
- Clear, immediate actions

Be specific, creative and results-focused.`;

  // Claude first (best for strategy)
  if (anthropicKey) {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': anthropicKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: "claude-3-5-sonnet-20240620",
        max_tokens: 1400,
        messages: [{ role: "user", content: prompt }]
      })
    });
    const data = await res.json();
    return data.content?.[0]?.text || "Strategy generated.";
  }

  // Fallback to OpenAI
  if (openaiKey) {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
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
    const data = await res.json();
    return data.choices?.[0]?.message?.content || "Strategy generated.";
  }

  return "AI is ready but no LLM keys are configured yet.";
}

export async function POST(request: Request) {
  try {
    const { goal } = await request.json();

    const result = await generateStrategy(goal || "Create a high-ROAS marketing campaign");

    return NextResponse.json({
      status: "✅ AI Crew executed",
      goal: goal,
      result: result,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ status: "❌ Error", error: error.message }, { status: 500 });
  }
}
