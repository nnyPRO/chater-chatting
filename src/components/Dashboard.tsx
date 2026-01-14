'use client'

import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Sidebar, DrawerHeader } from './Sidebar';
import { BottomNav } from './BottomNav';
import { SessionProvider } from 'next-auth/react';


const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme }) => ({
    flexGrow: 1,
    // padding: theme.spacing(3),
    // overflowX: 'hidden',

    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
}));

export default function Dashboard({ children, requestCount }: { children: React.ReactNode; requestCount: number; }) {
    const [open, setOpen] = React.useState(true);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <SessionProvider>


            <Box sx={{ display: 'flex', minHeight: '100vh', overflow: 'hidden' }}>
                {/* Desktop */}
                <Sidebar requestCount={requestCount} open={open} toggleDrawer={toggleDrawer} />

                {/* Main recognizes the open state and moves accordingly */}
                <Main open={open}>
                    <DrawerHeader sx={{ display: { xs: 'none', md: 'flex' } }} /> {/* Push content down from the AppBar for desktop */}
                    {children}
                </Main>

                {/* Mobile */}
                <BottomNav requestCount={requestCount} />
            </Box>
        </SessionProvider>
    );
}