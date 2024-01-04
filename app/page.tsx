import { BookOpenText, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default async function Home() {
  return (
    <main className='flex flex-col items-center min-h-screen justify-center gap-y-8'>
      <div className='flex items-center gap-x-5'>
        <Image src='/logo.png' alt='Logo' width={90} height={90} />
        <h1 className='text-7xl text-center font-bold text-primary'>
          AIStoryteller
        </h1>
      </div>
      <p className='text-3xl text-primary/50 font-semibold'>
        Experience the power of AI
      </p>
      <div className='flex items-center gap-x-10'>
        <Link
          className='text-lg font-semibold text-primary flex items-center gap-x-2'
          href='/story'
        >
          <article className='bg-violet-200 p-2 rounded-md'>
            <BookOpenText className='w-5 h-5 text-violet-700' />
          </article>
          Story
        </Link>

        <Link
          className='text-lg font-semibold text-primary flex items-center gap-x-2'
          href='/thumbnail'
        >
          <article className='bg-rose-200 p-2 rounded-md'>
            <ImageIcon className='w-5 h-5 text-rose-700' />
          </article>
          Thumbnail
        </Link>
      </div>
    </main>
  );
}
