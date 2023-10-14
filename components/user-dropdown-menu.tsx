import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import UserAvatar from './user-avatar';
import { UserType } from '@/types';
import LogoutButton from './logout-button';
import Link from 'next/link';

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
        <DropdownMenuItem>
          <Link href={'/stories/drafts'} className='w-full'>
            Stories
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <LogoutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
