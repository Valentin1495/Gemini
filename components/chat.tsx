'use client';

import { generateAnswer } from '@/lib/actions';
import SubmitButton from './submit-button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useState } from 'react';
import { Session } from 'next-auth';
import { cn } from '@/lib/utils';
import UserAvatar from './user-avatar';
import BotAvatar from './bot-avatar';
import { toast } from 'sonner';

type ChatHistory = {
  role: string;
  parts: string;
};

export default function Chat({ session }: { session: Session | null }) {
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const image = session?.user?.image as string;

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

      toast('🥳 Gemini responded!');
    }
  };

  return (
    <div className='space-y-10'>
      <form action={formAction} className='mx-auto space-y-2.5'>
        <Label htmlFor='msg' className='text-xl text-primary font-bold'>
          Conversation
        </Label>
        <Input
          id='msg'
          name='msg'
          className='focus-visible:ring-0 border-none bg-primary/10 placeholder:text-primary/50 text-primary'
          placeholder="Explain string theory to me like I'm nine"
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

      <div className='flex flex-col gap-y-4'>
        {chatHistory.map((el) => (
          <div
            key={el.parts}
            className={cn(
              'p-8 w-full flex items-start gap-x-8 rounded-lg',
              el.role === 'user' ? 'bg-primary/10' : 'bg-primary/5'
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
    </div>
  );
}
