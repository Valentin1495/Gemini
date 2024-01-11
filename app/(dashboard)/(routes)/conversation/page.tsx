import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import Chat from '@/components/chat';
import { getServerSession } from 'next-auth';

export default async function Conversation() {
  const session = await getServerSession(authOptions);

  return (
    <main className='min-h-screen pt-24 pb-16'>
      <Chat session={session} />
    </main>
  );
}
