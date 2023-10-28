import { Skeleton } from './ui/skeleton';

type Props = {
  className: string;
  length: number;
};

export default function StorySkeleton({ className, length }: Props) {
  const numberArray = Array.from({ length }, (_, index) => index);

  return (
    <div className={className}>
      {numberArray.map((el) => (
        <Skeleton className='story-skeleton' key={el} />
      ))}
    </div>
  );
}
