'use client';

import SubmitButton from './submit-button';
import { Input } from './ui/input';
import { FormEvent, useState } from 'react';
import { cn, startChat, updateUI } from '@/lib/utils';
import UserAvatar from './user-avatar';
import BotAvatar from './bot-avatar';
import { toast } from 'sonner';
import Image from 'next/image';
import { MessageSquareText } from 'lucide-react';
import { Button } from './ui/button';
import { examplePropmts } from '@/app/(dashboard)/(routes)/conversation/constants';
import { useSession } from 'next-auth/react';
import { Msg } from '@/lib/types';

export default function Chat() {
  const { data: session } = useSession();
  const [userParts, setUserParts] = useState<string>('');
  const [modelParts, setModelParts] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<Msg[]>([]);
  const image = session?.user?.image as string;
  const [idx, setIdx] = useState<number>(0);

  const surprise = () => {
    setIdx((prev) => {
      setUserParts(examplePropmts[idx]);
      return prev === 6 ? 0 : prev + 1;
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userMsg = {
      role: 'user',
      parts: userParts,
    };
    const modelMsg = {
      role: 'model',
      parts: modelParts,
    };

    const modifiedChatHistory = [...chatHistory, userMsg, modelMsg];

    const chat = startChat(modifiedChatHistory);

    await updateUI({
      chatHistory: modifiedChatHistory,
      setChatHistory,
      setModelParts,
      getResult: () => chat.sendMessageStream(userParts),
      streaming: true,
    });

    setModelParts('');
    toast('🥳 Gemini responded!');
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='mx-auto space-y-2.5'>
        <section className='flex items-center gap-x-3'>
          <article className='bg-violet-200 p-2 rounded-md w-fit'>
            <MessageSquareText className='w-4 h-4 sm:w-5 sm:h-5 text-violet-700' />
          </article>

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
          id='userParts'
          name='userParts'
          className='focus-visible:ring-0 border-none bg-secondary placeholder:text-primary/50 text-primary'
          placeholder='Message Gemini...'
          required
          autoFocus
          value={userParts}
          onChange={(e) => setUserParts(e.target.value)}
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

      {chatHistory.length && chatHistory[1].parts ? (
        <div className='flex flex-col gap-y-4 mt-10'>
          {chatHistory.map((el, idx) => (
            <div
              key={idx}
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
              <pre className='text-sm whitespace-pre-wrap'>{el.parts}</pre>
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
