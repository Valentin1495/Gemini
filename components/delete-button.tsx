'use client';

import { db } from '@/lib/firebase';
import { TrashIcon } from '@radix-ui/react-icons';
import { deleteDoc, doc } from 'firebase/firestore';
import { Dispatch, SetStateAction } from 'react';
import { useToast } from './ui/use-toast';

type Props = {
  storyId: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function DeleteButton({ storyId, setOpen }: Props) {
  const { toast } = useToast();

  const deleteStory = async () => {
    await deleteDoc(doc(db, 'published', storyId));
    setOpen(false);
    toast({ title: '🗑️ Deleted a story.' });
  };

  return (
    <button
      onClick={deleteStory}
      className='hover:opacity-75 transition absolute -right-8 sm:-right-20'
    >
      <TrashIcon className='w-6 h-6 text-destructive' />
    </button>
  );
}
