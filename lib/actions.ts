'use server';

// import { image } from '@/types';
// import { createImage } from './create-image';
// import { generatePrompt } from './generate-prompt';
import talkToGenmini from './talk-to-gemini';

export async function generateAnswer(formData: FormData) {
  try {
    const msg = formData.get('msg') as string;
    const answer = await talkToGenmini(msg);

    return { answer };
  } catch (error) {
    throw new Error('Failed to generate answer');
  }
}

// export async function generateImagePrompt(formData: FormData) {
//   try {
//     const context = formData.get('context') as string;
//     const prompt = await generatePrompt(context);

//     return { prompt };
//   } catch (error) {
//     throw new Error('Failed to generate prompt');
//   }
// }

// export async function getImageUrl(formData: FormData) {
//   try {
//     const prompt = formData.get('prompt') as string;
//     const sampleAmount = formData.get('amount') as string;

//     const imageData = await createImage(prompt, parseInt(sampleAmount));

//     return { imageUrls: imageData.images as image[] };
//   } catch (error) {
//     throw new Error('Failed to get image url');
//   }
// }
