import EditDraftForm from '@/components/edit-draft-form';
import { db } from '@/lib/firebase';
import { DraftType } from '@/types';
import { collection, getDocs, query, where } from 'firebase/firestore';

type Props = {
  searchParams: {
    story_id: string;
  };
};

export default async function EditDraft({ searchParams }: Props) {
  const { story_id } = searchParams;
  const q = query(collection(db, 'drafts'), where('storyId', '==', story_id));
  const querySnapshot = await getDocs(q);
  const draft = querySnapshot.docs.map((doc) => doc.data())[0] as DraftType;

  return (
    <main className='pt-16 space-y-10'>
      <h1 className='text-xl text-primary'>Edit Draft</h1>
      <EditDraftForm storyId={story_id} draft={draft} />
    </main>
  );
}
