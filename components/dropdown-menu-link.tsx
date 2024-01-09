import Link from 'next/link';

type Props = {
  href: string;
  text: string;
};

export default function DropdownMenuLink({ href, text }: Props) {
  return (
    <Link href={href} className='w-full flex items-center gap-x-1.5'>
      {text}
    </Link>
  );
}
