'use client';

import { db } from '@/lib/firebase';
import { DraftType } from '@/types';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  or,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Draft from './draft';
import { FileTextIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';

type Props = {
  email: string;
};

export default function RealtimeDrafts({ email }: Props) {
  const [draftList, setDraftList] = useState<DraftType[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const deleteEmptyDocs = async () => {
      const qEmptyDrafts = query(
        collection(db, 'drafts'),
        or(where('prompt', '==', ''), where('story', '==', ''))
      );

      const querySnapshotEmptyDrafts = await getDocs(qEmptyDrafts);
      const emptyDrafsIdList: string[] = [];
      querySnapshotEmptyDrafts.docs.map((doc) => {
        emptyDrafsIdList.push(doc.id);
      });

      emptyDrafsIdList.map(async (id) => {
        await deleteDoc(doc(db, 'drafts', id));
      });
    };

    deleteEmptyDocs();

    const qDrafts = query(
      collection(db, 'drafts'),
      where('author', '==', email),
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(
      qDrafts,
      (snapshot) => {
        const list = snapshot.docs.map((doc) => doc.data()) as DraftType[];
        setDraftList(list);
        setLoading(false);
      },
      (error) => {
        toast.error(error.message);
        setLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className='space-y-5'>
      {draftList?.[0]?.prompt && draftList?.[0]?.story && (
        <span className='flex items-center gap-x-1.5'>
          <FileTextIcon className='w-5 h-5' />
          {draftList?.length}
        </span>
      )}
      {draftList?.length
        ? draftList.map((draft, i) => (
            <Draft
              key={draft.storyId}
              idx={i}
              numOfDrafts={draftList.length}
              {...draft}
            />
          ))
        : !loading && <p>You have no drafts.</p>}
      {loading && <p>loading...</p>}
    </div>
  );
}
