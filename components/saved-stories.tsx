'use client';

import { db } from '@/lib/firebase';
import { truncate } from '@/lib/utils';
import { format } from 'date-fns';
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { Session } from 'next-auth';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { BookmarkMinus } from 'lucide-react';
import { toast } from 'sonner';
import { Skeleton } from './ui/skeleton';

type Story = {
  id: string;
  email: string;
  username: string;
  story: string;
  timestamp: number;
};

export default function SavedStories({ session }: { session: Session | null }) {
  const email = session?.user?.email;
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const q = query(
      collection(db, 'stories'),
      where('email', '==', email),
      orderBy('timestamp', 'desc')
    );

    const unsub = onSnapshot(
      q,
      (querySnapshot) => {
        const data = querySnapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as Story)
        );

        setStories((prev) => [...prev, ...data]);
        setLoading(false);
      },

      (error) => {
        toast('⛔' + error.message);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  const deleteStory = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'stories', id));

      toast('🪦 Deleted story!');
    } catch (error: any) {
      toast('❌' + error.message);
    }
  };

  if (loading)
    return (
      <div className='space-y-5'>
        <Skeleton className='w-full h-32 rounded-md' />
        <Skeleton className='w-full h-32 rounded-md' />
        <Skeleton className='w-full h-32 rounded-md' />
        <Skeleton className='w-full h-32 rounded-md' />
      </div>
    );

  if (!stories.length)
    return (
      <div className='text-center'>
        <h1 className='text-lg text-primary'>No stories from Gemini</h1>
        <h2 className='text-primary/60'>
          Save a story and it will appear here.
        </h2>
      </div>
    );

  return (
    <div className='space-y-5'>
      {stories.map((el) => {
        const { username, story, id, timestamp } = el;
        const modifiedUsername = username.split(' ').join('');
        const slicedStory = truncate(story, 200);
        const formattedDate = format(new Date(timestamp), 'MM/dd/yyyy');

        return (
          <div key={id} className='flex flex-col bg-primary/5 p-3 rounded-md'>
            <Link href={`/@${modifiedUsername}/${id}`} className=''>
              {slicedStory}
            </Link>
            <section className='flex items-center'>
              <span className='text-primary/75 text-sm'>
                Saved on {formattedDate}
              </span>
              <Button variant='ghost' onClick={() => deleteStory(id)}>
                <BookmarkMinus className='w-4 h-4' />
              </Button>
            </section>
          </div>
        );
      })}
    </div>
  );
}
