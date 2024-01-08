'use client';

import { generateStory } from '@/lib/actions';
import SubmitButton from './submit-button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from './ui/button';
import LoginDialog from './login-dialog';
import { Session } from 'next-auth';

export default function StoryForm({ session }: { session: Session | null }) {
  const [story, setStory] = useState<string>('');

  const formAction = async (formdata: FormData) => {
    const result = await generateStory(formdata);

    if (result) {
      toast('👏 Created new story!');
      setStory(result.story as string);
    }
  };

  return (
    <div>
      <form action={formAction} className='mx-auto space-y-2.5'>
        <Label htmlFor='topic' className='text-xl text-primary font-bold'>
          Story generation
        </Label>
        <Input
          id='topic'
          name='topic'
          className='focus-visible:ring-0'
          placeholder='Romance between two youths'
          required
          autoFocus
        />
        <section className='flex justify-end'>
          <SubmitButton
            variant='default'
            className='w-32'
            text='Generate'
            size='lg'
          />
        </section>
      </form>

      {story && (
        <section>
          <article className='mt-5 bg-primary/5 rounded-md p-5 text-primary'>
            {story}
          </article>
          <article className='text-center mt-3'>
            {session ? (
              <Button variant='outline'>Save</Button>
            ) : (
              <LoginDialog />
            )}
          </article>
        </section>
      )}
    </div>
  );
}
