// src\lib\auth.ts
import { NextAuthOptions } from 'next-auth'
import { UpstashRedisAdapter } from '@next-auth/upstash-redis-adapter'
import { db } from './db'
import GoogleProvider from 'next-auth/providers/google'
// import { fetchRedis } from '@/helpers/redis'

function getGoogleCredentials() {
  const clientId = process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET

  if (!clientId || clientId.length === 0) {
    throw new Error('Missing GOOGLE_CLIENT_ID')
  }

  if (!clientSecret || clientSecret.length === 0) {
    throw new Error('Missing GOOGLE_CLIENT_SECRET')
  }

  return { clientId, clientSecret }
}

// Rule of authentication
export const authOptions: NextAuthOptions = {
  // ask NextAuth connect with Redis database via db variable
  // when user log in with Google, User data is recored to Redis via this Adapter
  adapter: UpstashRedisAdapter(db),
  session: {
    strategy: 'jwt',
  },
  // if user is not log in yet, redirect to /login page
  pages: {
    signIn: '/login',
  },
  // indicate that log in Google only
  providers: [
    GoogleProvider({
      clientId: getGoogleCredentials().clientId,
      clientSecret: getGoogleCredentials().clientSecret,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // const dbUserResult = (await fetchRedis('get', `user:${token.id}`)) as
      //   | string
      //   | null

      // find user in Redis
      const dbUser = (await db.get(`user:${token.id}`)) as User | null

      // if (!dbUserResult) {

      // New user
      // If it can't be found in the DB (for example, if you just logged in for the first time,
      // the Adapter might not have finished writing data, or it might be the first time you've created a token), 
      // it will use the user information provided by Google Provider to insert the token.id and return the token.
      if (!dbUser) {
        if (user) {
          token.id = user!.id
        }
        return token
      }

      // const dbUser = JSON.parse(dbUserResult) as User

      // Old user
      // If it finds user data in the DB, it will overwrite the latest data from the DB (id, name, email, picture)
      // to the Token to ensure that the data in the Token is always up to date.
      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      }
    },
    // This function is executed when the client (React) side calls useSession() 
    // or the server side calls getServerSession().
    async session({ session, token }) {
      if (token && session.user && session.user.id) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
      }
      return session
    },
    // when complete log in
    redirect() {
      return '/dashboard'
    },
  },
}