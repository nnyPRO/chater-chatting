// src/components/AddFriendForm.tsx
'use client'

import { Box, TextField, Button } from "@mui/material";
import * as React from 'react';

const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');

    console.log("Adding friend with email:", email);
    // ... Logic calling API 
};

export default function AddFriendForm() {
    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                gap: 2,
                alignItems: 'center',
                mt: 3
            }}
            noValidate
            autoComplete="off"
        >
            <TextField
                id="friend-email"
                label="Friend's Email"
                variant="outlined"
                name="email"
                type="email"
                required
                sx={{ width: '30%' }}
            />

            <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ height: 56 }}
            >
                Add Friend
            </Button>

        </Box>
    );
}