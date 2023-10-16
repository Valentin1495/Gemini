import { options } from '@/app/api/auth/[...nextauth]/options';
import ActiveLinks from '@/components/active-links';
import Published from '@/components/published';
import { db } from '@/lib/firebase';
import { PublishedType } from '@/types';
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
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

  published.map(async (story) => {
    await setDoc(
      doc(db, 'published', story.storyId),
      { storyId: story.storyId },
      { merge: true }
    );
  });

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
      <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-10'>
        {published.length ? (
          published.map((published) => (
            <Published key={published.storyId} {...published} />
          ))
        ) : (
          <p className='mt-5'>You have no drafts.</p>
        )}
      </div>
    </main>
  );
}
