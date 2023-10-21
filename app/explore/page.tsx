import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/options';
import { Separator } from '@/components/ui/separator';
import { redirect } from 'next/navigation';
import SynopsisDialog from '@/components/synopsis-dialog';
import WriteButton from '@/components/write-button';
import RealtimeStories from '@/components/realtime-stories';

export default async function Explore() {
  const session = await getServerSession(options);

  if (!session) {
    redirect('/');
  }

  return (
    <main className='pt-16'>
      <div className='flex items-center justify-between'>
        <h1 className='text-lg text-primary font-bold'>Explore</h1>
        <div className='flex items-center gap-x-3'>
          <SynopsisDialog />
          <WriteButton />
        </div>
      </div>
      <Separator className='my-4' />
      <RealtimeStories />
    </main>
  );
}
