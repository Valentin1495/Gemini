import { Session, getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/options';
import { Separator } from '@/components/ui/separator';
import { redirect } from 'next/navigation';
import NewStoryDialog from '@/components/new-story-dialog';

type Props = {
  searchParams: {
    show_dialog?: string;
  };
};

export default async function Dashboard({ searchParams }: Props) {
  const session = (await getServerSession(options)) as Session;

  if (!session) {
    redirect('/');
  }

  return (
    <main className='pt-16'>
      <h1 className='text-lg text-primary'>My Stories</h1>
      <Separator className='my-4' />
      {/* <p className='text-primary/50'>You have no stories yet.</p> */}

      <NewStoryDialog showDialog={searchParams.show_dialog} />
    </main>
  );
}
