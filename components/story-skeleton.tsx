import { Skeleton } from './ui/skeleton';

export default function StorySkeleton() {
  const numberArray = Array.from({ length: 15 }, (_, index) => index);

  return (
    <div className='story-skeleton-container'>
      {numberArray.map((el) => (
        <Skeleton className='story-skeleton' key={el} />
      ))}
    </div>
  );
}
