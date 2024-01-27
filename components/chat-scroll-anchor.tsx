'use client';

import { useInView } from 'react-intersection-observer';
import { useAtBottom } from '@/lib/hooks/use-at-bottom';
import { useEffect } from 'react';

export default function ChatScrollAnchor() {
  const isAtBottom = useAtBottom();
  const { ref, entry, inView } = useInView({
    trackVisibility: true,
    delay: 100,
    rootMargin: '0px 0px -112px 0px',
  });

  useEffect(() => {
    if (isAtBottom && !inView) {
      entry?.target.scrollIntoView({
        block: 'start',
      });
    }
  }, [inView, entry, isAtBottom]);

  return <div ref={ref} className='h-px w-full' />;
}
