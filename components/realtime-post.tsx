'use client';

import { db } from '@/lib/firebase';
import { PublishedType } from '@/types';
import { format } from 'date-fns';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

type Props = {
  storyId: string;
};

export default function RealtimePost({ storyId }: Props) {
  const q = query(collection(db, 'published'), where('storyId', '==', storyId));
  const [post, setPost] = useState<PublishedType>();
  const formattedDate =
    post && format(new Date(post.timestamp), 'MMM dd, yyyy');

  useEffect(() => {
    const unsub = onSnapshot(
      q,
      (snapshot) => {
        const realtimePost = snapshot.docs.map((doc) =>
          doc.data()
        )[0] as PublishedType;

        setPost(realtimePost);
      },
      (error) => {
        toast.error(error.message);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  if (!post) return null;

  return (
    <div className='space-y-10'>
      <h1 className='text-primary font-bold text-3xl'>{post.prompt}</h1>
      <section className='flex items-center gap-x-3.5'>
        <Image
          src={post.profilePic as string}
          alt='Profile picture'
          width={42}
          height={42}
          className='object-cover rounded-full'
        />
        <article className='flex flex-col'>
          <span>{post.username}</span>
          <span className='text-primary/50'>{formattedDate}</span>
        </article>
      </section>

      <section className='relative w-full aspect-[3/2] rounded-sm overflow-hidden'>
        <Image
          src={post.karloImage}
          alt='Story thumbnail'
          fill
          className='object-cover'
        />
      </section>

      <section className='text-lg'>{post.story}</section>
    </div>
  );
}
