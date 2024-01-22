'use client';

import { FormEvent, useState } from 'react';
import { cn, startChat, updateUI } from '@/lib/utils';
import UserAvatar from './user-avatar';
import BotAvatar from './bot-avatar';
import { toast } from 'sonner';
import { ArrowRight, MessageSquareText, Send } from 'lucide-react';
import { Button } from './ui/button';
import { useSession } from 'next-auth/react';
import { Msg } from '@/lib/types';
import TextareaAutosize from 'react-textarea-autosize';
import { examplePropmts } from '@/app/(dashboard)/(routes)/conversation/constants';
import Loader from './loader';
import { ButtonScrollToBottom } from './button-scroll-to-bottom';
import CopyButton from './copy-button';

export default function Chat() {
  const { data: session } = useSession();
  const [userParts, setUserParts] = useState<string>('');
  const [modelParts, setModelParts] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<Msg[]>([]);
  const [pending, setPending] = useState<boolean>(false);
  const image = session?.user?.image as string;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userParts.trim()) {
      return;
    }
    setUserParts('');
    setPending(true);

    const userMsg = {
      role: 'user',
      parts: userParts,
    };
    const modelMsg = {
      role: 'model',
      parts: modelParts,
    };

    const updatedChatHistory = [...chatHistory, userMsg, modelMsg];

    const chat = startChat();
    await updateUI({
      chatHistory: updatedChatHistory,
      setChatHistory,
      setModelParts,
      getResult: () => chat.sendMessageStream(userParts),
      streaming: true,
    });

    setPending(false);
    setModelParts('');
    toast('🥳 Gemini responded!');
  };

  return (
    <div>
      {chatHistory.length ? (
        <div className='flex flex-col gap-y-4'>
          {chatHistory.map((el, idx) => (
            <div
              key={idx}
              className={cn(
                'p-8 w-full flex gap-x-3 rounded-xl',
                el.role === 'user' ? 'bg-primary-foreground' : 'bg-slate-900'
              )}
            >
              {el.role === 'user' ? (
                <UserAvatar image={image} className='w-8 h-8' />
              ) : (
                <BotAvatar />
              )}
              {el.role === 'model' ? (
                <section className='space-y-3 group'>
                  <article className='font-bold text-base mt-1'>Gemini</article>
                  <pre className='text-sm whitespace-pre-wrap'>
                    {el.parts}
                    {modelParts && (
                      <span className='cursor-default animate-pulse'>▍</span>
                    )}
                  </pre>
                  <CopyButton message={el.parts} />
                </section>
              ) : (
                <section className='space-y-3'>
                  <article className='font-bold text-base mt-1'>You</article>
                  <pre className='text-sm whitespace-pre-wrap'>{el.parts}</pre>
                </section>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className='bg-secondary p-8 rounded-md space-y-2'>
          <h1 className='font-bold text-lg flex items-center gap-x-3'>
            <section className='bg-violet-200 p-2 rounded-md w-fit'>
              <MessageSquareText className='w-4 h-4 sm:w-5 sm:h-5 text-violet-700' />
            </section>
            Welcome!
          </h1>
          <p className='text-primary/50'>
            You can start a conversation here or try the following examples:
          </p>
          <p className='flex flex-col gap-y-2'>
            {examplePropmts.map((el, idx) => (
              <Button
                key={idx}
                variant='ghost'
                type='button'
                className='w-fit text-base p-2 h-auto hover:bg-primary/10'
                onClick={() => setUserParts(el)}
              >
                <ArrowRight className='mr-2 w-5 h-5 min-w-fit' />
                <span className='text-left'>{el}</span>
              </Button>
            ))}
          </p>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className='fixed bottom-0 -translate-x-1/2 left-1/2 w-full max-w-3xl px-5'
      >
        <section className='relative bg-background h-4'>
          <ButtonScrollToBottom />
          <TextareaAutosize
            rows={1}
            className='absolute bottom-3 w-full resize-none bg-secondary placeholder:text-primary/50 text-primary min-h-fit max-h-48 focus-within:outline-none pl-6 py-5 pr-16 rounded-lg'
            placeholder='Message Gemini...'
            autoFocus
            value={userParts}
            onChange={(e) => setUserParts(e.target.value)}
          />

          <Button
            type='submit'
            size='icon'
            className='absolute right-6 bottom-[26px]'
            disabled={pending || !userParts.trim()}
          >
            {pending ? (
              <Loader className='w-6 h-6' />
            ) : (
              <Send className='w-6 h-6' />
            )}
          </Button>
        </section>
      </form>
    </div>
  );
}
