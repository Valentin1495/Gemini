import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import UserDropdownMenu from './user-dropdown-menu';
import { ModeToggle } from './mode-toggle';
import { User } from '@/types';

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <nav className='z-10 fixed inset-x-0 top-0 py-3.5 px-10 bg-secondary/95 shadow-md'>
      <div className='flex justify-between items-center'>
        <Link
          href={'/explore'}
          className='font-bold text-2xl text-primary hover:opacity-80 transition'
        >
          AIStoryteller
        </Link>
        <div className='flex items-center gap-x-2'>
          <ModeToggle />
          {session && <UserDropdownMenu user={session.user as User} />}
        </div>
      </div>
    </nav>
  );
}
