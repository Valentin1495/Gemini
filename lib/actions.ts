'use server';

import { createImage } from './create-image';
import { generatePrompt } from './generate-prompt';
import { makeUpStory } from './make-up-story';
import { Redis } from '@upstash/redis';

export async function createStory(formData: FormData) {
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL as string,
    token: process.env.UPSTASH_REDIS_REST_TOKEN as string,
  });

  try {
    const topic = formData.get('topic') as string;
    const story = await makeUpStory(topic);

    // const imageData = await createImage(topic);
    // const imageUrl = imageData.images[0].image;
  } catch (error: any) {
    return { message: error.message };
  }
}

export async function generateImagePrompt(formData: FormData) {
  try {
    const context = formData.get('context') as string;
    const prompt = await generatePrompt(context);
    return { prompt };
  } catch (error: any) {
    return { message: error.message };
  }
}
