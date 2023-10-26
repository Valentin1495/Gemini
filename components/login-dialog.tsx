import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Pencil1Icon } from '@radix-ui/react-icons';
import LoginButton from './login-button';

export default function LoginDialog() {
  return (
    <Dialog>
      <DialogTrigger className='w-full text-left flex items-center gap-x-1.5'>
        <Pencil1Icon className='w-6 h-6' />
        Write
      </DialogTrigger>
      <DialogContent className='max-w-fit px-10'>
        <DialogHeader>
          <DialogTitle>Wanna write your own story?</DialogTitle>
          <DialogDescription>Sign in and get started!</DialogDescription>
        </DialogHeader>
        <LoginButton />
      </DialogContent>
    </Dialog>
  );
}
