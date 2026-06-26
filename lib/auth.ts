import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";

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
          role: "USER",
          icfaiVerified: profile.email.endsWith('@iutripura.edu.in'),
          department: "BCA"
        }
      }
    })
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  callbacks: {
    async jwt({ token, user }) { 
      if (user) { token.id = user.id; token.role = (user as any).role; } 
      return token; 
    },
    async session({ session, token }) { 
      if (session?.user) { (session.user as any).id = token.id; (session.user as any).role = token.role; } 
      return session; 
    }
  }
};