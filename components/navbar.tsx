import Link from 'next/link';
import { Button } from './ui/button';

type Props = {};
export default function Navbar({}: Props) {
  return (
    <nav className='py-3 flex justify-between items-center'>
      <Link
        href={'/'}
        className='font-bold text-xl text-purple-700 hover:opacity-70'
      >
        QuizGPT
      </Link>
      <Button
        asChild
        className='font-semibold text-purple-500 bg-purple-100 hover:bg-purple-700 hover:text-purple-100'
      >
        <Link href='/api/auth/signin'>Sign in</Link>
      </Button>
    </nav>
  );
}
