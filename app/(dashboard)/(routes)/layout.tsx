import '@/app/globals.css';
import Navbar from '@/components/navbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='bg-secondary'>
      <Navbar />
      <div className='container'>{children}</div>
    </div>
  );
}
