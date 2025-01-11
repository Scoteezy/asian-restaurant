import { PrismaAdapter } from "@auth/prisma-adapter";
import { type Role } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";
import Google from "next-auth/providers/google";

import { db } from "../db";

declare module "@auth/core/adapters" {
  interface AdapterUser {
    role?: Role;
  }
}

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      role: Role;
    }
  }
  interface User {
    role: Role;
  }
}


export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),

  providers: [
    Google,
  ],
  callbacks: {
    async session({ session, user }) {
      // TODO: Optimize - maybe we don't need to find the user here?
      const dbUser = await db.user.findUnique({
        where: { id: user.id },
      });

      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          role: dbUser?.role ?? 'USER',
        },
      };
    },
    authorized: async ({ auth }) => {
      return !!auth;
    },
  },
  pages: {
    error: "/",
    signIn: "/",
    signOut: "/",
  },
});
