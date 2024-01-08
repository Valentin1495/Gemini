import Image from 'next/image';

export default function Loader() {
  return (
    <div className='w-6 h-6 relative animate-spin'>
      <Image alt='Logo' src='/logo.png' fill />
    </div>
  );
}
