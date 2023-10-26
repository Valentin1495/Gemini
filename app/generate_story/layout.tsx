import '@/app/globals.css';
import Navbar from '@/components/navbar';
import { Toaster } from '@/components/ui/toaster';

export default function GenerateStoryLayout({
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
