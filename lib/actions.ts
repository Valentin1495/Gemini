'use server';

import { image } from '@/types';
import { createImage } from './create-image';
import { generatePrompt } from './generate-prompt';
import { generateSynopsis } from './generate-synopsis';

export async function createSynopsis(formData: FormData) {
  try {
    const topic = formData.get('topic') as string;
    const synopsis = await generateSynopsis(topic);

    return { synopsis };
  } catch (error) {
    throw new Error('Failed to create synopsis');
  }
}

export async function generateImagePrompt(formData: FormData) {
  try {
    const context = formData.get('context') as string;
    const prompt = await generatePrompt(context);

    return { prompt };
  } catch (error) {
    throw new Error('Failed to generate prompt');
  }
}

export async function getImageUrl(formData: FormData) {
  try {
    const prompt = formData.get('prompt') as string;
    const sampleAmount = formData.get('amount') as string;

    const imageData = await createImage(prompt, parseInt(sampleAmount));

    return { imageUrls: imageData.images as image[] };
  } catch (error) {
    throw new Error('Failed to get image url');
  }
}
