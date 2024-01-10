import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import SavedStories from '@/components/saved-stories';
import { getServerSession } from 'next-auth';

export default async function SavedStoriesPage() {
  const session = await getServerSession(authOptions);

  return (
    <main>
      <SavedStories session={session} />
    </main>
  );
}
