import '@/app/globals.css';
import Navbar from '@/components/navbar';
import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'AIStoryteller - Get inspired by AI',
  description: 'Generate impressive images and synopses from AI',
};

export default function GenerateTopicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <Toaster />
        <Navbar />
        <div className='container'>{children}</div>
      </body>
    </html>
  );
}
