import './globals.css';
import type { Metadata } from 'next';
// import AuthProvider from '@/components/auth-provider';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: 'Gemini - Get inspired by AI',
  description: 'Generate impressive texts and images from AI',
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
    <html lang='en' suppressHydrationWarning>
      <body>
        {/* <AuthProvider> */}
        <ThemeProvider attribute='class' defaultTheme='dark'>
          <Toaster />
          {children}
        </ThemeProvider>
        {/* </AuthProvider> */}
      </body>
    </html>
  );
}
