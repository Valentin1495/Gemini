'use client';

import { db } from '@/lib/firebase';
import { PublishedType } from '@/types';
import { format } from 'date-fns';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import PostSkeleton from './post-skeleton';
import UserAvatar from './user-avatar';
import { notFound } from 'next/navigation';
import { useToast } from './ui/use-toast';

type Props = {
  storyId: string;
};

export default function RealtimePost({ storyId }: Props) {
  const q = query(collection(db, 'published'), where('storyId', '==', storyId));
  const [post, setPost] = useState<PublishedType>();
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const formattedDate =
    post && format(new Date(post.timestamp), 'MMM dd, yyyy');

  useEffect(() => {
    const unsub = onSnapshot(
      q,
      (snapshot) => {
        const realtimePost = snapshot.docs.map((doc) =>
          doc.data()
        )[0] as PublishedType;
        setLoading(false);
        setPost(realtimePost);
      },
      (error) => {
        toast({
          variant: 'destructive',
          title: error.message,
        });
      }
    );

    return () => {
      unsub();
    };
  }, [storyId]);

  if (loading) return <PostSkeleton />;

  if (!post) {
    notFound();
  }

  return (
    <div className='space-y-5'>
      <h3 className='text-sm sm:text-base text-primary'>{post.prompt}</h3>
      <section className='flex items-center gap-x-3.5'>
        <UserAvatar
          image={post.profilePic as string}
          className='w-8 h-8 sm:w-12 sm:h-12'
        />

        <article className='flex flex-col text-sm sm:text-base'>
          <span>{post.username}</span>
          <span className='text-primary/50'>{formattedDate}</span>
        </article>
      </section>
      <section className='flex flex-col gap-y-5 sm:block'>
        <article className='relative w-full sm:w-64 md:w-96 aspect-square rounded-sm overflow-hidden float-left mr-5'>
          <Image
            src={post.karloImage}
            alt='Thumbnail'
            fill
            className='object-cover'
          />
        </article>

        <p className='text-base sm:text-lg sm:w-auto'>{post.story}</p>
      </section>
    </div>
  );
}
