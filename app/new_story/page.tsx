import NewStoryForm from '@/components/new-story-form';
import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/options';
import { SessionType } from '@/types';
import { redirect } from 'next/navigation';

export default async function NewStory() {
  const session = await getServerSession(options);

  if (!session) {
    redirect('/');
  }

  return (
    <main className='pt-16'>
      <NewStoryForm session={session as SessionType} />
    </main>
  );
}
