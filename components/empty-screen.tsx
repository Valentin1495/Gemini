import { examplePropmts } from '@/app/(dashboard)/(routes)/conversation/constants';
import { ArrowRight, MessageSquareText } from 'lucide-react';
import { Button } from './ui/button';
import { Dispatch, SetStateAction } from 'react';

type EmptyScreenProps = {
  setUserParts: Dispatch<SetStateAction<string>>;
};

export default function EmptyScreen({ setUserParts }: EmptyScreenProps) {
  return (
    <div className='bg-secondary p-8 rounded-md space-y-2'>
      <h1 className='font-bold text-lg flex items-center gap-x-3'>
        <section className='bg-violet-200 p-2 rounded-md w-fit'>
          <MessageSquareText className='w-4 h-4 sm:w-5 sm:h-5 text-violet-700' />
        </section>
        Welcome!
      </h1>
      <p className='text-primary/50'>
        You can start a conversation here or try the following examples:
      </p>
      <p className='flex flex-col gap-y-2'>
        {examplePropmts.map((el, idx) => (
          <Button
            key={idx}
            variant='ghost'
            type='button'
            className='w-fit text-base p-2 h-auto hover:bg-primary/10'
            onClick={() => setUserParts(el)}
          >
            <ArrowRight className='mr-2 w-5 h-5 min-w-fit' />
            <span className='text-left'>{el}</span>
          </Button>
        ))}
      </p>
    </div>
  );
}
