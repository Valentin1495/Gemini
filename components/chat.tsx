'use client';

import { FormEvent, useState } from 'react';
import { startChat, updateUI } from '@/lib/utils';
import { toast } from 'sonner';
import { Send } from 'lucide-react';
import { Button } from './ui/button';
import { useSession } from 'next-auth/react';
import { Msg } from '@/lib/types';
import TextareaAutosize from 'react-textarea-autosize';
import Loader from './loader';
import { ButtonScrollToBottom } from './button-scroll-to-bottom';
import EmptyScreen from './empty-screen';
import ChatList from './chat-list';

export default function Chat() {
  const { data: session } = useSession();
  const [userParts, setUserParts] = useState<string>('');
  const [modelParts, setModelParts] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<Msg[]>([]);
  const [pending, setPending] = useState<boolean>(false);
  const profilePic = session?.user?.image as string;

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
        <ChatList
          chatHistory={chatHistory}
          modelParts={modelParts}
          profilePic={profilePic}
        />
      ) : (
        <EmptyScreen setUserParts={setUserParts} />
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
              <Loader className='w-6 h-6 border-secondary/50 border-t-secondary' />
            ) : (
              <Send className='w-6 h-6' />
            )}
          </Button>
        </section>
      </form>
    </div>
  );
}
