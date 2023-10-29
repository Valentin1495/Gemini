'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { generateImagePrompt } from '@/lib/actions';
import { extractPrompt } from '@/lib/extract-prompt';
import { useRef, useState } from 'react';
import Loader from './loader';
import { useToast } from './ui/use-toast';
import { Label } from './ui/label';

export default function IdeationForm() {
  const [prompt, setPrompt] = useState('');
  const [pending, setPending] = useState(false);
  const [loading, setLoading] = useState(false);
  const [story, setStory] = useState('');
  const [selectedIndex, setSelectedIndex] = useState<number>();
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  const formAction = async (formData: FormData) => {
    const result = await generateImagePrompt(formData);

    if (result?.message) {
      setPending(false);
      toast({
        variant: 'destructive',
        title: result.message,
      });
    } else {
      setPending(false);
      toast({
        title: '🎊 Created new prompts!',
      });
      formRef.current?.reset();
      setPrompt(result.prompt as string);
    }
  };
  const extractedPrompt = extractPrompt(prompt);

  const makeUpStory = async (el: string) => {
    setLoading(true);
    const res = await fetch('/api/story', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ topic: el }),
    });

    if (!res.ok) {
      toast({
        variant: 'destructive',
        title: res.statusText,
      });
    }

    const { story } = await res.json();
    setStory(story);
    setLoading(false);
    toast({ title: '🎊 Made up a story!' });
  };

  return (
    <div>
      <form
        action={formAction}
        ref={formRef}
        onSubmit={() => setPending(true)}
        className='mx-auto space-y-2.5'
      >
        <Label htmlFor='context' className='text-xl text-primary font-bold'>
          Prompt suggestion
        </Label>
        <Input
          id='context'
          name='context'
          className='bg-slate-800 shadow-lg placeholder:text-slate-500'
          placeholder='e.g. A superhero'
          required
          autoFocus
        />
        <Button
          variant={'secondary'}
          type='submit'
          disabled={pending}
          className='w-28'
        >
          {pending ? <Loader /> : 'Surprise me'}
        </Button>
      </form>

      {extractedPrompt.length ? (
        <div>
          <div className='mt-10 mb-5 space-y-2.5 w-fit'>
            <h2 className='text-lg'>Prompt Ideation Result</h2>
            <section className='space-y-5'>
              {extractedPrompt.map((el, i) => (
                <article
                  key={i}
                  className='flex flex-col sm:flex-row justify-between sm:gap-x-5 items-center gap-y-2.5 sm:gap-y-0'
                >
                  <p className='text-primary/75'>{el}</p>

                  <Button
                    className='bg-primary/20 text-primary hover:bg-primary/10 w-full sm:w-24'
                    size={'sm'}
                    onClick={() => {
                      makeUpStory(el);
                      setSelectedIndex(i);
                    }}
                    disabled={loading || selectedIndex === i}
                  >
                    {loading && selectedIndex === i && <Loader />}
                    {!loading && selectedIndex === i && 'Used'}
                    {selectedIndex !== i && 'Use this'}
                  </Button>
                </article>
              ))}
            </section>
          </div>
        </div>
      ) : null}
      {story && (
        <section className='mt-10 space-y-5'>
          <h2 className='text-lg'>Generated story</h2>
          <p className='bg-secondary p-5 rounded-lg max-h-96 overflow-y-auto sm:max-h-fit'>
            {' '}
            {story}
          </p>
        </section>
      )}
    </div>
  );
}
