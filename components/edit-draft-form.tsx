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
  updateDoc,
} from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Loader from './loader';
import { useToast } from './ui/use-toast';
import { Label } from './ui/label';

type Props = {
  storyId: string;
  profilePic: string;
  draft: DraftType;
};

export default function EditDraftForm({ storyId, profilePic, draft }: Props) {
  const { prompt, story, username, author } = draft;
  const [newPrompt, setNewPrompt] = useState(prompt);
  const [newStory, setNewStory] = useState(story);
  const [pending, setPending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const debouncedPrompt = useDebounce(newPrompt);
  const debouncedStory = useDebounce(newStory);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const data = {
      prompt: debouncedPrompt,
      story: debouncedStory,
      timestamp: Date.now(),
    };

    const updateStory = async () => {
      await updateDoc(doc(db, 'drafts', storyId), data);
    };

    if (prompt !== newPrompt || story !== newStory) {
      updateStory();
    }
  }, [
    debouncedPrompt,
    debouncedStory,
    prompt,
    story,
    newPrompt,
    newStory,
    storyId,
  ]);

  const publishStory = async (formData: FormData) => {
    const result = await getNewImageUrl(formData);

    await deleteDoc(doc(db, 'drafts', storyId));

    await addDoc(collection(db, 'published'), {
      author,
      username,
      profilePic,
      prompt: debouncedPrompt,
      story: debouncedStory,
      timestamp: Date.now(),
      karloImage: result.newImageUrl,
    });

    if (result?.message) {
      setPending(false);
      toast({
        variant: 'destructive',
        title: result.message,
      });
    }

    if (result?.newImageUrl) {
      setPending(false);
      formRef.current?.reset();
      router.push('/stories/published?show_toast=y');
    }
  };

  return (
    <div className='space-y-10'>
      <h1 className='text-lg text-primary/60'>
        Draft in {draft.username}{' '}
        <span className='text-base'>(The draft will be auto saved.)</span>
      </h1>
      <form
        onSubmit={() => setPending(true)}
        ref={formRef}
        action={publishStory}
        className='space-y-5'
      >
        <Label htmlFor='prompt' className='text-xl text-primary'>
          Effortlessly generate a high-quality thumbnail from simple text input.
        </Label>
        <Input
          name='prompt'
          id='prompt'
          type='text'
          placeholder='Prompt for thumbnail'
          value={newPrompt}
          onChange={(e) => setNewPrompt(e.target.value)}
          required
        />
        <Label
          htmlFor='story'
          className='text-xl text-primary inline-block mt-5'
        >
          Tell your story...
        </Label>
        <Textarea
          name='story'
          id='story'
          placeholder='Tell your story...'
          className='h-80'
          value={newStory}
          required
          onChange={(e) => setNewStory(e.target.value)}
        />
        <section className='flex justify-center'>
          <Button
            type='submit'
            variant={'secondary'}
            size={'lg'}
            disabled={
              pending ||
              (story === debouncedStory && prompt === debouncedPrompt)
            }
            className='w-24'
          >
            {pending ? <Loader width='w-7' height='h-7' /> : 'Publish'}
          </Button>
        </section>
      </form>
    </div>
  );
}
