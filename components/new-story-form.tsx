'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function NewStoryForm() {
  return (
    <form action='' className='space-y-5'>
      <Input
        name='title'
        id='title'
        type='text'
        placeholder='Title'
        className=''
      />
      <Textarea
        name='content'
        id='content'
        placeholder='Tell your story...'
        className='h-96'
      />
      <section className='flex justify-center'>
        <Button type='submit' className='' size={'lg'}>
          Publish
        </Button>
      </section>
    </form>
  );
}
