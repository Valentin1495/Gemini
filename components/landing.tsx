'use client';

import TypewriterComponent from 'typewriter-effect';
import { Button } from '@/components/ui/button';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Landing() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleClick = () => {
    if (session) {
      router.push('/dashboard');
    } else {
      signIn('google', { callbackUrl: '/dashboard' });
    }
  };

  return (
    <div className='text-white font-bold text-center space-y-5'>
      <div className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold'>
        <div className='relative h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 lg:w-32 lg:h-32 mx-auto'>
          <Image fill alt='Logo' src='/logo.png' />
        </div>
        <h1>The Best AI Tool for</h1>
        <div className='text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>
          <TypewriterComponent
            options={{
              strings: ['Chatbot.', 'Photo Generation.'],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <div className='text-sm md:text-xl font-light text-zinc-400'>
        Create content using AI 10x faster.
      </div>
      <div>
        <Button
          variant='premium'
          className='md:text-lg p-4 md:p-6 rounded-full font-semibold'
          onClick={handleClick}
        >
          Get Started
        </Button>
      </div>
    </div>
  );
}
