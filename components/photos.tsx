'use client';

import { Input } from '@/components/ui/input';
import { getImageUrls } from '@/app/actions';
import { useState } from 'react';
import { image } from '@/lib/types';
import SubmitButton from './submit-button';
import { toast } from 'sonner';
import { Image as ImageIcon } from 'lucide-react';
import SelectOptions from './select-options';
import GeneratedPhotos from './generated-photos';

export default function Photos() {
  const [photos, setPhotos] = useState<image[]>([]);
  const [amount, setAmount] = useState<string>('1');

  const formAction = async (formData: FormData) => {
    const result = await getImageUrls(formData);

    if (result) {
      let message =
        amount === '1'
          ? '🎉 Your image has been generated successfully!'
          : '🎉 Your images have been generated successfully!';

      toast(message);
      setPhotos(result.imageUrls);
    }
  };

  return (
    <div>
      <form className='space-y-3' action={formAction}>
        <section className='gap-x-4 flex items-center'>
          <article className='bg-rose-200 p-2 rounded-md'>
            <ImageIcon className='w-4 h-4 sm:w-5 sm:h-5 text-rose-700' />
          </article>
          <h1 className='text-primary/50 font-semibold text-sm'>
            Start with a detailed description
          </h1>
        </section>
        <Input
          name='prompt'
          id='prompt'
          type='text'
          placeholder='An armchair in the shape of an avocado'
          className='focus-visible:ring-0'
          required
          autoFocus
        />
        <section className='flex items-start gap-x-5 justify-end'>
          <SelectOptions amount={amount} setAmount={setAmount} />
          <SubmitButton
            variant='premium'
            className='w-32'
            text='Generate'
            size='lg'
          />
          <Input type='hidden' name='amount' id='amount' value={amount} />
        </section>
      </form>

      <GeneratedPhotos photos={photos} />
    </div>
  );
}
