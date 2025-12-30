'use client'

import { Box, TextField, Button, Alert } from "@mui/material";
import * as React from 'react';
import axios, { AxiosError } from 'axios';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addFriendValidator } from "@/lib/validations/add-friend";


type FormData = z.infer<typeof addFriendValidator>;

export default function AddFriendForm() {
    const [showSuccessState, setShowSuccessState] = React.useState<boolean>(false);

    // 2. Setup useForm
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting }, // ดึง isSubmitting มาใช้ทำปุ่ม loading ได้
    } = useForm<FormData>({
        resolver: zodResolver(addFriendValidator),
    });

    // 3. Func to send data
    const onSubmit = async (data: FormData) => {
        try {
            // call API
            await axios.post('/api/friends/add', {
                email: data.email,
            });
            setShowSuccessState(true);

        } catch (error) {
            setShowSuccessState(false);

            // Validation Error (Client type a wrong pattern)
            if (error instanceof z.ZodError) {
                setError('email', { message: error.message });
                return;
            }

            // Server Error (Don't have this email in system)
            if (error instanceof AxiosError) {
                // Display the error message sent back by the server.
                setError('email', { message: error.response?.data });
                return;
            }

            // Don't know cause
            setError('email', { message: 'Something went wrong.' });
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                mt: 3,
                maxWidth: '400px'
            }}
            noValidate
            autoComplete="off"
        >
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                <TextField
                    {...register('email')} // connect input with React Hook Form
                    id="friend-email"
                    label="Friend's Email"
                    variant="outlined"
                    type="email"
                    placeholder="you@example.com"
                    sx={{ flexGrow: 1 }}

                    // 4. Connect Error state with MUI
                    error={!!errors.email} // If there is an error, display a red border.
                    helperText={errors.email?.message} // Display error under input
                    disabled={isSubmitting} // Do not type while sending.
                />

                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    sx={{ height: 56 }}
                    disabled={isSubmitting} // Cannot click while loading.
                >
                    Add
                </Button>
            </Box>

            {/* 5. show message when success */}
            {showSuccessState && (
                <Alert severity="success">Your friend request has been successfully sent!</Alert>
            )}
        </Box>
    );
}

