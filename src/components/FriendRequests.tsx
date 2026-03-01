'use client'

import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText, Stack, Typography } from "@mui/material"
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";


interface FriendRequestsProps {
    allFriendRequests: IncomingFriendRequest[]
    sessionId: string
}

// TODO: ทำตรงนี้ต่อ
export function FriendRequests({ allFriendRequests, sessionId }: FriendRequestsProps) {
    const router = useRouter()

    const [friendRequests, setFriendRequests] = useState<IncomingFriendRequest[]>(allFriendRequests)

    const acceptFriend = async (senderId: string) => {
        await axios.post('/api/friends/accept', { id: senderId })

        setFriendRequests((prev) =>
            prev.filter((request) => request.senderId !== senderId)
        )

        router.refresh()
    }

    const denyFriend = async (senderId: string) => {
        await axios.post('/api/friends/deny', { id: senderId })

        setFriendRequests((prev) =>
            prev.filter((request) => request.senderId !== senderId)
        )

        router.refresh()
    }


    return (
        // <Box sx={{ display: "flex", flexDirection: "column" }}>
        <List >
            {allFriendRequests.length === 0 ?
                <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center', py: 2 }}>
                    No friend requests yet
                </Typography> :
                (allFriendRequests.map((request) => (
                    <ListItem key={request.senderId} secondaryAction={<Stack direction="row" spacing={1}> {/* 🟢 หุ้มด้วย Stack และเว้นระยะห่าง */}
                        <IconButton
                            edge="end"
                            aria-label="accept"
                            onClick={() => acceptFriend(request.senderId)}
                            sx={{ color: 'success.main' }}
                        >
                            <CheckCircleIcon fontSize="large" />
                        </IconButton>

                        <IconButton
                            edge="end"
                            aria-label="decline"
                            onClick={() => denyFriend(request.senderId)}
                            sx={{ color: 'error.main' }}
                        >
                            <CancelIcon fontSize="large" />
                        </IconButton>
                    </Stack>
                    } >
                        {/* {request.senderEmail} */}
                        {/* <ListItemButton> */}
                        <ListItemAvatar>
                            <Avatar />
                        </ListItemAvatar>
                        <ListItemText id={request.senderId} primary={request.senderEmail} />
                        {/* </ListItemButton> */}

                    </ListItem>
                )))}
        </List>
        // </Box>
    )
}