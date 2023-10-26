import { ExtendedDraft } from '@/types';
import Link from 'next/link';
import { Separator } from './ui/separator';
import { TrashIcon } from '@radix-ui/react-icons';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { format } from 'date-fns';
import { useToast } from './ui/use-toast';

export default function Draft({
  prompt,
  story,
  timestamp,
  storyId,
  idx,
  numOfDrafts,
}: ExtendedDraft) {
  const formattedTimestamp = format(new Date(timestamp), 'MMM dd, yyyy');
  const { toast } = useToast();

  const deleteDraft = async () => {
    await deleteDoc(doc(db, 'drafts', storyId));

    toast({ title: '🗑️ Deleted a draft.' });
  };

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
          className='text-primary/60 w-fit story-summary'
          href={`/edit/draft?story_id=${storyId}`}
        >
          {story}
        </Link>
        <article className='mt-2.5 flex items-center gap-x-2.5'>
          <p className='text-primary/75 font-light'>
            Last edited on {formattedTimestamp}
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
