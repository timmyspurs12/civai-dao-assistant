import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { proposalText, category } = await req.json();

    if (!proposalText || proposalText.trim().length < 50) {
      return NextResponse.json({ error: "Proposal too short" }, { status: 400 });
    }

    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: `You are an expert governance analyst for DAOs and decentralized communities.

Analyze this ${category} proposal and return ONLY valid JSON — no markdown, no explanation, no extra text.

{
  "summary": "2-3 sentence executive summary",
  "benefits": ["benefit 1", "benefit 2", "benefit 3"],
  "risks": ["risk 1", "risk 2", "risk 3"],
  "stakeholderImpact": "2-3 sentences on stakeholder effects",
  "recommendation": "Support",
  "reasoning": "2-3 sentences explaining the recommendation",
  "nextSteps": ["step 1", "step 2", "step 3"]
}

PROPOSAL:
${proposalText}`,
        },
      ],
    });

    const text = response.choices[0].message.content ?? "";
    const cleaned = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);
    console.log("API RESPONSE:", JSON.stringify(parsed, null, 2));

    return NextResponse.json(parsed);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Analysis failed" }, { status: 500 });
  }
}