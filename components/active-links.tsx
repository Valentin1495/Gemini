'use client';

import ActiveLink from '@/components/active-link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

type Props = {
  numOfStories: {
    drafts: number;
    published: number;
  };
  showToast?: string;
};

export default function ActiveLinks({ numOfStories, showToast }: Props) {
  const pathname = usePathname();
  const { drafts, published } = numOfStories;

  useEffect(() => {
    if (showToast === 'y') {
      toast.success('Published a new story', {
        id: 'published',
      });
    }
  }, [showToast]);

  return (
    <div className='space-y-10'>
      <h1 className='text-4xl font-bold text-primary'>Your Stories</h1>
      <section className='space-x-2.5 mb-10'>
        <ActiveLink href='/stories/drafts' pathname={pathname}>
          Drafts {drafts}
        </ActiveLink>
        <ActiveLink href='/stories/published' pathname={pathname}>
          Published {published}
        </ActiveLink>
      </section>
    </div>
  );
}
