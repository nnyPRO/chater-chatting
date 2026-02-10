import AddFriendForm from "@/components/AddFriendForm";
import { Box, Container, Grid, Paper, Typography, Divider } from "@mui/material";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { notFound } from "next/navigation";
import { fetchRedis } from "@/helpers/redis";
import { FriendRequests } from "@/components/FriendRequests";
// import FriendRequests from "@/components/FriendRequests"; // เดี๋ยวเราค่อยมาสร้างตัวนี้กัน

export default async function FriendsPage() {
    const session = await getServerSession(authOptions)
    if (!session) notFound()

    const incomingSenderIds = (await fetchRedis('smembers', `user:${session.user.id}:incoming_friend_requests`)) as string[]

    const incomingFriendRequests = (await Promise.all(incomingSenderIds.map(
        async (senderId) => {
            const sender = (await fetchRedis('get', `user:${senderId}`)) as string | null
            if (!sender) return null
            const senderParsed = JSON.parse(sender) as User
            return {
                senderId,
                senderEmail: senderParsed.email
            }
        }
    ))).filter(Boolean) as IncomingFriendRequest[]

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>
                Manage Friends
            </Typography>

            <Grid container spacing={4}>
                <Grid size={{ xs: 12, md: 5 }}>
                    <Paper elevation={3} sx={{ p: 4 }}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Add a Friend
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                            Add friends by their email address to start chatting.
                        </Typography>

                        <AddFriendForm />
                    </Paper>
                </Grid>

                <Grid size={{ xs: 12, md: 7 }}>
                    <Paper elevation={3} sx={{ p: 4 }}>
                        {/* <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}> */}
                        <Typography variant="h6" fontWeight="bold">
                            Friend Requests
                        </Typography>

                        <FriendRequests allFriendRequests={incomingFriendRequests} sessionId={session.user.id} />
                        {/* </Box> */}
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}