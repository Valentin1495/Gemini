'use server';

import { image } from '@/lib/types';
import { generateImage } from '../lib/utils';
// import talkToGemini from './start-chat';

// export async function generateAnswer(formData: FormData) {
//   try {
//     const msg = formData.get('msg') as string;
//     const result = await talkToGemini();

//     return { result };
//   } catch (error) {
//     throw new Error('Failed to generate answer');
//   }
// }

export async function getImageUrls(formData: FormData) {
  try {
    const prompt = formData.get('prompt') as string;
    const sampleAmount = formData.get('amount') as string;

    const imageData = await generateImage(prompt, parseInt(sampleAmount));

    return { imageUrls: imageData.images as image[] };
  } catch (error) {
    throw new Error('Failed to get image url');
  }
}
