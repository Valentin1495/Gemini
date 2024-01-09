'use client';

import { signIn } from 'next-auth/react';

export default function LoginButton() {
  return (
    <button
      onClick={() => signIn('google', { callbackUrl: '/story' })}
      className='h-8 rounded-md px-3 text-xs md:h-10 md:text-base md:px-8 w-full bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-500 text-white font-bold hover:opacity-90 transition'
    >
      Sign in
    </button>
  );
}
