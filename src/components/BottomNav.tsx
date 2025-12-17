'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import ChatIcon from '@mui/icons-material/Chat';
import GroupIcon from '@mui/icons-material/Group';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Chat', icon: <ChatIcon />, href: '/dashboard/chat' },
    { label: 'Friends', icon: <GroupIcon />, href: '/dashboard/friends' },
    { label: 'Profile', icon: <AccountCircleIcon />, href: '/dashboard/profile' },
  ];

  const activeIndex = navItems.findIndex((item) => pathname?.startsWith(item.href));

  return (
    <Box
      sx={{ width: "100%", position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1200, borderTop: '1px solid #e0e0e0' }}
      display={{ md: 'none' }}
    >
      <BottomNavigation
        showLabels
        value={activeIndex === -1 ? 0 : activeIndex}
      >
        {navItems.map((item) => (
          <BottomNavigationAction
            key={item.label}
            label={item.label}
            icon={item.icon}
            component={Link}  // modify this button to Link
            href={item.href}
          />
        ))}
      </BottomNavigation>
    </Box>
  );
}