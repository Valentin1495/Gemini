import { UserType } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export default function UserAvatar({ user }: UserType) {
  return (
    <Avatar>
      <AvatarImage
        src={user.image as string}
        className='w-10 h-10'
        alt='profile-pic'
      />
      <AvatarFallback></AvatarFallback>
    </Avatar>
  );
}
