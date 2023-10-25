'use client';

import { db } from '@/lib/firebase';
import { PublishedType } from '@/types';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Story from './story';
import StorySkeleton from './story-skeleton';

export default function RealtimeStories() {
  const [allPublished, setAllPublished] = useState<PublishedType[]>();

  useEffect(() => {
    const q = query(collection(db, 'published'), orderBy('timestamp', 'desc'));

    const unsub = onSnapshot(
      q,
      (snapshot) => {
        const allPublishedList = snapshot.docs.map((doc) =>
          doc.data()
        ) as PublishedType[];
        setAllPublished(allPublishedList);
      },
      (error) => {
        toast.error(error.message);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  if (!allPublished) return <StorySkeleton />;

  return (
    <div className='story-skeleton-container'>
      {allPublished.length ? (
        allPublished.map((story) => <Story key={story.storyId} {...story} />)
      ) : (
        <p>There are no stories.</p>
      )}
    </div>
  );
}
