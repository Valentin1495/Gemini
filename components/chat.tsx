'use client';

import { generateAnswer } from '@/lib/actions';
import SubmitButton from './submit-button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import UserAvatar from './user-avatar';
import BotAvatar from './bot-avatar';
import { toast } from 'sonner';
import Image from 'next/image';
import { MessageSquareText } from 'lucide-react';
import { Button } from './ui/button';
import { examplePropmts } from '@/app/(dashboard)/(routes)/conversation/constants';
import { useSession } from 'next-auth/react';

type ChatHistory = {
  role: string;
  parts: string;
};

export default function Chat() {
  const { data: session } = useSession();
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const [value, setValue] = useState<string>('');
  const image = session?.user?.image as string;
  const [idx, setIdx] = useState<number>(-1);

  const surprise = () => {
    setIdx((prev) => {
      return prev === 6 ? 0 : prev + 1;
    });
  };

  useEffect(() => {
    setValue(examplePropmts[idx]);
  }, [idx]);

  const formAction = async (formData: FormData) => {
    const userMsg = {
      role: 'user',
      parts: formData.get('msg') as string,
    };

    const result = await generateAnswer(formData);

    if (result) {
      const modelMsg = {
        role: 'model',
        parts: result.answer as string,
      };

      setChatHistory((prev) => [...prev, userMsg, modelMsg]);
      setValue('');
      toast('🥳 Gemini responded!');
    }
  };

  return (
    <div>
      <form action={formAction} className='mx-auto space-y-2.5'>
        <section className='flex items-center gap-x-3'>
          <Label
            htmlFor='msg'
            className='text-xl text-primary font-bold flex items-center gap-x-2'
          >
            <section className='bg-violet-200 p-2 rounded-md w-fit'>
              <MessageSquareText className='w-4 h-4 sm:w-5 sm:h-5 text-violet-700' />
            </section>
            Conversation
          </Label>
          <Button
            variant='secondary'
            size='sm'
            type='button'
            onClick={surprise}
          >
            Surprise me
          </Button>
        </section>

        <Input
          id='msg'
          name='msg'
          className='focus-visible:ring-0 border-none bg-secondary placeholder:text-primary/50 text-primary'
          placeholder='Message Gemini...'
          required
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <section className='flex justify-end'>
          <SubmitButton
            variant='premium'
            className='w-32'
            text='Generate'
            size='lg'
          />
        </section>
      </form>

      {chatHistory.length ? (
        <div className='flex flex-col gap-y-4 mt-10'>
          {chatHistory.map((el) => (
            <div
              key={el.parts}
              className={cn(
                'p-8 w-full flex items-start gap-x-8 rounded-lg',
                el.role === 'user' ? 'bg-primary-foreground' : 'bg-slate-900'
              )}
            >
              {el.role === 'user' ? (
                <UserAvatar image={image} className='w-8 h-8' />
              ) : (
                <BotAvatar />
              )}
              <p className='text-sm'>{el.parts}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className='space-y-3 mt-32'>
          <section className='bg-primary w-fit mx-auto rounded-full p-4 animate-pulse'>
            <Image src='/logo.png' alt='Logo' width={50} height={50} />
          </section>
          <p className='text-center text-2xl font-bold text-primary'>
            How can I help you today?
          </p>
        </div>
      )}
    </div>
  );
}
