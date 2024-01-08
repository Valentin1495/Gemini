'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { generateImagePrompt } from '@/lib/actions';
import { extractPrompt } from '@/lib/extract-prompt';
import { useState } from 'react';
import { Label } from './ui/label';
import SubmitButton from './submit-button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function IdeationForm() {
  const [prompt, setPrompt] = useState('');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const router = useRouter();

  const formAction = async (formData: FormData) => {
    const result = await generateImagePrompt(formData);

    if (result) {
      toast('🎊 Created new prompts!');

      setSelectedIndex(null);
      setPrompt(result.prompt as string);
    }
  };
  const extractedPrompt = extractPrompt(prompt);

  return (
    <div>
      <form action={formAction} className='mx-auto space-y-2.5'>
        <Label htmlFor='context' className='text-xl text-primary font-bold'>
          Prompt suggestion
        </Label>
        <Input
          id='context'
          name='context'
          className='focus-visible:ring-0'
          placeholder='A superhero'
          required
          autoFocus
        />
        <section className='flex justify-end'>
          <SubmitButton
            variant='default'
            className='w-36'
            text='Surprise me'
            size='lg'
          />
        </section>
      </form>

      {extractedPrompt.length ? (
        <div className='mt-10 mb-5 w-fit'>
          <h2 className='text-lg mb-2.5'>Prompt Ideation Result</h2>
          <div className='space-y-5 mb-5'>
            {extractedPrompt.map((el, i) => (
              <section
                key={i}
                className='flex flex-col sm:flex-row justify-between sm:gap-x-5 items-center gap-y-2.5 sm:gap-y-0'
              >
                <p className='text-primary/75'>{el}</p>
                <article>
                  <Button
                    className='w-24'
                    size='sm'
                    variant='outline'
                    onClick={() => {
                      setSelectedIndex(i);
                      navigator.clipboard.writeText(el);
                    }}
                  >
                    {selectedIndex === i && 'Copied'}
                    {selectedIndex !== i && 'Copy this'}
                  </Button>
                </article>
              </section>
            ))}
          </div>
          <section className='flex justify-center'>
            <Button variant='secondary' onClick={() => router.back()}>
              Go back
            </Button>
          </section>
        </div>
      ) : null}
    </div>
  );
}
