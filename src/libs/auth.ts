import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./prisma";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {

        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          emailVerified: profile.email_verified,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.SECRET,
  callbacks: {
    async jwt({ token, account, user, trigger, session }) {
      if (trigger === "update") {
        return {
          ...token,
          number: session.user.number,
        }
      }
      if (account) {
        token.accessToken = account.accessToken as string;
        token.id = user.id;
        token.emailVerified = user.emailVerified;
        token.number = user.number;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.emailVerified = token.emailVerified;
      session.user.number = token.number;
      return session;
    },
  },
};
