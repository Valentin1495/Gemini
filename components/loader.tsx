import { cn } from '@/lib/utils';

export default function Loader({ className }: { className: string }) {
  return (
    <div
      className={cn(
        'animate-spin rounded-full border-t-4 border-t-primary border-4',
        className
      )}
    />
  );
}
