'use client';

import { Button } from './ui/button';
import { signIn } from 'next-auth/react';

export default function LoginButton() {
  return (
    <Button
      onClick={() => signIn('google', { callbackUrl: '/explore' })}
      variant={'login'}
      size={'lg'}
    >
      Get Started
    </Button>
  );
}
