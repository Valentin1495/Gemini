'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import useDebounce from '@/hooks/use-debounce';
import { db } from '@/lib/firebase';
import { doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

type Props = {
  storyId: string;
  prompt: string;
  story: string;
};

export default function EditDraftForm({ storyId, prompt, story }: Props) {
  const [newPrompt, setNewPrompt] = useState(prompt);
  const [newStory, setNewStory] = useState(story);
  const debouncedPrompt = useDebounce(newPrompt);
  const debouncedStory = useDebounce(newStory);

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

  return (
    <form className='space-y-5'>
      <Input
        name='prompt'
        id='prompt'
        type='text'
        placeholder='Prompt for thumbnail'
        value={newPrompt}
        onChange={(e) => setNewPrompt(e.target.value)}
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
        <Button type='submit' variant={'secondary'} size={'lg'}>
          Publish
        </Button>
      </section>
    </form>
  );
}
