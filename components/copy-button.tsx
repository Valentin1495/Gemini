'use client';

import { Button } from '@/components/ui/button';
import { useCopyToClipboard } from '@/lib/hooks/use-copy-to-clipboard';
import { cn } from '@/lib/utils';
import { Check, Copy } from 'lucide-react';

type CopyButtonProps = {
  message: string;
  isLast: boolean;
};

export default function CopyButton({ message, isLast }: CopyButtonProps) {
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 });

  const copyMessage = () => {
    if (isCopied) return;
    copyToClipboard(message);
  };

  return (
    <Button
      variant='ghost'
      size='icon'
      onClick={copyMessage}
      className={cn(
        !isLast && 'group-hover:opacity-100 opacity-0 transition-opacity'
      )}
    >
      {isCopied ? <Check className='w-6 h-6' /> : <Copy className='w-4 h-4' />}
      <span className='sr-only'>Copy message</span>
    </Button>
  );
}
