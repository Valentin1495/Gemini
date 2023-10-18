'use client';

import { db } from '@/lib/firebase';
import { TrashIcon } from '@radix-ui/react-icons';
import { deleteDoc, doc } from 'firebase/firestore';
import { Dispatch, SetStateAction } from 'react';
import toast from 'react-hot-toast';

type Props = {
  storyId: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function DeleteButton({ storyId, setOpen }: Props) {
  const deleteStory = async () => {
    await deleteDoc(doc(db, 'published', storyId));
    setOpen(false);
    toast('Deleted a story', {
      icon: '🗑️',
    });
  };

  return (
    <button
      onClick={deleteStory}
      className='hover:opacity-75 transition absolute -right-20'
    >
      <TrashIcon className='w-6 h-6 text-destructive' />
    </button>
  );
}
