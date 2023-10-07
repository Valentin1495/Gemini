import { DiscussServiceClient } from '@google-ai/generativelanguage';
import { GoogleAuth } from 'google-auth-library';

export const generatePrompt = async (context: string) => {
  const MODEL_NAME = 'models/chat-bison-001';
  const API_KEY = process.env.PALM_API_KEY;
  const client = new DiscussServiceClient({
    authClient: new GoogleAuth().fromAPIKey(API_KEY as string),
  });
  const messages = [
    {
      content: `
      
      `,
    },
  ];

  const response = await client.generateMessage({
    model: MODEL_NAME,
    temperature: 0.8, // Optional. Value `0.0` always uses the highest-probability result.
    candidateCount: 1, // Optional. The number of candidate results to generate.
    prompt: {
      // optional, preamble context to prime responses
      // context:
      //   '',
      // Optional. Examples for further fine-tuning of responses.
      examples: [
        {
          input: {
            content: `
`,
          },
          output: {
            content: `
            
            `,
          },
        },
      ],
      // Required. Alternating prompt/response messages.
      messages,
    },
  });

  const answer = response[0].candidates![0].content;

  return answer;
};
