// src\app\api\friends\add\route.ts
import { fetchRedis } from '@/helpers/redis'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
// import { pusherServer } from '@/lib/pusher'
// import { toPusherKey } from '@/lib/utils'
import { addFriendValidator } from '@/lib/validations/add-friend'
import { getServerSession } from 'next-auth'
import { z } from 'zod'

export async function POST(req: Request) {
    try {
        const body = await req.json()

        const { email: emailToAdd } = addFriendValidator.parse(body)

        const idToAdd = (await fetchRedis(
            'get',
            `user:email:${emailToAdd}`
        )) as string

        if (!idToAdd) {
            return new Response('This person does not exist.', { status: 400 })
        }

        const session = await getServerSession(authOptions)

        // log in already ?
        if (!session) {
            return new Response('Unauthorized', { status: 401 })
        }

        // Don't add yourself
        if (idToAdd === session.user.id) {
            return new Response('You cannot add yourself as a friend', {
                status: 400,
            })
        }

        // check if user is already added
        // Do not resend (if you have already sent it).
        const isAlreadyAdded = (await fetchRedis(
            'sismember',
            `user:${idToAdd}:incoming_friend_requests`,
            session.user.id
        )) as 0 | 1

        if (isAlreadyAdded) {
            return new Response('Already added this user', { status: 400 })
        }

        // check if user is already friends
        // Do not add people who are already your friends.
        const isAlreadyFriends = (await fetchRedis(
            'sismember',
            `user:${session.user.id}:friends`,
            idToAdd
        )) as 0 | 1

        if (isAlreadyFriends) {
            return new Response('Already friends with this user', { status: 400 })
        }

        // valid request, send friend request

        // await pusherServer.trigger(
        //   toPusherKey(`user:${idToAdd}:incoming_friend_requests`),
        //   'incoming_friend_requests',
        //   {
        //     senderId: session.user.id,
        //     senderEmail: session.user.email,
        //   }
        // )

        await db.sadd(`user:${idToAdd}:incoming_friend_requests`, session.user.id)

        return new Response('OK')
    } catch (error) {
        console.error("ADD_FRIEND_ERROR:", error) // เพิ่มบรรทัดนี้เพื่อดู Log ใน VS Code Terminal
        // Validation error (The data is incorrect.)
        if (error instanceof z.ZodError) {
            return new Response('Invalid request payload', { status: 422 })
        }

        // Other error
        // return new Response('Invalid request', { status: 400 })
        return new Response(error instanceof Error ? error.message : 'Invalid request', { status: 400 })
    }
}