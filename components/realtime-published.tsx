'use client';

import { db } from '@/lib/firebase';
import { PublishedType } from '@/types';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Published from './published';
import { ReaderIcon } from '@radix-ui/react-icons';
import StorySkeleton from './story-skeleton';
import { Skeleton } from './ui/skeleton';

type Props = {
  author: string;
};

export default function RealtimePublished({ author }: Props) {
  const [publishedList, setPublishedList] = useState<PublishedType[]>();

  const q = query(
    collection(db, 'published'),
    where('author', '==', author),
    orderBy('timestamp', 'desc')
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const list = snapshot.docs.map((doc) => {
          return { ...doc.data(), storyId: doc.id };
        }) as PublishedType[];
        setPublishedList(list);
      },
      (error) => {
        toast.error(error.message);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [q]);

  if (!publishedList)
    return (
      <div className='space-y-5'>
        <Skeleton className='w-10 h-5 mt-10' />
        <StorySkeleton />
      </div>
    );

  return (
    <div className='space-y-5'>
      <span className='flex items-center gap-x-1.5 mt-10'>
        <ReaderIcon className='w-5 h-5' />
        {publishedList.length}
      </span>

      <section className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1.5'>
        {publishedList.length ? (
          publishedList.map((story) => (
            <Published key={story.storyId} {...story} />
          ))
        ) : (
          <p>You have no stories.</p>
        )}
      </section>
    </div>
  );
}
