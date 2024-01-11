import Navbar from '@/components/navbar';

export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='mx-auto max-w-screen-xl bg-secondary'>
      <Navbar />
      <div className='min-h-screen flex justify-center items-center'>
        {children}
      </div>
    </div>
  );
}
