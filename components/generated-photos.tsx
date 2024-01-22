import { image } from '@/lib/types';
import Image from 'next/image';

type GeneratedPhotosProps = {
  photos: image[];
};

export default function GeneratedPhotos({ photos }: GeneratedPhotosProps) {
  return (
    <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8'>
      {photos?.length
        ? photos.map((photo) => (
            <div
              key={photo.id}
              className='relative aspect-square rounded-lg overflow-hidden'
            >
              <Image
                src={photo.image}
                alt='Thumbnail'
                fill
                className='hover:opacity-80 hover:cursor-pointer transition'
                onClick={() => window.open(photo.image)}
              />
            </div>
          ))
        : null}
    </section>
  );
}
