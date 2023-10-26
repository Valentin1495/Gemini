import { textServiceClient } from '@/lib/text-service-client';

export async function POST(req: Request) {
  const { topic } = await req.json();

  const response = await textServiceClient.generateText({
    model: 'models/text-bison-001',
    temperature: 1, // Optional. Value `0.0` always uses the highest-probability result.
    candidateCount: 1, // Optional. The number of candidate results to generate.
    maxOutputTokens: 800,
    prompt: {
      text: `Write a story about ${topic}.`,
    },
  });

  const answer = response[0].candidates![0].output;

  return Response.json({ story: answer });
}
