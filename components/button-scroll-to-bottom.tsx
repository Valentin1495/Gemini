'use client';

import { cn } from '@/lib/utils';
import { useAtBottom } from '@/lib/hooks/use-at-bottom';
import { Button, type ButtonProps } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

export function ButtonScrollToBottom({ className, ...props }: ButtonProps) {
  const isAtBottom = useAtBottom();

  return (
    <Button
      type='button'
      variant='ghost'
      size='icon'
      className={cn(
        'absolute bottom-20 -translate-x-1/2 left-1/2 z-10 bg-background transition-opacity duration-300 rounded-full',
        isAtBottom ? 'opacity-0 pointer-events-none' : 'opacity-100',
        className
      )}
      onClick={() =>
        window.scrollTo({
          top: document.body.offsetHeight,
          behavior: 'smooth',
        })
      }
      {...props}
    >
      <ArrowDown className='w-6 h-6' />
      <span className='sr-only'>Scroll to bottom</span>
    </Button>
  );
}
