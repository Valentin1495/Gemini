import '@/app/globals.css';

export default function ThumbnailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className='container'>{children}</div>
    </div>
  );
}
