import '@/app/globals.css';
import type { Metadata } from 'next';
import Navbar from '@/components/navbar';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'AIStoryteller - Get inspired by AI',
  description: 'Generate impressive images and synopses from AI',
};

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
        <div className='p-10 max-w-xl md:max-w-5xl mx-auto'>{children}</div>
      </body>
    </html>
  );
}
