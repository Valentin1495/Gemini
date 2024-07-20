'use client';

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { startChat, updateUI } from '@/lib/utils';
import { Send } from 'lucide-react';
import { Button } from './ui/button';
// import { useSession } from 'next-auth/react';
import { Msg } from '@/lib/types';
import TextareaAutosize from 'react-textarea-autosize';
import Loader from './loader';
import { ButtonScrollToBottom } from './button-scroll-to-bottom';
import EmptyScreen from './empty-screen';
import ChatList from './chat-list';

export default function Chat() {
  // const { data: session } = useSession();
  const [userParts, setUserParts] = useState<string>('');
  const [modelParts, setModelParts] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<Msg[]>([]);
  const [pending, setPending] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  // const profilePic = session?.user?.image as string;

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
    setChatHistory(updatedChatHistory);

    const chat = startChat(updatedChatHistory);
    await updateUI({
      chatHistory: updatedChatHistory,
      setChatHistory,
      setModelParts,
      getResult: () => chat.sendMessageStream(userParts),
      streaming: true,
    });

    setPending(false);
    setModelParts('');
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event as any); // TypeScript workaround for FormEvent
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [chatHistory]);

  return (
    <>
      <div className='flex flex-col justify-between min-h-screen pt-20'>
        {chatHistory.length ? (
          <ChatList
            chatHistory={chatHistory}
            pending={pending}
            // profilePic={profilePic}
            profilePic=''
          />
        ) : (
          <EmptyScreen setUserParts={setUserParts} />
        )}

        <form onSubmit={handleSubmit} className='sticky bottom-0 mt-24'>
          <section className='relative bg-background h-4'>
            <ButtonScrollToBottom />
            <TextareaAutosize
              rows={1}
              className='absolute bottom-3 w-full resize-none bg-secondary placeholder:text-primary/50 text-primary min-h-fit max-h-48 focus-within:outline-none pl-6 py-5 pr-16 rounded-2xl'
              placeholder='Message Gemini'
              autoFocus
              value={userParts}
              onChange={(e) => setUserParts(e.target.value)}
              onKeyDown={handleKeyDown}
            />

            <Button
              type='submit'
              size='icon'
              className='absolute right-6 bottom-[26px] rounded-xl'
              disabled={pending || !userParts.trim()}
            >
              {pending ? (
                <Loader className='w-6 h-6 border-secondary/50 border-t-secondary' />
              ) : (
                <Send className='w-6 h-6' />
              )}
            </Button>
          </section>
        </form>
      </div>
      <div ref={chatEndRef} />
    </>
  );
}
