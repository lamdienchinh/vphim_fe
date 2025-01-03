import NextAuth, { DefaultSession } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"

// Mở rộng kiểu Session để include thêm các field cần thiết
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      accessToken?: string;
    } & DefaultSession["user"]
  }

  interface User {
    id: string;
    accessToken?: string;
  }
}

// Mở rộng kiểu JWT để include thêm các field cần thiết
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    accessToken?: string;
  }
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const res = await fetch("http://your-nestjs-backend-url/auth/login", {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" }
        })
        const user = await res.json()

        if (res.ok && user) {
          return {
            id: user.id,
            email: user.email,
            accessToken: user.accessToken,
          }
        }
        return null
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      async profile(profile) {
        // Verify với NestJS backend
        const res = await fetch("http://your-nestjs-backend-url/auth/google/verify", {
          method: 'POST',
          body: JSON.stringify({ 
            accessToken: profile.access_token,
            email: profile.email
          }),
          headers: { "Content-Type": "application/json" }
        })
        
        const verifiedUser = await res.json()
        
        return {
          id: verifiedUser.id,
          email: profile.email,
          name: profile.name,
          image: profile.image,
          accessToken: verifiedUser.accessToken
        }
      }
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
      async profile(profile) {
        // Verify với NestJS backend
        const res = await fetch("http://your-nestjs-backend-url/auth/facebook/verify", {
          method: 'POST',
          body: JSON.stringify({
            accessToken: profile.access_token,
            email: profile.email
          }),
          headers: { "Content-Type": "application/json" }
        })
        
        const verifiedUser = await res.json()
        
        return {
          id: verifiedUser.id,
          email: profile.email,
          name: profile.name,
          image: profile.image,
          accessToken: verifiedUser.accessToken
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user,}) {
      if (user) {
        token.id = user.id
        token.accessToken = user.accessToken
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id
        session.user.accessToken = token.accessToken
      }
      return session
    },
  },
  pages: {
    signIn: '/',
  },
})