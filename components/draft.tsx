import { ExtendedDraft } from '@/types';
import Link from 'next/link';
import { Separator } from './ui/separator';
import { TrashIcon } from '@radix-ui/react-icons';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import toast from 'react-hot-toast';

export default function Draft({
  prompt,
  story,
  timestamp,
  storyId,
  idx,
  numOfDrafts,
}: ExtendedDraft) {
  const deleteDraft = async () => {
    await deleteDoc(doc(db, 'drafts', storyId));

    toast('Deleted a draft', {
      icon: '🗑️',
    });
  };

  if (!prompt || !story) return null;

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
          className='text-primary/60 w-fit summary'
          href={`/edit/draft?story_id=${storyId}`}
        >
          {story}
        </Link>
        <article className='mt-2.5 flex items-center gap-x-2.5'>
          <p className='text-primary/75 font-light'>
            Last edited on {timestamp}
          </p>
          <button onClick={deleteDraft} className='transition hover:opacity-75'>
            <TrashIcon className='w-5 h-5 text-destructive' />
          </button>
        </article>
      </section>
      {idx + 1 !== numOfDrafts && <Separator />}
    </div>
  );
}
