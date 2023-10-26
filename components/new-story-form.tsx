'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import useDebounce from '@/hooks/use-debounce';
import { getNewImageUrl } from '@/lib/actions';
import { db } from '@/lib/firebase';
import { addDoc, collection, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Loader from './loader';
import { SessionType } from '@/types';
import { useToast } from './ui/use-toast';

type Props = {
  session: SessionType;
};

export default function NewStoryForm({ session }: Props) {
  const [prompt, setPrompt] = useState('');
  const [story, setStory] = useState('');
  const [pending, setPending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const searchParams = useSearchParams();
  const storyId = searchParams.get('story_id') as string;
  const debouncedPrompt = useDebounce(prompt);
  const debouncedStory = useDebounce(story);
  const router = useRouter();
  const { toast } = useToast();
  const { email, name, image } = session.user;

  useEffect(() => {
    const data = {
      author: email,
      username: name,
      prompt: debouncedPrompt,
      story: debouncedStory,
      storyId,
      timestamp: Date.now(),
    };

    const autoSave = async () => {
      await setDoc(doc(db, 'drafts', storyId), data);
    };

    autoSave();
  }, [debouncedStory, debouncedPrompt, email, name, storyId]);

  const publishStory = async (formData: FormData) => {
    const result = await getNewImageUrl(formData);

    await deleteDoc(doc(db, 'drafts', storyId));

    await addDoc(collection(db, 'published'), {
      author: email,
      username: name,
      profilePic: image,
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
    <form
      className='space-y-5 max-w-3xl mx-auto'
      onSubmit={() => setPending(true)}
      ref={formRef}
      action={publishStory}
    >
      <Input
        name='prompt'
        id='prompt'
        type='text'
        placeholder='a teddy bear on a skateboard in Times Square'
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        required
      />
      <Textarea
        name='content'
        id='content'
        placeholder='Tell your story...'
        className='h-96'
        value={story}
        onChange={(e) => setStory(e.target.value)}
        required
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
