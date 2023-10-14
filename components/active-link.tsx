import { cn } from '@/lib/utils';
import Link from 'next/link';
import { ReactNode } from 'react';

type Props = {
  pathname: string;
  href: string;
  children: ReactNode;
};

export default function ActiveLink({ pathname, href, children }: Props) {
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(isActive ? 'underline text-primary' : 'text-primary/60')}
    >
      {children}
    </Link>
  );
}
