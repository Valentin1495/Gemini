'use server';

import { createImage } from './create-image';
import { generatePrompt } from './generate-prompt';
import { makeUpStory } from './make-up-story';

export async function createStory(formData: FormData) {
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
