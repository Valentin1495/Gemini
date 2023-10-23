'use client';

import { useRouter } from 'next/navigation';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Pencil2Icon } from '@radix-ui/react-icons';
import { User } from '@/types';

export default function WriteButton({ user }: { user: User }) {
  const router = useRouter();

  const { email, name } = user;

  const writeNewStory = async () => {
    const data = {
      author: email,
      username: name,
      prompt: '',
      story: '',
      timestamp: Date.now(),
    };

    const doc = await addDoc(collection(db, 'drafts'), data);

    router.push(`/new_story?story_id=${doc.id}`);
  };

  return (
    <button
      className='w-full text-left flex items-center gap-x-1.5'
      onClick={writeNewStory}
    >
      <Pencil2Icon className='w-6 h-6' />
      Write
    </button>
  );
}
