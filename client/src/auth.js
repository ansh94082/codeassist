import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { prisma } from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ user, profile }) {
      if (!user.email) return false;
      try {
        const loginName = profile?.login || profile?.name || user.email.split("@")[0];
        await prisma.user.upsert({
          where: { email: user.email },
          update: {},
          create: { 
            email: user.email, 
            username: loginName.toString() 
          },
        });
        return true;
      } catch (error) {
        console.error("SignIn DB Error:", error);
        return true; // Allow login even if DB upsert fails for now to stop the rollback
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        // Optional: Fetch extra DB data here only if on Server Side
        // session.user.username = token.username; 
      }
      return session;
    },
  },
});