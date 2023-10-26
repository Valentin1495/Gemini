import Link from 'next/link';

export default async function Home() {
  return (
    <main className='flex flex-col items-center min-h-screen justify-center gap-y-10 bg-gradient-to-r from-sky-100 via-blue-100 to-cyan-100'>
      <h1 className='text-7xl text-center font-bold text-muted-foreground'>
        AIStoryteller
      </h1>
      <Link
        href={'/explore'}
        className='h-10 rounded-md px-5 leading-10 bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-500 text-white font-bold hover:opacity-90 transition'
      >
        Get inspiration
      </Link>
    </main>
  );
}
