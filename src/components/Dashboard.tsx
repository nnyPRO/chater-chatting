'use client'

import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Sidebar, DrawerHeader } from './Sidebar';
import { BottomNav } from './BottomNav';


const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    // overflowX: 'hidden',

    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
}));

export default function Dashboard({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = React.useState(true);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', overflow: 'hidden' }}>
            {/* Desktop */}
            <Sidebar open={open} toggleDrawer={toggleDrawer} />

            {/* Main recognizes the open state and moves accordingly */}
            <Main open={open}>
                <DrawerHeader sx={{ display: { xs: 'none', md: 'flex' } }} /> {/* Push content down from the AppBar for desktop */}
                {children}
            </Main>

            {/* Mobile */}
            <BottomNav />
        </Box>
    );
}