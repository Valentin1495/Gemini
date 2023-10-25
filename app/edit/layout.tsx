import '@/app/globals.css';
import Navbar from '@/components/navbar';
import { Toaster } from 'react-hot-toast';

export default function EditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body>
        <Toaster />
        <Navbar />
        <div className='container'>{children}</div>
      </body>
    </html>
  );
}
