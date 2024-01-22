import { Avatar, AvatarImage } from '@/components/ui/avatar';

export default function BotAvatar() {
  return (
    <Avatar className='h-8 w-8 bg-primary'>
      <AvatarImage className='p-1.5' src='/logo.png' />
    </Avatar>
  );
}
