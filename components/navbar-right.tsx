'use client';

import { Session } from 'next-auth';
import UserDropdownMenu from './user-dropdown-menu';
import { User } from '@/types';
import { usePathname } from 'next/navigation';

type Props = {
  session: Session | null;
};

export default function NavbarRight({ session }: Props) {
  const pathname = usePathname();

  if (pathname === '/') return null;

  return (
    <div className='flex items-center gap-x-2'>
      <UserDropdownMenu user={session?.user as User} />
    </div>
  );
}
