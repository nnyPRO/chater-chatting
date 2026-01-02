'use client';

import { useEffect, useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    useTheme
} from '@mui/material';
import { signIn } from 'next-auth/react';
import GoogleIcon from '@mui/icons-material/Google';
import toast from 'react-hot-toast';

export default function LoginPage() {
    const theme = useTheme();

    const [isLoading, setIsLoading] = useState<boolean>(false)

    async function loginWithGoogle() {
        setIsLoading(true)
        try {
            await signIn('google')
        } catch (error) {
            toast.error('Something went wrong with your login.')
        } finally {
            setIsLoading(false)
        }
    }
    // useEffect(() => {
    //     console.log("isLoading", isLoading);

    // }, [isLoading])

    return (
        <Container
            component="main"
            sx={{
                display: 'flex',
                alignItems: 'center',
                minHeight: '100vh',
                minWidth: '100%',
                justifyContent: 'center',
                backgroundColor: theme.palette.grey[50],
            }}
        >
            <Box
                sx={{
                    p: { xs: 3, sm: 5 },
                    borderRadius: 2,
                    boxShadow: 3,
                    backgroundColor: 'white',
                    width: 500,
                }}
            >
                <Typography
                    component="h1"
                    variant="h5"
                    color='black'
                    textAlign="center"
                >
                    Log in to the chaTerChat
                </Typography>
                <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    size="large"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={loginWithGoogle}
                    loading={isLoading}
                    startIcon={<GoogleIcon />}
                    disabled={isLoading}
                >
                    continute with Google
                </Button>

            </Box>
        </Container>
    );
};

