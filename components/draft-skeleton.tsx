import { Separator } from './ui/separator';
import { Skeleton } from './ui/skeleton';

export default function DraftSkeleton() {
  return (
    <div className='space-y-7'>
      <Skeleton className='w-10 h-4' />
      <section className='space-y-2'>
        <Skeleton className='w-1/2 h-4' />
        <Skeleton className='w-2/3 h-4' />
        <article className='h-1.5'></article>
        <Skeleton className='w-1/3 h-4' />
      </section>

      <Separator />

      <section className='space-y-2'>
        <Skeleton className='w-1/2 h-4' />
        <Skeleton className='w-2/3 h-4' />
        <article className='h-1.5'></article>
        <Skeleton className='w-1/3 h-4' />
      </section>

      <Separator />

      <section className='space-y-2'>
        <Skeleton className='w-1/2 h-4' />
        <Skeleton className='w-2/3 h-4' />
        <article className='h-1.5'></article>
        <Skeleton className='w-1/3 h-4' />
      </section>
    </div>
  );
}
