import NewStoryForm from '@/components/new-story-form';
import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/options';
import { UserType } from '@/types';

export default async function NewStory() {
  const session = await getServerSession(options);

  return (
    <main className='pt-16'>
      <NewStoryForm session={session as UserType} />
    </main>
  );
}
