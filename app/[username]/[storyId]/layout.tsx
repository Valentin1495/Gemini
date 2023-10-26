import '@/app/globals.css';

import Navbar from '@/components/navbar';
import { Toaster } from '@/components/ui/toaster';

export default function StoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <Toaster />

        <Navbar />
        <div className='max-w-xl md:max-w-5xl mx-auto py-10 px-[72px]'>
          {children}
        </div>
      </body>
    </html>
  );
}
