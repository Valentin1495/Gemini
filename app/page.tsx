import LoginButton from '@/components/login-button';

export default function Home() {
  return (
    <main className='flex flex-col items-center min-h-screen justify-center max-w-7xl mx-auto gap-y-10 bg-gradient-to-r from-sky-100 via-blue-100 to-cyan-100'>
      <h1 className='text-7xl text-center font-bold text-primary'>
        AI <span className='text-primary/50'>story telling</span> assistant
      </h1>
      <LoginButton />
    </main>
  );
}
