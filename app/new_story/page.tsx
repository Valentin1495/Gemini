import NewStoryForm from '@/components/new-story-form';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/authOptions';
import { SessionType } from '@/types';

export default async function NewStory() {
  const session = await getServerSession(authOptions);

  return (
    <main className='pt-16'>
      <NewStoryForm session={session as SessionType} />
    </main>
  );
}
