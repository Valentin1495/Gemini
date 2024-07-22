'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import DropdownMenuLink from './dropdown-menu-link';
import { CircleUser } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function GuestDropdownMenu() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();
  const handleItemClick = () => {
    setIsDropdownOpen(false);
  };

  if (pathname === '/dashboard') return null;

  return (
    <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
      <DropdownMenuTrigger>
        <CircleUser className='w-8 h-8' />
      </DropdownMenuTrigger>

      <DropdownMenuContent className='mr-3'>
        <DropdownMenuItem
          onClick={handleItemClick}
          disabled={pathname === '/conversation'}
        >
          <DropdownMenuLink href='/conversation' text='Conversation' />
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleItemClick}
          disabled={pathname === '/image'}
        >
          <DropdownMenuLink href='/image' text='Image generation' />
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleItemClick}>
          <DropdownMenuLink href='/dashboard' text='Dashboard' />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
