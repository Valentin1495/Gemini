import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import UserAvatar from './user-avatar';
import { UserType } from '@/types';
import LogoutButton from './logout-button';

export default function UserDropdownMenu({ user }: UserType) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar user={user} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='mr-3'>
        <DropdownMenuLabel>
          <h3>{user?.name}</h3>
          <h3>{user?.email}</h3>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <LogoutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
