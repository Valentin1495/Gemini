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

type Props = {
  author: string;
};

export default function RealtimePublished({ author }: Props) {
  const [publishedList, setPublishedList] = useState<PublishedType[]>();
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      },
      (error) => {
        toast.error(error.message);
        setLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-10'>
      {publishedList?.length
        ? publishedList.map((story) => (
            <Published key={story.storyId} {...story} />
          ))
        : !loading && <p>You have no stories.</p>}
      {loading && <p>loading...</p>}
    </div>
  );
}
