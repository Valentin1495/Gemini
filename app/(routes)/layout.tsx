import '@/app/globals.css';
import Navbar from '@/components/navbar';

export default function ThumbnailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      <div className='container'>{children}</div>
    </div>
  );
}
