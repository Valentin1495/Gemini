'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { generateImagePrompt } from '@/lib/actions';
import { extractPrompt } from '@/lib/extract-prompt';
import { useRef, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import Loader from './loader';
import { copyToClipboard } from '@/lib/copy-to-clipboard';

type Props = {};
export default function IdeationForm({}: Props) {
  const [prompt, setPrompt] = useState('');
  const [pending, setPending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const formAction = async (formData: FormData) => {
    const result = await generateImagePrompt(formData);

    if (result?.message) {
      setPending(false);
      toast.error(result.message);
    } else {
      setPending(false);
      toast.success('Created new topics');
      formRef.current?.reset();
      setPrompt(result.prompt as string);
    }
  };
  const extractedPrompt = extractPrompt(prompt);

  return (
    <div>
      <form
        action={formAction}
        ref={formRef}
        onSubmit={() => setPending(true)}
        className='mx-auto space-y-2.5'
      >
        <label htmlFor='context' className='text-xl text-primary font-bold'>
          Generate topics with a keyword
        </label>
        <Input
          id='context'
          name='context'
          className='dark:bg-slate-800 bg-slate-50 shadow-lg placeholder:text-slate-400 dark:placeholder:text-slate-500'
          placeholder='e.g. An astronaut'
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
          <section className='mt-10 mb-5 bg-secondary rounded-lg space-y-2.5 w-fit p-5'>
            <h2 className='text-lg'>Topics Ideation Result</h2>
            {extractedPrompt.map((el, i) => (
              <article
                key={i}
                className='flex justify-between gap-x-5 items-center'
              >
                <p className='text-lg text-primary/75'>{el}</p>
                <Button
                  className='dark:bg-primary/20 dark:text-primary dark:hover:bg-primary/10 min-w-fit'
                  size={'sm'}
                  onClick={() => copyToClipboard(el)}
                >
                  Copy this
                </Button>
              </article>
            ))}
          </section>
          <Link
            className='bg-secondary p-3 rounded-lg hover:opacity-80 transition'
            href={'/dashboard?show_dialog=y'}
          >
            Go back
          </Link>
        </div>
      ) : null}
    </div>
  );
}
