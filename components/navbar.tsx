import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import UserDropdownMenu from './user-dropdown-menu';
import { User } from '@/types';
import LoginButton from './login-button';

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <nav className='z-10 fixed inset-x-0 top-0 py-3.5 px-5 sm:px-10 backdrop-blur-md shadow-sm'>
      <div className='flex justify-between items-center'>
        <Link
          href='/'
          className='font-bold text-xl sm:text-2xl text-primary hover:opacity-80 transition'
        >
          AIStoryteller
        </Link>
        <div className='flex items-center gap-x-2'>
          {session ? (
            <UserDropdownMenu user={session.user as User} />
          ) : (
            <LoginButton />
          )}
        </div>
      </div>
    </nav>
  );
}
