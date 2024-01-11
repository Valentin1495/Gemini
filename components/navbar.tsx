import { Montserrat } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import NavbarRight from './navbar-right';

const font = Montserrat({ weight: '600', subsets: ['latin'] });

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <nav className='p-4 bg-transparent flex items-center justify-between fixed w-full backdrop-blur-md z-10'>
      <Link href='/' className='flex items-center'>
        <div className='relative h-8 w-8 mr-4'>
          <Image fill alt='Logo' src='/logo.png' />
        </div>
        <h1 className={cn('text-2xl font-bold text-white', font.className)}>
          Gemini
        </h1>
      </Link>

      <NavbarRight session={session} />
    </nav>
  );
}
