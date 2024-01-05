'use client';

import { Button } from '@/components/ui/button';
import Loader from './loader';
// @ts-expect-error
import { useFormStatus } from 'react-dom';

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type='submit' size={'lg'} aria-disabled={pending} className='w-24'>
      {pending ? <Loader width='w-7' height='h-7' /> : 'Generate'}
    </Button>
  );
}
