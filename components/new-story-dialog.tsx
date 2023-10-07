'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { MagicWandIcon, PlusIcon } from '@radix-ui/react-icons';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { createStory } from '@/lib/actions';
import { useRef, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';

type Props = {};

export default function NewStoryDialog({}: Props) {
  const [pending, setPending] = useState(false);
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const formAction = async (formData: FormData) => {
    const result = await createStory(formData);

    if (result?.message) {
      setPending(false);
      toast.error(result.message);
      formRef.current?.reset();
    } else {
      setPending(false);
      toast.success('Created a new story');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className='flex gap-x-1.5 border-dashed border-2 border-cyan-500 text-cyan-600 p-3 rounded-md'>
        <PlusIcon className='w-6 h-6' />
        New Story
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Story</DialogTitle>
          <DialogDescription>
            Enter a topic with a detailed description.
          </DialogDescription>
        </DialogHeader>
        <form
          action={formAction}
          onSubmit={() => setPending(true)}
          className='space-y-2'
          ref={formRef}
        >
          <Input
            id='topic'
            name='topic'
            placeholder='a teddy bear on a skateboard in Times Square'
            required
          />
          <section className='flex gap-x-2.5'>
            <Button type='submit' size={'sm'} disabled={pending}>
              {pending ? 'Generating...' : 'Generate'}
            </Button>

            <Link
              href={'/generate_prompt'}
              aria-disabled={pending}
              className='flex gap-x-1.5 items-center bg-secondary font-bold px-2 py-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition aria-disabled:pointer-events-none aria-disabled:opacity-50'
            >
              <MagicWandIcon className='w-3.5 h-3.5' />
              <span className='text-sm'>Ideation</span>
            </Link>
          </section>
        </form>
      </DialogContent>
    </Dialog>
  );
}
