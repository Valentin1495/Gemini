import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Skeleton } from './ui/skeleton';
import { cn } from '@/lib/utils';

type Props = {
  image: string;
  className: string;
};

export default function UserAvatar({ image, className }: Props) {
  return (
    <Avatar className={cn(className)}>
      <AvatarImage src={image} className='object-cover' alt='Profile picture' />
      <AvatarFallback>
        <Skeleton className={cn(className, 'rounded-full')} />
      </AvatarFallback>
    </Avatar>
  );
}
