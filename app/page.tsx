import { ArrowRight, BookOpenText, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

export default async function Home() {
  return (
    <main className='flex flex-col items-center min-h-screen justify-center gap-y-8'>
      <div className='flex items-center gap-x-5'>
        <h1 className='text-4xl sm:text-7xl text-center font-bold text-primary'>
          AIStoryteller
        </h1>
      </div>
      <p className='text-xl sm:text-3xl text-primary/50 font-semibold'>
        Experience the power of AI
      </p>

      <Link
        className='text-sm sm:text-lg w-64 sm:w-80 shadow-md hover:shadow-lg transition p-4 rounded-md font-semibold text-primary flex items-center gap-x-2'
        href='/story'
      >
        <article className='bg-violet-200 p-2 rounded-md'>
          <BookOpenText className='w-4 h-4 sm:w-5 sm:h-5 text-violet-700' />
        </article>
        Story generation
        <ArrowRight className='w-4 h-4 sm:w-5 sm:h-5 ml-auto' />
      </Link>

      <Link
        className='text-sm sm:text-lg w-64 sm:w-80 shadow-md hover:shadow-lg transition p-4 rounded-md font-semibold text-primary flex items-center gap-x-2'
        href='/thumbnail'
      >
        <article className='bg-rose-200 p-2 rounded-md'>
          <ImageIcon className='w-4 h-4 sm:w-5 sm:h-5 text-rose-700' />
        </article>
        Thumbnail generation
        <ArrowRight className='w-4 h-4 sm:w-5 sm:h-5 ml-auto' />
      </Link>
    </main>
  );
}
