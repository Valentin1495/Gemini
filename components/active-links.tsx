'use client';

import ActiveLink from '@/components/active-link';
import { usePathname } from 'next/navigation';

type Props = {
  numOfStories: {
    drafts: number;
    published: number;
  };
};

export default function ActiveLinks({ numOfStories }: Props) {
  const pathname = usePathname();
  const { drafts, published } = numOfStories;

  return (
    <div className='space-x-2.5 mb-10'>
      <ActiveLink href='/stories/drafts' pathname={pathname}>
        Drafts {drafts}
      </ActiveLink>
      <ActiveLink href='/stories/public' pathname={pathname}>
        Published {published}
      </ActiveLink>
    </div>
  );
}
