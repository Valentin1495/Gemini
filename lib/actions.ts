'use server';

import { image } from '@/types';
import { generateImage } from './generate-image';
import talkToGemini from './talk-to-gemini';

export async function generateAnswer(formData: FormData) {
  try {
    const msg = formData.get('msg') as string;
    const answer = await talkToGemini(msg);

    return { answer };
  } catch (error) {
    throw new Error('Failed to generate answer');
  }
}

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
