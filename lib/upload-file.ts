import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from './firebase';

export async function uploadFile(imageUrl: string, prompt: string) {
  try {
    const response = await fetch(imageUrl);
    const buffer = await response.arrayBuffer();
    const fileName = prompt.replace(' ', '') + Date.now + '.jpeg';
    const storageRef = ref(storage, fileName);
    await uploadBytes(storageRef, buffer, {
      contentType: 'image/jpeg',
    });
    const newImageUrl = await getDownloadURL(storageRef);

    return newImageUrl;
  } catch (error) {
    console.error(error);
  }
}
