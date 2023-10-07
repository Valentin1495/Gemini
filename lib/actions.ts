'use server';

import { createImage } from './create-image';
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
