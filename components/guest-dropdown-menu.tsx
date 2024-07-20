import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import DropdownMenuLink from './dropdown-menu-link';
import { CircleUser } from 'lucide-react';

export default function GuestDropdownMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <CircleUser className='w-8 h-8' />
      </DropdownMenuTrigger>

      <DropdownMenuContent className='mr-3'>
        <DropdownMenuItem>
          <DropdownMenuLink href='/conversation' text='Conversation' />
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <DropdownMenuLink href='/image' text='Image generation' />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
