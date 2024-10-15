'use client'
import { Avatar, Box, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import { useState } from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const Header = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{
            background: 'linear-gradient(to right, #3d3f42, #212226)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            maxWidth: "100%", p: 2,
            boxShadow:
                'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        }}>
            <Typography sx={{ color: 'white', fontWeight: '800' }}>Dashboard</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={handleMenuClick} sx={{ p: 0 }}>
                    <Avatar src="/profile.jpg" alt="Profile Image" sx={{ width: 35, height: 35 }} />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Menu>
            </Box>

        </Box>
    )
}

export default Header