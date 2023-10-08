import '@/app/globals.css';
import type { Metadata } from 'next';
import Navbar from '@/components/navbar';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className='max-w-7xl mx-auto p-10'>
        <Navbar />
        {children}
      </body>
    </html>
  );
}