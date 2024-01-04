import '@/app/globals.css';
import Navbar from '@/components/navbar';

export default function EditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body>
        <Navbar />
        <div className='container'>{children}</div>
      </body>
    </html>
  );
}
