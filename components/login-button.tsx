'use client';

import { Button } from './ui/button';
import { signIn } from 'next-auth/react';

export default function LoginButton() {
  return (
    <Button
      onClick={() => signIn('google')}
      className='font-semibold text-purple-500 bg-purple-100 hover:bg-purple-700 hover:text-purple-100'
    >
      Login
    </Button>
  );
}
