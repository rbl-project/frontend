import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import MuiDrawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';

import ListSubheader from '@mui/material/ListSubheader';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';


const Sidebar = ({ open, drawerWidth, DrawerHeader }) => {

    const theme = useTheme();

    const openedMixin = (theme) => ({
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: 'hidden',
    });

    const closedMixin = (theme) => ({
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: `calc(${theme.spacing(7)} + 1px)`,
        [theme.breakpoints.up('sm')]: {
            width: `calc(${theme.spacing(8)} + 1px)`,
        },
    });

    const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
        ({ theme, open }) => ({
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap',
            boxSizing: 'border-box',
            ...(open && {
                ...openedMixin(theme),
                '& .MuiDrawer-paper': openedMixin(theme),
            }),
            ...(!open && {
                ...closedMixin(theme),
                '& .MuiDrawer-paper': closedMixin(theme),
            }),
        }),
    );

    return (
        <Drawer variant="permanent" open={open} PaperProps={{ sx: { backgroundColor: "rgba(30,41,59,1)", color: "white" } }} >
            <DrawerHeader>

            </DrawerHeader>
            <Divider light color="white" variant="middle" />
            <List sx={{ mt: 1 }} >
                <ListSubheader color="inherit" sx={{ backgroundColor: "inherit" }} inset={!open} >
                    <Typography variant="h6" component="div" >
                        Exploratory Data Analysis
                    </Typography>
                </ListSubheader>
                <ListItem key={1} disablePadding sx={{ display: 'block' }}>
                    <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5, }} >
                        <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', color: "white" }} >
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Data Overview" sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </ListItem>
                <ListItem key={2} disablePadding sx={{ display: 'block' }}>
                    <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5, }} >
                        <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', color: "white" }} >
                            <MailIcon />
                        </ListItemIcon>
                        <ListItemText primary="Data Visualisation" sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </ListItem>
            </List >
            <Divider light color="white" variant="middle" />
            <List sx={{ mt: 1 }} >
                <ListSubheader color="inherit" sx={{ backgroundColor: "inherit" }} inset={!open} >
                    <Typography variant="h6" noWrap component="div">
                        Data Preprocessing
                    </Typography>
                </ListSubheader>
                <ListItem key={1} disablePadding sx={{ display: 'block' }}>
                    <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5, }} >
                        <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', color: "white" }} >
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Missing Value Imputation" sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </ListItem>
                <ListItem key={2} disablePadding sx={{ display: 'block' }}>
                    <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5, }} >
                        <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', color: "white" }} >
                            <MailIcon />
                        </ListItemIcon>
                        <ListItemText primary="Numerical Encoding" sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider light color="white" variant="middle" />
            <List sx={{ mt: 1 }}>
                <ListSubheader color="inherit" sx={{ backgroundColor: "inherit" }} inset={!open} >
                    <Typography variant="h6" noWrap component="div">
                        Feature Engineering
                    </Typography>
                </ListSubheader>
                <ListItem key={1} disablePadding sx={{ display: 'block' }}>
                    <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5, }} >
                        <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', color: "white" }} >
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Exponential Transformation" sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </ListItem>
                <ListItem key={2} disablePadding sx={{ display: 'block' }}>
                    <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5, }} >
                        <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', color: "white" }} >
                            <MailIcon />
                        </ListItemIcon>
                        <ListItemText primary="Log Transformation" sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer >
    )
}

export default Sidebar;