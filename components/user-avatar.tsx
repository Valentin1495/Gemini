import { UserType } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export default function UserAvatar({ user }: UserType) {
  return (
    <Avatar>
      <AvatarImage
        src={user?.image as string | undefined}
        className='object-cover'
        alt='Profile picture'
      />
      <AvatarFallback></AvatarFallback>
    </Avatar>
  );
}
