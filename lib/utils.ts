import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Msg, chatParams } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function generateImage(prompt: string, samples: number) {
  const response = await fetch(process.env.KAKAO_API_URL as string, {
    method: 'POST',
    headers: {
      Authorization: `KakaoAK ${process.env.KAKAO_API_KEY as string}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt,
      samples,
    }),
  });

  const data = await response.json();

  return data;
}

export function scrollToDocumentBottom() {
  const scrollingElement = document.scrollingElement || document.body;
  scrollingElement.scrollTop = scrollingElement.scrollHeight;
}

export function startChat(chatHistory: Msg[]) {
  const genAI = new GoogleGenerativeAI(
    process.env.NEXT_PUBLIC_GEMINI_API_KEY as string
  );
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const chat = model.startChat({
    // history: chatHistory,
    generationConfig: {
      maxOutputTokens: 2048,
    },
  });

  return chat;
}

export async function updateUI({
  setModelParts,
  chatHistory,
  setChatHistory,
  getResult,
  streaming,
}: chatParams) {
  try {
    const result = await getResult();

    if (streaming) {
      for await (const chunk of result.stream) {
        // Get first candidate's current text chunk
        const chunkText = chunk.text();

        setModelParts((prev) => {
          // Find the index of the last modelMsg in chatHistory
          const lastIndex = chatHistory.findLastIndex(
            (msg) => msg.role === 'model'
          );

          if (lastIndex !== -1) {
            // If found, create a new array with the modified parts property
            const updatedChatHistory = [...chatHistory];
            updatedChatHistory[lastIndex] = {
              role: 'model',
              parts: prev + chunkText,
            };

            // Update the state with the modified chatHistory
            setChatHistory(updatedChatHistory);
          }

          return prev + chunkText; // Update the state with the modified value
        });
      }
    } else {
      const response = await result.response;

      setModelParts(response.text());
    }
  } catch (error) {
    console.error(error);
  }

  scrollToDocumentBottom();
}
