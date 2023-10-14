import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/options';
import { Separator } from '@/components/ui/separator';
import { redirect } from 'next/navigation';
import SynopsisDialog from '@/components/synopsis-dialog';

export default async function Explore() {
  const session = await getServerSession(options);

  if (!session) {
    redirect('/');
  }

  return (
    <main className='pt-16'>
      <div className='flex items-center justify-between'>
        <h1 className='text-lg text-primary font-bold'>Explore</h1>
        <SynopsisDialog />
      </div>
      <Separator className='my-4' />
      {/* {posts.length ? null : (
        <p className='text-primary/60'>You have no stories.</p>
      )} */}
    </main>
  );
}
