import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Github from 'next-auth/providers/github';
import Wechat from 'next-auth/providers/wechat';
import { createGuest, getGuest } from '@/app/_lib/data-service';

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Github({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    },
    async signIn({ user, account, profile }) {
      try {
        const existingGuest = await getGuest(user.email);
        console.log(existingGuest);
        if (!existingGuest) {
          await createGuest({ email: user.email, fullName: user.name });
        }
        return true;
      } catch (error) {
        return false;
      }
    },
    async session({ session}) {
      const guest = await getGuest(session.user.email);
      session.user.guestId = guest.id;
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
