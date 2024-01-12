export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='mx-auto max-w-screen-xl min-h-screen flex justify-center items-center'>
      {children}
    </div>
  );
}
