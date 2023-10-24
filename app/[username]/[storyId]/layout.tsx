import '@/app/globals.css';
import type { Metadata } from 'next';
import Navbar from '@/components/navbar';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@/components/theme-provider';
import AuthProvider from '@/components/auth-provider';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function StoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className='py-10 px-[72px]'>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <Toaster />
            <Navbar />
            <div className='max-w-xl md:max-w-5xl mx-auto'>{children}</div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
