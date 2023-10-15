'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import useDebounce from '@/hooks/use-debounce';
import { getNewImageUrl } from '@/lib/actions';
import { db } from '@/lib/firebase';
import { DraftType } from '@/types';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import Loader from './loader';

type Props = {
  storyId: string;
  draft: DraftType;
};

export default function EditDraftForm({ storyId, draft }: Props) {
  const { prompt, story, username, author } = draft;
  const [newPrompt, setNewPrompt] = useState(prompt);
  const [newStory, setNewStory] = useState(story);
  const [pending, setPending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const debouncedPrompt = useDebounce(newPrompt);
  const debouncedStory = useDebounce(newStory);
  const router = useRouter();

  useEffect(() => {
    const data = {
      prompt: debouncedPrompt,
      story: debouncedStory,
      timestamp: serverTimestamp(),
    };

    const updateStory = async () => {
      await updateDoc(doc(db, 'drafts', storyId), data);
    };

    if (prompt !== newPrompt || story !== newStory) {
      updateStory();
    }
  }, [debouncedPrompt, debouncedStory]);

  const publishStory = async (formData: FormData) => {
    const result = await getNewImageUrl(formData);

    await deleteDoc(doc(db, 'drafts', storyId));

    await addDoc(collection(db, 'published'), {
      author,
      username,
      prompt: debouncedPrompt,
      story: debouncedStory,
      timestamp: serverTimestamp(),
      karloImage: result.newImageUrl,
    });

    if (result?.message) {
      setPending(false);
      toast.error(result.message);
    }

    if (result?.newImageUrl) {
      setPending(false);
      formRef.current?.reset();

      router.push('/stories/published?show_toast=y');
    }
  };

  return (
    <form
      onSubmit={() => setPending(true)}
      ref={formRef}
      action={publishStory}
      className='space-y-5'
    >
      <Input
        name='prompt'
        id='prompt'
        type='text'
        placeholder='Prompt for thumbnail'
        value={newPrompt}
        onChange={(e) => setNewPrompt(e.target.value)}
        required
      />
      <Textarea
        name='story'
        id='story'
        placeholder='Tell your story...'
        className='h-96'
        value={newStory}
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
