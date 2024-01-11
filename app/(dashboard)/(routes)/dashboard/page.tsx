import {
  ArrowRight,
  MessageSquareText,
  Image as ImageIcon,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';

export default async function Home() {
  return (
    <main className='flex flex-col items-center min-h-screen justify-center gap-y-8'>
      <div className=' text-4xl sm:text-7xl bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-500 text-white font-bold flex items-center gap-x-1 p-2.5 rounded-md'>
        Gemini <Sparkles className='w-6 h-6 sm:w-8 sm:h-8' />
      </div>
      <p className='text-xl sm:text-3xl text-primary font-semibold text-center'>
        Experience Google’s largest and most capable AI model
      </p>

      <Link
        className='text-sm sm:text-lg w-64 sm:w-80 border-2 border-primary/20 hover:border-primary/40 transition px-5 py-4 rounded-full font-semibold text-primary flex items-center gap-x-2'
        href='/conversation'
      >
        <article className='bg-violet-200 p-2 rounded-md'>
          <MessageSquareText className='w-4 h-4 sm:w-5 sm:h-5 text-violet-700' />
        </article>
        Conversation
        <ArrowRight className='w-4 h-4 sm:w-5 sm:h-5 ml-auto' />
      </Link>

      <Link
        className='text-sm sm:text-lg w-64 sm:w-80 border-2 border-primary/20 hover:border-primary/40 transition px-5 py-4 rounded-full font-semibold text-primary flex items-center gap-x-2'
        href='/image'
      >
        <article className='bg-rose-200 p-2 rounded-md'>
          <ImageIcon className='w-4 h-4 sm:w-5 sm:h-5 text-rose-700' />
        </article>
        Image generation
        <ArrowRight className='w-4 h-4 sm:w-5 sm:h-5 ml-auto' />
      </Link>
    </main>
  );
}
