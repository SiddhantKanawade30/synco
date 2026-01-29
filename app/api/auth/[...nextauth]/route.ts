import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { prisma } from "@/lib/prisma"

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!, 
    }),
    GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!
  })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!user.email) return false
      
      try {
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email }
        })

        // If user doesn't exist, create them
        if (!existingUser) {
          await prisma.user.create({
            data: {
              email: user.email,
              name: user.name || user.email.split('@')[0],
              image: user.image || null,
              password: '', // OAuth users don't have passwords
            }
          })
        }
        
        return true
      } catch (error) {
        console.error("Error storing user in database:", error)
        return false
      }
    },
    async session({ session, token }) {
      if (session.user?.email) {
        try {
          const dbUser = await prisma.user.findUnique({
            where: { email: session.user.email },
            select: { id: true, name: true, email: true, image: true }
          })
          
          if (dbUser) {
            session.user.id = dbUser.id
            session.user.name = dbUser.name
            session.user.image = dbUser.image
          }
        } catch (error) {
          console.error("Error fetching user from database:", error)
        }
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    }
  }
})

export { handler as GET, handler as POST }