'use server';

import { getServerSession } from 'next-auth';
import { createImage } from './create-image';
import { generatePrompt } from './generate-prompt';
import { makeUpStory } from './make-up-story';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { revalidatePath } from 'next/cache';
import { redis } from './redis';

export async function createStory(formData: FormData) {
  const session = await getServerSession(options);
  const email = session?.user?.email as string;

  try {
    const topic = formData.get('topic') as string;
    const story = await makeUpStory(topic);
    // const imageData = await createImage(topic);
    // const url = imageData.images[0].image;

    const post = {
      createdAt: new Date(),
      story,
    };

    await redis.lpush(`user:${email}:posts`, JSON.stringify(post));

    revalidatePath('/dashboard');
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
