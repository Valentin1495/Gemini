import { options } from '@/app/api/auth/[...nextauth]/options';
import ActiveLinks from '@/components/active-links';
import RealtimeDrafts from '@/components/realtime-drafts';
import { getServerSession } from 'next-auth';

export default async function Drafts() {
  const session = await getServerSession(options);
  const email = session?.user?.email as string;

  return (
    <main className='pt-16'>
      <ActiveLinks />
      <div className='space-y-5 mt-10'>
        <RealtimeDrafts email={email} />
      </div>
    </main>
  );
}