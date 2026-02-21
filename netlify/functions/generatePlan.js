import Anthropic from "@anthropic-ai/sdk";

export async function handler(event) {
  try {
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const body = JSON.parse(event.body || "{}");

    const userInput = body.input || "exam revision";

    const message = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1000,
      messages: [
        {
          role: "user",
          content: `Create a last-minute study plan for ${userInput}.
Break it into days, priorities, and key topics.`,
        },
      ],
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        plan: message.content[0].text,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message,
      }),
    };
  }
}
