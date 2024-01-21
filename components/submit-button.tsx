'use client';

import { Button } from '@/components/ui/button';
import Loader from './loader';

type ButtonProps = {
  variant:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
    | 'premium';
  className: string;
  text: string;
  size: 'default' | 'sm' | 'lg' | 'icon';
  pending: boolean;
};

export default function SubmitButton({
  variant,
  className,
  text,
  size,
  pending,
}: ButtonProps) {
  return (
    <Button
      variant={variant}
      type='submit'
      size={size}
      disabled={pending}
      className={className}
    >
      {pending ? <Loader className='w-6 h-6' /> : text}
    </Button>
  );
}
