'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import useDebounce from '@/hooks/use-debounce';
import { db } from '@/lib/firebase';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function NewStoryForm() {
  const [prompt, setPrompt] = useState('');
  const [story, setStory] = useState('');
  const searchParams = useSearchParams();
  const storyId = searchParams.get('story_id') as string;
  const debouncedPrompt = useDebounce(prompt);
  const debouncedStory = useDebounce(story);
  const { data: session } = useSession();
  const email = session?.user?.email as string;
  const username = session?.user?.name as string;

  useEffect(() => {
    if (debouncedStory || debouncedPrompt) {
      const data = {
        author: email,
        username,
        prompt: debouncedPrompt,
        story: debouncedStory,
        storyId,
        timestamp: serverTimestamp(),
      };

      const saveStory = async () => {
        await setDoc(doc(db, 'drafts', storyId), data);
      };

      saveStory();
    }
  }, [debouncedStory, debouncedPrompt]);

  return (
    <form className='space-y-5'>
      <Input
        name='prompt'
        id='prompt'
        type='text'
        placeholder='Prompt for thumbnail'
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
      />
      <section className='flex justify-center'>
        <Button type='submit' variant={'secondary'} size={'lg'}>
          Publish
        </Button>
      </section>
    </form>
  );
}
