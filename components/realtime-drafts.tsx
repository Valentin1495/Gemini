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
import DraftSkeleton from './draft-skeleton';

type Props = {
  email: string;
};

export default function RealtimeDrafts({ email }: Props) {
  const [draftList, setDraftList] = useState<DraftType[]>();

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

        if (list[0] && (!list[0].prompt || !list[0].story)) {
          list.shift();
        }

        setDraftList(list);
      },
      (error) => {
        toast.error(error.message);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [email]);

  if (!draftList) return <DraftSkeleton />;

  return (
    <div className='space-y-5'>
      <span className='flex items-center gap-x-1.5'>
        <FileTextIcon className='w-5 h-5' />
        {draftList.length}
      </span>

      {draftList.length ? (
        draftList.map((draft, i) => (
          <Draft
            key={draft.storyId}
            idx={i}
            numOfDrafts={draftList.length}
            {...draft}
          />
        ))
      ) : (
        <p>You have no drafts.</p>
      )}
    </div>
  );
}
