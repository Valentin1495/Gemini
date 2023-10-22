import { Skeleton } from './ui/skeleton';

export default function StorySkeleton() {
  return (
    <div className='grid gap-1.5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      <Skeleton className='story-skeleton' />
      <Skeleton className='story-skeleton' />
      <Skeleton className='story-skeleton' />
      <Skeleton className='story-skeleton' />
      <Skeleton className='story-skeleton' />
      <Skeleton className='story-skeleton' />
      <Skeleton className='story-skeleton' />
      <Skeleton className='story-skeleton' />
      <Skeleton className='story-skeleton' />
    </div>
  );
}
