import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import LoginButton from './login-button';
import { Button } from './ui/button';

export default function LoginDialog() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant='outline'>Save</Button>
      </DialogTrigger>
      <DialogContent className='max-w-[300px] px-10'>
        <DialogHeader>
          <DialogTitle>Save the story.</DialogTitle>
          <DialogDescription>Sign in and get started.</DialogDescription>
        </DialogHeader>
        <LoginButton />
      </DialogContent>
    </Dialog>
  );
}
