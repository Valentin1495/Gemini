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

export default function Chat() {
  const { data: session } = useSession();
  const [userParts, setUserParts] = useState<string>('');
  const [modelParts, setModelParts] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<Msg[]>([]);
  const [pending, setPending] = useState<boolean>(false);
  const image = session?.user?.image as string;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);

    const userMsg = {
      role: 'user',
      parts: userParts,
    };
    const modelMsg = {
      role: 'model',
      parts: modelParts,
    };
    const modifiedChatHistory = [...chatHistory, userMsg, modelMsg];

    const chat = startChat();
    await updateUI({
      chatHistory: modifiedChatHistory,
      setChatHistory,
      setModelParts,
      getResult: () => chat.sendMessageStream(userParts),
      streaming: true,
    });

    setPending(false);
    setUserParts('');
    setModelParts('');
    toast('🥳 Gemini responded!');
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className='space-y-2.5 fixed bottom-3 -translate-x-1/2 left-1/2 inset-x-0'
      >
        <section className='relative'>
          <TextareaAutosize
            rows={1}
            className='absolute bottom-0 w-full resize-none bg-secondary placeholder:text-primary/50 text-primary min-h-fit focus-within:outline-none p-5 rounded-lg'
            placeholder='Message Gemini...'
            required
            autoFocus
            value={userParts}
            onChange={(e) => setUserParts(e.target.value)}
          />

          <Button
            type='submit'
            size='icon'
            className='absolute right-3 bottom-3'
            disabled={pending || !userParts.trim()}
          >
            <Send className='w-6 h-6' />
          </Button>
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
              {el.role === 'model' ? (
                <pre className='text-sm whitespace-pre-wrap'>
                  {el.parts}
                  {modelParts && (
                    <span className='cursor-default animate-pulse'>▍</span>
                  )}
                </pre>
              ) : (
                <pre className='text-sm whitespace-pre-wrap'>{el.parts}</pre>
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
            {examplePropmts.map((el) => (
              <Button
                variant='link'
                type='button'
                className='w-fit underline-offset-8 text-base p-0'
                onClick={() => setUserParts(el)}
              >
                <ArrowRight className='mr-2' />
                {el}
              </Button>
            ))}
          </p>
        </div>
      )}
    </div>
  );
}
