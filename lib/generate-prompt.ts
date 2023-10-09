import { discussServiceClient } from './discuss-service-client';

export const generatePrompt = async (context: string) => {
  const messages = [
    {
      content: `
      Suggest 3 prompts clearly labeled '1.', '2.', and '3.'. Make sure each topic is based on this context: ${context}, and in a short single sentence.
      `,
    },
  ];

  const examples = [
    {
      input: {
        content: `
        Suggest 3 prompts clearly labeled '1.', '2.', and '3.'. Make sure each topic is in a short single sentence, and base them on this context: a cute cat. 
`,
      },
      output: {
        content: `
        1. A playful tabby cat captured in a funny pose, caught in mid-jump, high-quality image, colorful background, playful expression, cute and natural lighting.
        2. A close-up shot of a sleek black cat with mesmerizing yellow-green eyes, bathed in golden sunlight, unique angle, detailed focus on pointy ears, fine whiskers, and shiny coat, exquisite and elegant.
        3. A charming calico cat lounging on a soft, cozy blanket, captured in a comfortable and relaxed pose, natural surroundings, soft lighting, and detailed focus on the cute pink nose and fluffy tail, high-resolution.
        `,
      },
    },
  ];

  const response = await discussServiceClient.generateMessage({
    model: 'models/chat-bison-001',
    temperature: 1, // Optional. Value `0.0` always uses the highest-probability result.
    candidateCount: 1, // Optional. The number of candidate results to generate.
    prompt: {
      // optional, preamble context to prime responses
      // context:
      //   '',
      // Optional. Examples for further fine-tuning of responses.
      examples,
      // Required. Alternating prompt/response messages.
      messages,
    },
  });

  const answer = response[0].candidates![0].content;

  return answer;
};
