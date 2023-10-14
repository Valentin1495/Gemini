import { formatDate } from '@/lib/format-date';
import { ExtendedDraft } from '@/types';
import Link from 'next/link';
import { Separator } from './ui/separator';

export default function Draft({
  prompt,
  story,
  timestamp,
  storyId,
  idx,
  numOfDrafts,
}: ExtendedDraft) {
  const formattedDate = formatDate(timestamp);

  return (
    <div className='space-y-5'>
      <section className='flex flex-col'>
        <Link
          className='font-bold text-primary w-fit'
          href={`/edit/draft?story_id=${storyId}`}
        >
          {prompt}
        </Link>
        <Link
          className='text-primary/60 w-fit'
          href={`/edit/draft?story_id=${storyId}`}
        >
          {story}
        </Link>
        <p className='text-primary/75 font-light mt-2.5'>
          Last edited on {formattedDate}
        </p>
      </section>
      {idx + 1 !== numOfDrafts && <Separator />}
    </div>
  );
}
