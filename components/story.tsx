import { PublishedType } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import Image from 'next/image';
import { CopyIcon } from '@radix-ui/react-icons';
import { copyToClipboard } from '@/lib/copy-to-clipboard';
import { format } from 'date-fns';
import { Button } from './ui/button';
import Link from 'next/link';

export default function Story({
  prompt,
  timestamp,
  storyId,
  karloImage,
  profilePic,
  username,
}: PublishedType) {
  const formattedDate = format(new Date(timestamp), 'MM/dd/yyyy');

  return (
    <Dialog>
      <DialogTrigger className='relative aspect-square w-full rounded-sm overflow-hidden'>
        <Image
          src={karloImage}
          alt='Story thumbnail'
          fill
          className='object-cover absolute
          '
        />
        <section className='bg-black/75 inset-0 text-left text-white/90 p-1.5 font-bold opacity-0 hover:opacity-100 absolute transition'>
          <article className='bottom-2 absolute '>
            {prompt}
            <Image
              src={profilePic}
              alt='Profile picture'
              width={40}
              height={40}
              className='object-cover rounded-full mt-2.5'
            />
          </article>
        </section>
      </DialogTrigger>
      <DialogContent className='max-w-fit'>
        <DialogHeader className='flex flex-row items-center gap-x-2'>
          <Image
            src={profilePic}
            alt='Profile picture'
            width={36}
            height={36}
            className='object-cover rounded-full mt-2.5'
          />
          <h1 className='text-primary text-sm'>{username}</h1>
        </DialogHeader>
        <section className='relative aspect-square w-96 overflow-hidden rounded-lg'>
          <Image
            src={karloImage}
            alt='Thumbnail'
            fill
            className='object-cover'
          />
        </section>
        <section className='w-96 space-y-2'>
          <article className='flex items-center gap-x-2.5'>
            <h1 className='text-primary font-bold'>Prompt</h1>
            <button
              onClick={() => copyToClipboard(prompt)}
              className='text-sm flex items-center text-slate-400 gap-x-0.5'
            >
              <CopyIcon className='w-4 h-4' />
              Copy
            </button>
          </article>
          <p className='bg-secondary/75 text-slate-400 px-4 py-3 rounded-lg'>
            {prompt}
          </p>
        </section>
        <Link
          href={`/@${username}/${storyId}`}
          className='bg-primary text-primary-foreground shadow hover:bg-primary/90 font-bol transition text-center rounded-sm py-2'
        >
          Read the Story
        </Link>
        <section className='flex justify-between'>
          <article>
            <h2 className='text-slate-500'>Generated</h2>
            <p className='text-primary/90'>{formattedDate}</p>
          </article>
          <article>
            <h2 className='text-slate-500'>Base Model</h2>
            <p className='text-primary/90'>Karlo 2.0</p>
          </article>
        </section>
      </DialogContent>
    </Dialog>
  );
}
