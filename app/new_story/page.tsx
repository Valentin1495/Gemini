import NewStoryForm from '@/components/new-story-form';
import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/options';

export default async function NewStory() {
  const session = await getServerSession(options);
  const email = session?.user?.email as string;
  const username = session?.user?.name as string;

  return (
    <main className='pt-16'>
      <NewStoryForm email={email} username={username} />
    </main>
  );
}
