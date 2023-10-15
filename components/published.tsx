import { formatDate } from '@/lib/format-date';
import { ExtendedPublished } from '@/types';
import Link from 'next/link';
import { Separator } from './ui/separator';
import Image from 'next/image';

export default function Published({
  prompt,
  story,
  timestamp,
  storyId,
  idx,
  numOfPublished,
}: ExtendedPublished) {
  const formattedDate = formatDate(timestamp);

  return (
    <div className='space-y-5'>
      <section>
        <article className='flex flex-col'>
          <Link
            className='font-bold text-primary w-fit'
            href={`/edit/published?story_id=${storyId}`}
          >
            {prompt}
          </Link>
          <Link
            className='text-primary/60 w-fit'
            href={`/edit/published?story_id=${storyId}`}
          >
            {story ? story : 'Empty story'}
          </Link>
          <p className='text-primary/75 font-light mt-2.5'>
            Last published on {formattedDate}
          </p>
        </article>
        {/* <Image /> */}
      </section>

      {idx + 1 !== numOfPublished && <Separator />}
    </div>
  );
}
