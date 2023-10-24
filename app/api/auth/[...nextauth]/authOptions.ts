import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.Google_ID as string,
      clientSecret: process.env.Google_SECRET as string,
    }),
  ],
  pages: {
    signIn: '/',
  },
};
