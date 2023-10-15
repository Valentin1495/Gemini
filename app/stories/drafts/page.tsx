import { options } from '@/app/api/auth/[...nextauth]/options';
import ActiveLinks from '@/components/active-links';
import Draft from '@/components/draft';
import { db } from '@/lib/firebase';
import { DraftType } from '@/types';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { getServerSession } from 'next-auth';

export default async function Drafts() {
  const session = await getServerSession(options);
  const email = session?.user?.email;

  const qDrafts = query(
    collection(db, 'drafts'),
    where('author', '==', email),
    orderBy('timestamp', 'desc')
  );
  const qPublished = query(
    collection(db, 'published'),
    where('author', '==', email)
  );

  const querySnapshotDrafts = await getDocs(qDrafts);
  const querySnapshotPublished = await getDocs(qPublished);

  const drafts = querySnapshotDrafts.docs.map((doc) =>
    doc.data()
  ) as DraftType[];
  const published = querySnapshotPublished.docs.map((doc) => doc.data());

  const numOfDrafts = drafts.length;
  const numOfPublished = published.length;

  const numOfStories = {
    drafts: numOfDrafts,
    published: numOfPublished,
  };

  return (
    <main className='pt-16'>
      <ActiveLinks numOfStories={numOfStories} />
      <div className='space-y-5 mt-10'>
        {drafts.length ? (
          drafts.map((draft, i) => (
            <Draft
              key={draft.storyId}
              idx={i}
              numOfDrafts={numOfDrafts}
              {...draft}
            />
          ))
        ) : (
          <p>You have no drafts.</p>
        )}
      </div>
    </main>
  );
}
