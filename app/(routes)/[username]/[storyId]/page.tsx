import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

type Params = {
  storyId: string;
};

export default async function SavedStory({ params }: { params: Params }) {
  const { storyId } = params;
  const docRef = doc(db, 'stories', storyId);
  const docSnap = await getDoc(docRef);

  // Document data
  if (docSnap.exists()) return <p>{docSnap.data().story}</p>;

  // docSnap.data() will be undefined in this case
  return <p>No such document!</p>;
}
