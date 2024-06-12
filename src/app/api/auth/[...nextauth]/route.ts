import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prismaClient } from "@/database"
import type { AuthOptions } from "next-auth"
import { Adapter } from "next-auth/adapters"
import bcrypt from "bcryptjs"

const adapter = PrismaAdapter(prismaClient)

const authOptions: AuthOptions = {
  secret: process.env.AUTH_SECRET,
  adapter: adapter as Adapter,
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prismaClient.account.findFirst({
          where: {
            userName: credentials?.username,
          },
        })

        if (user == null) return null

        const isPasswordCorrect = await bcrypt.compare(
          credentials?.password as string,
          user.password
        )

        if (user && isPasswordCorrect) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        }
        // If you return null then an error will be displayed advising the user to check their details.
        return null

        // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user }
    },
    async session({ session, token }) {
      // eslint-disable-next-line no-param-reassign
      session.user = token as any
      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
