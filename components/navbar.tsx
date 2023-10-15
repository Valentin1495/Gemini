import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import UserDropdownMenu from './user-dropdown-menu';
import { ModeToggle } from './mode-toggle';

export default async function Navbar() {
  const session = await getServerSession(options);

  return (
    <nav className='fixed inset-x-0 top-0 py-5 px-10 bg-secondary/90 shadow-md'>
      <div className='flex justify-between items-center'>
        <Link
          href={'/'}
          className='font-bold text-2xl text-primary hover:opacity-80 transition'
        >
          AIStoryteller
        </Link>
        <div className='flex items-center gap-x-2'>
          <ModeToggle />
          <UserDropdownMenu user={session?.user} />
        </div>
      </div>
    </nav>
  );
}
