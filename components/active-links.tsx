'use client';

import ActiveLink from '@/components/active-link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useToast } from './ui/use-toast';

type Props = {
  showToast?: string;
};

export default function ActiveLinks({ showToast }: Props) {
  const pathname = usePathname();
  const { toast } = useToast();

  useEffect(() => {
    if (showToast === 'y') {
      toast({ title: '🥳 Published a new story!' });
    }
  }, [showToast]);

  return (
    <div className='space-y-10'>
      <h1 className='text-4xl font-bold text-primary'>Your Stories</h1>
      <section className='space-x-2.5 mb-10'>
        <ActiveLink href='/stories/drafts' pathname={pathname}>
          Drafts
        </ActiveLink>
        <ActiveLink href='/stories/published' pathname={pathname}>
          Published
        </ActiveLink>
      </section>
    </div>
  );
}
