import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import UserAvatar from './user-avatar';
import { User } from '@/lib/types';
import LogoutButton from './logout-button';
import DropdownMenuLink from './dropdown-menu-link';

export default function UserDropdownMenu({ user }: { user: User }) {
  const { image, name, email } = user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar image={image} className='w-8 h-8' />
      </DropdownMenuTrigger>

      <DropdownMenuContent className='mr-3'>
        <DropdownMenuLabel>
          <h3>{name}</h3>
          <h3>{email}</h3>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <DropdownMenuLink href='/conversation' text='Conversation' />
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <DropdownMenuLink href='/image' text='Image generation' />
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
