import { GoogleGenerativeAI } from '@google/generative-ai';

const talkToGenmini = async (msg: string) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const chat = model.startChat({
    history: [
      {
        role: 'user',
        parts: 'Hello, Gemini!',
      },
      {
        role: 'model',
        parts: 'Great to meet you. What would you like to know?',
      },
    ],
    generationConfig: {
      maxOutputTokens: 2048,
    },
  });

  // const msg = "How many paws are in my house?";

  const result = await chat.sendMessage(msg);
  const response = result.response;
  const text = response.text();

  return text;
};

export default talkToGenmini;
