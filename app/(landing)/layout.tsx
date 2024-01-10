import LandingNavbar from '@/components/landing-navbar';

export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='mx-auto max-w-screen-xl bg-[#111827]'>
      <LandingNavbar />
      <div className='min-h-screen flex justify-center items-center'>
        {children}
      </div>
    </div>
  );
}
