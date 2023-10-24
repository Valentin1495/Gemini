'use server';

import { createImage } from './create-image';
import { generatePrompt } from './generate-prompt';
import { makeUpStory } from './make-up-story';
import { uploadFile } from './upload-file';

export async function createStory(formData: FormData) {
  try {
    const topic = formData.get('topic') as string;
    const synopsis = await makeUpStory(topic);

    return { synopsis };
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

export async function getNewImageUrl(formData: FormData) {
  try {
    const prompt = formData.get('prompt') as string;
    const imageData = await createImage(prompt);
    const url = imageData.images[0].image;
    const newImageUrl = await uploadFile(url, prompt);

    return { newImageUrl };
  } catch (error: any) {
    return { message: error.message };
  }
}
