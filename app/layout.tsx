import './globals.css';
import type { Metadata } from 'next';
import AuthProvider from '@/components/auth-provider';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
  title: 'AIStoryteller - Get inspired by AI',
  description: 'Generate impressive images and stories from AI',
  icons: [
    {
      url: '/logo.png',
      href: '/logo.png',
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <Toaster />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
