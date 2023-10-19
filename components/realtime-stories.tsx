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
import Story from './story';

export default function RealtimeStories() {
  const [allPublished, setAllPublished] = useState<PublishedType[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'published'), orderBy('timestamp', 'desc'));

    const unsub = onSnapshot(
      q,
      (snapshot) => {
        const allPublishedList = snapshot.docs.map((doc) =>
          doc.data()
        ) as PublishedType[];
        setAllPublished(allPublishedList);
        setLoading(false);
      },
      (error) => {
        toast.error(error.message);
        setLoading(false);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  return (
    <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
      {allPublished?.length
        ? allPublished.map((story) => <Story key={story.storyId} {...story} />)
        : !loading && <p>You have no stories.</p>}
      {loading && <p>loading...</p>}
    </div>
  );
}
