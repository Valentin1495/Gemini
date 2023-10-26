'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { MagicWandIcon, RocketIcon } from '@radix-ui/react-icons';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useRef, useState } from 'react';
import Link from 'next/link';
import { createSynopsis } from '@/lib/actions';
import useCopy from '@/hooks/use-copy';
import Loader from './loader';
import { useToast } from './ui/use-toast';

export default function SynopsisDialog() {
  const [pending, setPending] = useState(false);
  const [open, setOpen] = useState(false);
  const [synopsis, setSynopsis] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const copyToClipboard = useCopy(synopsis);
  const { toast } = useToast();

  const getSynopsis = async (formData: FormData) => {
    const result = await createSynopsis(formData);

    if (result?.message) {
      setPending(false);
      toast({
        variant: 'destructive',
        title: result.message,
      });
    }

    if (result?.synopsis) {
      setPending(false);
      formRef.current?.reset();
      toast({ title: '🎉 Created a synopsis!' });
      setSynopsis(result.synopsis);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className='flex gap-x-1.5 items-center'>
        <RocketIcon className='w-6 h-6' />
        AI
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Synopsis</DialogTitle>
          <DialogDescription>
            Enter a topic with a detailed description.
          </DialogDescription>
        </DialogHeader>
        <form
          action={getSynopsis}
          onSubmit={() => setPending(true)}
          className='space-y-2'
          ref={formRef}
        >
          <Input
            id='topic'
            name='topic'
            placeholder='e.g. an astronaut walking in a green desert'
            required
          />
          <section className='flex gap-x-2.5'>
            <Button
              type='submit'
              size={'sm'}
              disabled={pending}
              className='w-[75.5px]'
            >
              {pending ? <Loader width='w-5' height='h-5' /> : 'Generate'}
            </Button>

            <Link
              href={'/generate_story'}
              aria-disabled={pending}
              className='flex gap-x-1.5 items-center bg-secondary font-bold px-2 py-1.5 rounded-md hover:bg-slate-700 transition aria-disabled:pointer-events-none aria-disabled:opacity-50'
            >
              <MagicWandIcon className='w-3.5 h-3.5' />
              <span className='text-sm'>Ideation</span>
            </Link>
          </section>
        </form>
        {synopsis && (
          <p
            onClick={copyToClipboard}
            className='mt-5 text-primary transition hover:cursor-pointer bg-secondary hover:bg-secondary/75 py-1.5 px-3 rounded-lg'
          >
            {synopsis}
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
