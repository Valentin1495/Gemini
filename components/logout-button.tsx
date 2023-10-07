'use client';

import { signOut } from 'next-auth/react';
import { DropdownMenuItem } from './ui/dropdown-menu';

export default function LogoutButton() {
  return (
    <DropdownMenuItem
      onClick={() => signOut({ callbackUrl: '/' })}
      className=''
    >
      Sign out
    </DropdownMenuItem>
  );
}
