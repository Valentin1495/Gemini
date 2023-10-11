import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/options';
import { Separator } from '@/components/ui/separator';
import { redirect } from 'next/navigation';
import { redis } from '@/lib/redis';
import { Post } from '@/types';
import SynopsisDialog from '@/components/synopsis-dialog';
import { Pencil2Icon } from '@radix-ui/react-icons';
import Link from 'next/link';

export default async function Dashboard() {
  const session = await getServerSession(options);
  const email = session?.user?.email as string;

  if (!session) {
    redirect('/');
  }

  // const postList = await redis.lrange(`${email}:published`, 0, -1);
  // const posts: Post[] = postList.map((post) => JSON.parse(post));
  const todos = await redis.hgetall('user:1');
  console.log(todos);
  return (
    <main className='pt-16'>
      <div className='flex items-center justify-between'>
        <h1 className='text-lg text-primary'>My Stories</h1>
        <section className='flex items-center gap-x-3'>
          <SynopsisDialog />
          <Link
            href={'/new_story'}
            className='flex items-center gap-x-1.5 text-primary hover:text-primary/70 transition'
          >
            <Pencil2Icon className='w-6 h-6' />
            Write
          </Link>
        </section>
      </div>
      <Separator className='my-4' />
      {/* {posts.length ? null : (
        <p className='text-primary/60'>You have no stories.</p>
      )} */}
    </main>
  );
}
