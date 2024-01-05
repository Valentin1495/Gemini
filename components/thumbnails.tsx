'use client';

import { Input } from '@/components/ui/input';
import { getImageUrl } from '@/lib/actions';
import { Label } from './ui/label';
import SubmitButton from './submit-button';
import { useState } from 'react';
import Image from 'next/image';
import { image } from '@/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { amountOptions } from '@/app/(routes)/thumbnail/constants';

export default function Thumbnails() {
  const [photos, setPhotos] = useState<image[]>([]);
  const [amount, setAmount] = useState<string>('1');

  const generateThumbnail = async (formData: FormData) => {
    const result = await getImageUrl(formData);

    if (result) {
      setPhotos(result.imageUrls);
    }
  };

  return (
    <div>
      <form className='space-y-3 max-w-3xl mx-auto' action={generateThumbnail}>
        <Label htmlFor='prompt' className='text-primary/50 font-semibold'>
          Start with a detailed description
        </Label>
        <Input
          name='prompt'
          id='prompt'
          type='text'
          placeholder='e.g. A cute cate in a red house'
          className='focus-visible:ring-0'
          required
        />
        <section className='flex items-center gap-x-5'>
          <Select onValueChange={setAmount} value={amount} defaultValue='1'>
            <SelectTrigger className='w-[180px] focus:ring-0 focus:ring-offset-0'>
              <SelectValue defaultValue='1' placeholder='1 Photo' />
            </SelectTrigger>
            <SelectContent>
              {amountOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input type='hidden' name='amount' id='amount' value={amount} />
          <SubmitButton />
        </section>
      </form>

      <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8'>
        {photos?.length
          ? photos.map((photo) => (
              <div className='relative aspect-square rounded-lg overflow-hidden'>
                <Image key={photo.id} src={photo.image} alt='Thumbnail' fill />
              </div>
            ))
          : null}
      </section>
    </div>
  );
}
