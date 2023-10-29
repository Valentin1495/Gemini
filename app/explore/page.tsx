import { Separator } from '@/components/ui/separator';
import SynopsisDialog from '@/components/synopsis-dialog';
import WriteButton from '@/components/write-button';
import RealtimeStories from '@/components/realtime-stories';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/authOptions';
import { User } from '@/types';
import LoginDialog from '@/components/login-dialog';

export default async function Explore() {
  const session = await getServerSession(authOptions);

  return (
    <main>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl text-primary font-bold'>Explore</h1>
        <div className='flex items-center gap-x-3'>
          <SynopsisDialog />
          {session ? (
            <WriteButton user={session.user as User} hidden={true} />
          ) : (
            <LoginDialog />
          )}
        </div>
      </div>
      <Separator className='my-4' />
      <RealtimeStories />
    </main>
  );
}
