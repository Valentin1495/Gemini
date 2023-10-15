'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Pencil2Icon } from '@radix-ui/react-icons';

export default function WriteButton() {
  const { data: session } = useSession();
  const router = useRouter();

  const email = session?.user?.email;
  const username = session?.user?.name;

  const writeNewStory = async () => {
    const data = {
      author: email,
      username,
      prompt: '',
      story: '',
      timestamp: serverTimestamp(),
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
