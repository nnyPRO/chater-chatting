'use client';
import { Box, Button, CircularProgress, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Typography, useTheme } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-hot-toast"
import LogoutIcon from '@mui/icons-material/Logout';


export default function ProfilePage() {
    const theme = useTheme();
    const { data: session, status } = useSession()
    const [isSigningOut, setIsSigningOut] = useState<boolean>(false)
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }
    const handleSignOut = async () => {
        setIsSigningOut(true);
        try {
            await signOut();
        } catch (error) {
            toast.error('There was a problem signing out');
        } finally {
            setIsSigningOut(false);
            setOpen(false)
        }

    }

    if (status === 'loading') {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', gap: 2 }}>
                <CircularProgress color="primary" />
                <Typography color="textSecondary">Loading profile information...</Typography>
            </Box>
        )
    }
    if (status === 'authenticated') {
        return (
            <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Paper
                    elevation={4}
                    sx={{
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        borderRadius: 2,
                        maxWidth: 400,
                        width: '100%'
                    }}
                >
                    <Typography variant="h5" sx={{ mb: 2 }}>My Profile</Typography>

                    <Image
                        src={session?.user.image || ''}
                        alt='Profile'
                        width={120}
                        height={120}
                        style={{ borderRadius: '50%', border: `4px solid ${theme.palette.primary.main}` }}
                    />

                    <Typography variant="h6" sx={{ mt: 2 }}>{session?.user.name}</Typography>
                    <Typography color="textSecondary">{session?.user.email}</Typography>
                    <Button
                        sx={{ mt: 2 }}
                        variant="contained"
                        color="primary"
                        disabled={isSigningOut}
                        onClick={handleClickOpen}
                        startIcon={
                            isSigningOut ? (
                                <CircularProgress size={16} color="inherit" />
                            ) : (
                                <LogoutIcon fontSize="small" />
                            )
                        }
                    >
                        Sign Out
                    </Button>

                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Confirm logout?"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Are you sure you want to log out right now?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions sx={{ pb: 2, px: 3 }}>
                            <Button onClick={handleClose} color="inherit" disabled={isSigningOut}>
                                Cancle
                            </Button>
                            <Button
                                onClick={handleSignOut}
                                color="error"
                                variant="contained"
                                autoFocus
                                disabled={isSigningOut}
                                startIcon={isSigningOut && <CircularProgress size={16} color="inherit" />}
                            >
                                {isSigningOut ? 'Signing out...' : 'Confirm'}
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Paper>
            </Container>

        )
    }
}