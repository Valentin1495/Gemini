'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import useDebounce from '@/hooks/use-debounce';
import { db } from '@/lib/firebase';
import { PublishedType } from '@/types';
import { doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import Loader from './loader';

type Props = {
  storyId: string;
  published: PublishedType;
};

export default function EditPublishedForm({ storyId, published }: Props) {
  const { prompt, story } = published;

  const [newStory, setNewStory] = useState(story);
  const [pending, setPending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const debouncedStory = useDebounce(newStory);
  const router = useRouter();

  const republishStory = async () => {
    try {
      await updateDoc(doc(db, 'published', storyId), {
        story: debouncedStory,
        timestamp: serverTimestamp(),
      });
      setPending(false);
      formRef.current?.reset();
      router.push('/stories/published?show_toast=y');
    } catch (error: any) {
      setPending(false);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={() => setPending(true)}
      ref={formRef}
      action={republishStory}
      className='space-y-5'
    >
      <Input
        name='prompt'
        id='prompt'
        type='text'
        defaultValue={prompt}
        disabled
      />
      <Textarea
        name='story'
        id='story'
        placeholder='Tell your story...'
        className='h-96'
        value={newStory}
        required
        onChange={(e) => setNewStory(e.target.value)}
      />
      <section className='flex justify-center'>
        <Button
          type='submit'
          variant={'secondary'}
          size={'lg'}
          disabled={pending}
          className='w-24'
        >
          {pending ? <Loader width='w-7' height='h-7' /> : 'Publish'}
        </Button>
      </section>
    </form>
  );
}
