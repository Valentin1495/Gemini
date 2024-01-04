import '@/app/globals.css';
import Navbar from '@/components/navbar';

export default function StoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body>
        <Navbar />
        <div className='px-10 pb-10 pt-32 max-w-xl md:max-w-5xl mx-auto'>
          {children}
        </div>
      </body>
    </html>
  );
}
