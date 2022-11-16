import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import MuiDrawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import ListSubheader from '@mui/material/ListSubheader';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import SidebarItem from './sidebarItem/SidebarItem';
import { useSelector } from 'react-redux';

const drawerWidth = 300;

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));


const Sidebar = () => {

    const theme = useTheme();
    const open = useSelector((state) => state.global.openSidebar);

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
        <Drawer variant="permanent" open={open} PaperProps={{ sx: { backgroundColor: "rgba(30,41,59,1)", color: "white",px:1 } }} >
            <DrawerHeader></DrawerHeader>
            <List sx={{ mt:0 }} >
                <ListSubheader color="inherit" sx={{ backgroundColor: "inherit" }} inset={!open} >
                    <Typography variant="overline" component="div" >
                        Exploratory Data Analysis
                    </Typography>
                </ListSubheader>
                <SidebarItem itemKey={1} name="Data Overview" path="/dashboard/exploratory-data-analysis/data-overview" ItemIcon={InboxIcon} open={open} />
                <SidebarItem itemKey={2} name="Data Visualization" path="/dashboard/exploratory-data-analysis/data-visualization" ItemIcon={MailIcon} open={open} />
            </List >
            {open && (<Divider light color="white" sx={{ borderColor: "rgba(0,0,0,0.5)" }} variant="middle" />)}
            <List sx={{ mt:0}} >
                <ListSubheader color="inherit" sx={{ backgroundColor: "inherit" }} inset={!open} >
                    <Typography variant="overline" noWrap component="div">
                        Data Preprocessing
                    </Typography>
                </ListSubheader>
                <SidebarItem itemKey={1} name="Missing Value Imputation" path="/dashboard/data-preprocessing/missing-value-imputation" ItemIcon={InboxIcon} open={open} />
                <SidebarItem itemKey={2} name="Numerical Encoding" path="/dashboard/data-preprocessing/numerical-encoding" ItemIcon={MailIcon} open={open} />
            </List>
            {open && (<Divider light color="white" sx={{ borderColor: "rgba(0,0,0,0.5)" }} variant="middle" />)}
            <List sx={{ mt:0 }}>
                <ListSubheader color="inherit" sx={{ backgroundColor: "inherit" }} inset={!open} >
                    <Typography variant="overline" noWrap component="div">
                        Feature Engineering
                    </Typography>
                </ListSubheader>
                <SidebarItem itemKey={1} name="Exponential Transformation" path="/dashboard/feature-engineering/exponential-transformation" ItemIcon={InboxIcon} open={open} />
                <SidebarItem itemKey={2} name="Logarithmic Transformation" path="/dashboard/feature-engineering/logarithmic-transformation" ItemIcon={MailIcon} open={open} />
            </List>
        </Drawer >
    )
}

export default Sidebar;