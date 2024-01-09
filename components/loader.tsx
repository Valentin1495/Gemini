import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function Loader({ className }: { className: string }) {
  return (
    <div className={cn('relative animate-spin', className)}>
      <Image alt='Logo' src='/logo.png' fill />
    </div>
  );
}
