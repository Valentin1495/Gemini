import {
  ArrowRight,
  MessageSquareText,
  Image as ImageIcon,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';

export default async function Home() {
  return (
    <main className='flex flex-col items-center min-h-screen justify-center'>
      <div className='mb-8 text-4xl sm:text-7xl bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-500 text-transparent bg-clip-text font-bold flex items-center gap-x-1 p-2.5 rounded-md'>
        Gemini
        <Sparkles className='w-6 h-6 sm:w-8 sm:h-8 text-cyan-500' />
      </div>
      <p className='mb-8 text-xl sm:text-3xl text-primary font-semibold text-center'>
        Experience the power of AI
      </p>

      <Link
        className='group text-sm sm:text-lg w-64 sm:w-80 bg-secondary/80 hover:bg-secondary transition-colors duration-300 px-6 py-4 rounded-full font-semibold text-primary flex items-center gap-x-2 mb-4'
        href='/conversation'
      >
        <article className='bg-violet-200 p-2 rounded-md'>
          <MessageSquareText className='w-4 h-4 sm:w-5 sm:h-5 text-violet-700' />
        </article>
        Conversation
        <ArrowRight className='w-4 h-4 sm:w-5 sm:h-5 ml-auto group-hover:scale-150 transition-transform duration-300' />
      </Link>

      {/* <Link
        className='group text-sm sm:text-lg w-64 sm:w-80 bg-secondary/80 hover:bg-secondary transition-colors duration-300 px-6 py-4 rounded-full font-semibold text-primary flex items-center gap-x-2'
        href='/image'
      >
        <article className='bg-rose-200 p-2 rounded-md'>
          <ImageIcon className='w-4 h-4 sm:w-5 sm:h-5 text-rose-700' />
        </article>
        Image generation
        <ArrowRight className='w-4 h-4 sm:w-5 sm:h-5 ml-auto group-hover:scale-150 transition-transform duration-300' />
      </Link> */}
    </main>
  );
}
