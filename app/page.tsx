import LoginButton from '@/components/login-button';
import { getServerSession } from 'next-auth';
import { options } from './api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getServerSession(options);

  if (session) {
    redirect('/explore');
  }

  return (
    <main className='flex flex-col items-center min-h-screen justify-center gap-y-10 bg-gradient-to-r from-sky-100 via-blue-100 to-cyan-100'>
      <h1 className='text-7xl text-center font-bold text-primary'>
        AI <span className='text-primary/50'>story telling</span> assistant
      </h1>
      <LoginButton />
    </main>
  );
}
