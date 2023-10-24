import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import ActiveLinks from '@/components/active-links';
import RealtimePublished from '@/components/realtime-published';
import { getServerSession } from 'next-auth';

type Props = {
  searchParams?: {
    show_toast: string;
  };
};

export default async function PublishedStories({ searchParams }: Props) {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email as string;

  return (
    <main className='pt-16'>
      <ActiveLinks showToast={searchParams?.show_toast} />
      <RealtimePublished author={email} />
    </main>
  );
}
