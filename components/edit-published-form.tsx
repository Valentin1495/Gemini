'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import useDebounce from '@/hooks/use-debounce';
import { db } from '@/lib/firebase';
import { PublishedType } from '@/types';
import { doc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import Loader from './loader';
import { useToast } from './ui/use-toast';

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
  const { toast } = useToast();

  const republishStory = async () => {
    try {
      await updateDoc(doc(db, 'published', storyId), {
        story: debouncedStory,
        timestamp: Date.now(),
      });
      setPending(false);
      formRef.current?.reset();
      router.push('/stories/published?show_toast=y');
    } catch (error: any) {
      setPending(false);
      toast({
        variant: 'destructive',
        title: error.message,
      });
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
          disabled={pending || story === debouncedStory}
          className='w-24'
        >
          {pending ? <Loader width='w-7' height='h-7' /> : 'Publish'}
        </Button>
      </section>
    </form>
  );
}
