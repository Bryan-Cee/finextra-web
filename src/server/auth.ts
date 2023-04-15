import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
} from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials"

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { env } from "@/env.mjs";
import { prisma } from "@/server/db";
// import { LoginSchema } from "@/pages/auth/sign-in";
// import { verify } from "argon2";
// import jsonwebtoken from "jsonwebtoken";
// import { JWT } from "next-auth/jwt";
/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  // events: {
  //   linkAccount: ({ user, account, profile }) => {
  //     console.log('linkAccount', user, account, profile);
  //   },
  // },
  // session: {
  //   strategy: "jwt",
  // },
  callbacks: {
    session: ({ session, user }) => {
      if (session?.user) {
        session.user.id = user.id;
        session.user.email = user.email;
        session.user.image = user.image;
        // session.user.role = user.role;// <-- put other properties on the session here
      }
      return session;
    },
    // jwt: ({ token, user, isNewUser, profile }) => {
    //   if (user) {
    //     token.id = user.id;
    //     token.email = user.email;
    //     token.name = user.name;
    //     token.profile = profile;
    //     token.isNewUser = isNewUser;
    //   }

    //   return token;
    // },
  },
  // secret: env.JWT_SECRET,
  // jwt: {
  //   maxAge: 15 * 24 * 30 * 60, // 15 days
  // },
  adapter: PrismaAdapter(prisma),
  providers: [
    // CredentialsProvider({
    //   name: 'Credentials',
    //   credentials: {
    //     email: { label: "Email", type: "email", placeholder: "email@example.com" },
    //     password: { label: "Password", type: "password" }
    //   },
    //   authorize: async (credentials) => {
    //     try {
    //       const { email, password } = await LoginSchema.parseAsync(credentials);

    //       const result = await prisma.user.findFirst({
    //         where: { email },
    //       });

    //       if (!result) return null;

    //       const isValidPassword = await verify(result.password as string, password);

    //       if (!isValidPassword) return null;

    //       return { id: result.id, email, name: result.name, image: result.image };
    //     } catch {
    //       return null;
    //     }
    //   },
    //   type: 'credentials'
    // }),
    GitHubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: '/auth/sign-in',
    signOut: '/auth/sign-out',
    error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  }
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
