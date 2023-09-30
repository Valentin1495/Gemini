import Link from 'next/link';
import LoginButton from './login-button';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import UserAvatar from './user-avatar';

type Props = {};
export default async function Navbar({}: Props) {
  const session = await getServerSession(options);

  return (
    <nav className='fixed inset-x-0 py-3'>
      <div className='flex justify-between items-center container'>
        <Link
          href={'/'}
          className='font-bold text-xl text-primary hover:opacity-70'
        >
          AICompanion
        </Link>
        {session?.user ? <UserAvatar user={session.user} /> : <LoginButton />}
      </div>
    </nav>
  );
}
