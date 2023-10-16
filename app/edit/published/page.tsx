import EditPublishedForm from '@/components/edit-published-form';
import { db } from '@/lib/firebase';
import { PublishedType } from '@/types';
import { collection, getDocs, query, where } from 'firebase/firestore';

type Props = {
  searchParams: {
    story_id: string;
  };
};

export default async function EditPublished({ searchParams }: Props) {
  const { story_id } = searchParams;
  const q = query(
    collection(db, 'published'),
    where('storyId', '==', story_id)
  );
  const querySnapshot = await getDocs(q);
  const published = querySnapshot.docs.map((doc) =>
    doc.data()
  )[0] as PublishedType;

  return (
    <main className='pt-16 space-y-10'>
      <h1 className='text-xl text-primary'>Edit Story</h1>
      <EditPublishedForm storyId={story_id} published={published} />
    </main>
  );
}
