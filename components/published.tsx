'use client';

import { PublishedType } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import DeleteButton from './delete-button';
import { useState } from 'react';
import { format } from 'date-fns';

export default function Published({
  prompt,
  story,
  timestamp,
  storyId,
  karloImage,
}: PublishedType) {
  const formattedTimestamp = format(new Date(timestamp), 'MMM dd, yyyy');
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className='relative aspect-square w-full rounded-sm overflow-hidden'>
        <Image
          src={karloImage}
          alt='Thumbnail'
          fill
          className='object-cover absolute'
        />
        <section className='bg-white/75 text-primary dark:text-primary-foreground p-1.5 text-left font-bold inset-0 opacity-0 hover:opacity-100 absolute transition'>
          {prompt}
        </section>
      </DialogTrigger>
      <DialogContent className='p-0 max-w-fit'>
        <section className='relative aspect-square w-96 overflow-hidden rounded-t-lg'>
          <Image
            src={karloImage}
            alt='Thumbnail'
            fill
            className='object-cover'
          />
        </section>
        <section className='w-96 px-5 pb-5 flex flex-col items-center'>
          <Link
            className='text-primary font-bold w-fit text-center prompt-summary'
            href={`/edit/published?story_id=${storyId}`}
          >
            {prompt}
          </Link>
          <Link
            className='text-primary/60 w-fit text-center story-summary'
            href={`/edit/published?story_id=${storyId}`}
          >
            {story}
          </Link>
          <article className='flex items-center mt-2.5 relative'>
            <p className='text-primary/75 text-sm'>
              Published on {formattedTimestamp}
            </p>
            <DeleteButton storyId={storyId} setOpen={setOpen} />
          </article>
        </section>
      </DialogContent>
    </Dialog>
  );
}
