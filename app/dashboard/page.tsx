import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/options';
import { Separator } from '@/components/ui/separator';
import { redirect } from 'next/navigation';
import NewStoryDialog from '@/components/new-story-dialog';
import { redis } from '@/lib/redis';

type Props = {
  searchParams: {
    show_dialog?: string;
  };
};

export default async function Dashboard({ searchParams }: Props) {
  const session = await getServerSession(options);
  const email = session?.user?.email as string;

  if (!session) {
    redirect('/');
  }

  const posts = await redis.lrange(`user:${email}:posts`, 0, -1);

  return (
    <main className='pt-16'>
      <h1 className='text-lg text-primary'>My Stories</h1>
      <Separator className='my-4' />

      <NewStoryDialog showDialog={searchParams.show_dialog} />
    </main>
  );
}
