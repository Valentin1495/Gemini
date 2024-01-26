import { Msg } from '@/lib/types';
import { cn } from '@/lib/utils';
import UserAvatar from './user-avatar';
import BotAvatar from './bot-avatar';
import CopyButton from './copy-button';
import { Quicksand } from 'next/font/google';

const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-quicksand',
});

type ChatListProps = {
  chatHistory: Msg[];
  pending: boolean;
  profilePic: string;
};

export default function ChatList({
  chatHistory,
  pending,
  profilePic,
}: ChatListProps) {
  return (
    <div className='flex flex-col gap-y-4'>
      {chatHistory.map((el, idx) => (
        <div
          key={idx}
          className={cn(
            'w-full flex gap-x-3 rounded-xl',
            el.role === 'user'
              ? 'p-8 bg-primary-foreground'
              : 'pt-8 px-8 pb-1 bg-slate-900'
          )}
        >
          {el.role === 'user' ? (
            <UserAvatar image={profilePic} className='w-8 h-8' />
          ) : (
            <BotAvatar />
          )}
          {el.role === 'model' ? (
            <section className='group'>
              <h1 className='font-bold text-base mt-1 mb-3'>Gemini</h1>
              <p
                className={cn(
                  'font-sans whitespace-pre-wrap mb-1',
                  quicksand.variable
                )}
              >
                {el.parts}
                {idx === chatHistory.length - 1 && pending && (
                  <span className='cursor-default animate-pulse'>▍</span>
                )}
              </p>
              <CopyButton message={el.parts} />
            </section>
          ) : (
            <section className='space-y-3'>
              <h1 className='font-bold text-base mt-1'>You</h1>
              <p
                className={cn(
                  'whitespace-pre-wrap font-sans',
                  quicksand.variable
                )}
              >
                {el.parts}
              </p>
            </section>
          )}
        </div>
      ))}
    </div>
  );
}
