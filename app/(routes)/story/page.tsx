import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import StoryForm from '@/components/story-form';
import { getServerSession } from 'next-auth';

export default async function Story() {
  const session = await getServerSession(authOptions);

  return (
    <main>
      <StoryForm session={session} />
    </main>
  );
}
