import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AccountCircle from '@mui/icons-material/AccountCircle';
import PieChartOutlineOutlinedIcon from '@mui/icons-material/PieChartOutlineOutlined';
import FilterVintageOutlinedIcon from '@mui/icons-material/FilterVintageOutlined';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import BeachAccessOutlinedIcon from '@mui/icons-material/BeachAccessOutlined';
import FormatAlignCenterOutlinedIcon from '@mui/icons-material/FormatAlignCenterOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';

const drawerWidth = 240;

interface Props {
    container?: Element;
}

export default function Header(props: Props) {
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const menuItems = [
        { id: 'Dashboard', icon: <PieChartOutlineOutlinedIcon sx={{ color: 'white' }} />, label: 'Dashboard', link: '/admin/' },
        { id: 'Icons', icon: <FilterVintageOutlinedIcon sx={{ color: 'white' }} />, label: 'Icons', link: '/admin/icons' },
        { id: 'Maps', icon: <PushPinOutlinedIcon sx={{ transform: 'rotate(70deg)', color: 'white' }} />, label: 'Maps', link: '/admin/maps' },
        { id: 'Notifications', icon: <NotificationsNoneOutlinedIcon sx={{ color: 'white' }} />, label: 'Notifications', link: '/admin/notifications' },
        { id: 'User Profile', icon: <PermIdentityOutlinedIcon sx={{ color: 'white' }} />, label: 'User Profile', link: '/admin/profile' },
        { id: 'Table List', icon: <BeachAccessOutlinedIcon sx={{ color: 'white' }} />, label: 'Table List', link: '/admin/tables' },
        { id: 'Typography', icon: <FormatAlignCenterOutlinedIcon sx={{ color: 'white' }} />, label: 'Typography', link: '/admin/typography' },
        { id: 'RTL Support', icon: <PublicOutlinedIcon sx={{ color: 'white' }} />, label: 'RTL Support', link: '/admin/rtl' },
    ];

    const drawer = (
        <Box sx={{
             backgroundColor: '#03013559',
            color: 'white', height: '100%', p: 2
        }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Edentu
            </Typography>
            <Divider sx={{ mb: 2, backgroundColor: 'white' }} />
            <List>
                {menuItems.map((item) => (
                    <ListItem key={item.id} disablePadding>
                        <ListItemButton
                            onClick={() => {
                                // Navigate to the selected link
                                setMobileOpen(false); // Close the drawer when clicked on mobile
                            }}
                            sx={{ width: '100%' }}
                        >
                            <ListItemIcon sx={{ color: 'white' }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.label} primaryTypographyProps={{ sx: { fontWeight: 600 } }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const container = props.container ?? undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{
                width: { md: `calc(100% - ${drawerWidth}px)` }, ml: { md: `${drawerWidth}px` }, background: 'linear-gradient(to right, #3d3f42, #212226)'
            }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{
                            mr: 2,
                            display: { md: 'none' },
                            color: 'white'
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ color: 'white', fontWeight: 800 }}>
                        Dashboard
                    </Typography>
                    <div>
                        <IconButton
                            size="large"
                            sx={{ color: 'white' }}>
                            <AccountCircle />
                            <Typography sx={{ fontSize: '1rem', fontWeight: 600, ml: 1, color: 'white' }}>
                                Emily
                            </Typography>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }} aria-label="mailbox folders">
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': {
                            width: drawerWidth, boxSizing: 'border-box',  backgroundColor: '#03013559',
                            color: 'white'
                        },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', md: 'block' },
                        '& .MuiDrawer-paper': {
                            width: drawerWidth, boxSizing: 'border-box',  backgroundColor: '#03013559',
                            color: 'white'
                        },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
        </Box>
    );
}
