'use client';

import { db } from '@/lib/firebase';
import { PublishedType } from '@/types';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import Story from './story';
import StorySkeleton from './story-skeleton';
import { useToast } from './ui/use-toast';

export default function RealtimeStories() {
  const [allPublished, setAllPublished] = useState<PublishedType[]>();
  const { toast } = useToast();

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
        toast({ variant: 'destructive', title: error.message });
      }
    );

    return () => {
      unsub();
    };
  }, []);

  if (!allPublished)
    return <StorySkeleton className='story-skeleton-container' length={15} />;

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
