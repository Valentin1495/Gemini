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
  modelParts: string;
  profilePic: string;
};

export default function ChatList({
  chatHistory,
  modelParts,
  profilePic,
}: ChatListProps) {
  return (
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
            <UserAvatar image={profilePic} className='w-8 h-8' />
          ) : (
            <BotAvatar />
          )}
          {el.role === 'model' ? (
            <section className='space-y-3 group'>
              <article className='font-bold text-base mt-1'>Gemini</article>
              <pre
                className={cn(
                  'font-sans whitespace-pre-wrap',
                  quicksand.variable
                )}
              >
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
              <pre
                className={cn(
                  'whitespace-pre-wrap font-sans',
                  quicksand.variable
                )}
              >
                {el.parts}
              </pre>
            </section>
          )}
        </div>
      ))}
    </div>
  );
}
