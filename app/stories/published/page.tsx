import { options } from '@/app/api/auth/[...nextauth]/options';
import ActiveLinks from '@/components/active-links';
import Published from '@/components/published';
import { db } from '@/lib/firebase';
import { PublishedType } from '@/types';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { getServerSession } from 'next-auth';

type Props = {
  searchParams?: {
    show_toast: string;
  };
};

export default async function PublishedStories({ searchParams }: Props) {
  const session = await getServerSession(options);
  const email = session?.user?.email;

  const qDrafts = query(collection(db, 'drafts'), where('author', '==', email));
  const qPublished = query(
    collection(db, 'published'),
    where('author', '==', email),
    orderBy('timestamp', 'desc')
  );

  const querySnapshotDrafts = await getDocs(qDrafts);
  const querySnapshotPublished = await getDocs(qPublished);

  const drafts = querySnapshotDrafts.docs.map((doc) => doc.data());
  const published = querySnapshotPublished.docs.map((doc) => {
    return { ...doc.data(), storyId: doc.id };
  }) as PublishedType[];

  const numOfDrafts = drafts.length;
  const numOfPublished = published.length;

  const numOfStories = {
    drafts: numOfDrafts,
    published: numOfPublished,
  };

  return (
    <main className='pt-16'>
      <ActiveLinks
        numOfStories={numOfStories}
        showToast={searchParams?.show_toast}
      />
      <div className='space-y-5 mt-10'>
        {published.length ? (
          published.map((published, i) => (
            <Published
              key={published.storyId}
              idx={i}
              numOfPublished={numOfPublished}
              {...published}
            />
          ))
        ) : (
          <p className='mt-5'>You have no drafts.</p>
        )}
      </div>
    </main>
  );
}
