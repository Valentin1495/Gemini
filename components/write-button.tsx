'use client';

import { useRouter } from 'next/navigation';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { User } from '@/types';
import { cn } from '@/lib/utils';

type Props = {
  user: User;
  hidden: boolean;
};

export default function WriteButton({ user, hidden }: Props) {
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
      <span className={cn(hidden && 'hidden sm:inline')}>Write</span>
    </button>
  );
}
