'use client';

import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    TextField,
    Button,
    Stack,
    useTheme
} from '@mui/material';
import { signIn } from 'next-auth/react';


export default function LoginPage() {
    const theme = useTheme();

    const [isLoading, setIsLoading] = useState<boolean>(false)

    async function loginWithGoogle() {
        setIsLoading(true)
        try {
            await signIn('google')
        } catch (error) {
            // TODO: change to message of MUI
            console.log("Can't login")
            //   toast.error('Something went wrong with your login.')
        } finally {
            setIsLoading(false)
        }
    }
    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Logic การ Login จะอยู่ตรงนี้
        console.log("Attempting to log in...");
    };

    return (
        // Container: ใช้จำกัดความกว้างสูงสุดของเนื้อหา
        <Container
            component="main"
            maxWidth="xs" // จำกัดความกว้างสูงสุดแค่จอขนาดเล็ก (xs) เพื่อให้หน้า Login ดูดีบน Desktop ด้วย
            sx={{
                // 3. Mobile-First Padding: ให้มี Padding บน-ล่าง บนทุกจอ
                pt: 8,
                pb: 8,
                // 4. Center ในแนวตั้งและแนวนอน
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minHeight: '100vh', // ทำให้ Container กินความสูงเต็มจอ
                justifyContent: 'center', // จัดให้อยู่ตรงกลางจอ (ถ้ามีพื้นที่พอ)
                backgroundColor: theme.palette.grey[50], // พื้นหลังสีเทาอ่อน
            }}
        >
            {/* 5. Box: สำหรับ Wrapper ของ Card/Form หลัก */}
            <Box
                sx={{
                    p: { xs: 3, sm: 5 }, // Padding: จอมือถือ 3, จอใหญ่ขึ้น 5
                    borderRadius: 2,
                    boxShadow: 3, // เพิ่มเงาเล็กน้อยเหมือนเป็น Card
                    backgroundColor: 'white',
                    width: '100%',
                }}
            >
                <Typography
                    component="h1"
                    variant="h5"
                    color='black'
                    textAlign="center"
                    gutterBottom // เพิ่มระยะห่างด้านล่าง
                >
                    เข้าสู่ระบบ Chat App
                </Typography>

                {/* Form/Stack: สำหรับจัดเรียง Input และ Button */}
                <Box component="form" onSubmit={handleLogin} sx={{ mt: 2 }}>
                    <Stack spacing={2}>
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            size="large"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={loginWithGoogle}
                        >
                            continute with Google
                        </Button>

                    </Stack>
                </Box>
            </Box>
        </Container>
    );
};

