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

type Props = UserType;

export default function UserDropdownMenu({ user }: Props) {
  const { name, email } = user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar user={user} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='mr-3'>
        <DropdownMenuLabel>
          <h3>{name}</h3>
          <h3>{email}</h3>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <LogoutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
