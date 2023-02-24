import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import List from '@mui/material/List';
import MuiDrawer from '@mui/material/Drawer';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import DatasetIcon from '@mui/icons-material/Dataset';
import TableChartIcon from '@mui/icons-material/TableChart';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';

import SidebarItem from './SidebarItem';
import SidebarSubheader from './SidebarSubheader';
import { useSelector } from 'react-redux';

const drawerWidth = 300;

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
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
        <Drawer variant="permanent" open={open} PaperProps={{ sx: { backgroundColor: "rgba(30,41,59,1)", color: "white", px: 1 } }} >
            <DrawerHeader></DrawerHeader>
            <List sx={{ mt: 0 }} >
                <SidebarSubheader title="Exploratory Data Analysis" open={open}></SidebarSubheader>
                <SidebarItem itemKey={1} name="Dataset Overview" path="/dashboard/exploratory-data-analysis/dataset-overview" ItemIcon={DatasetIcon} open={open} />
                <SidebarItem itemKey={2} name="Data Correlation" path="/dashboard/exploratory-data-analysis/data-correlation" ItemIcon={ScatterPlotIcon} open={open} />
                <SidebarItem itemKey={2} name="Tabular Representation" path="/dashboard/exploratory-data-analysis/tabular-representation" ItemIcon={TableChartIcon} open={open} />
                <SidebarItem itemKey={3} name="Graphical Representation" path="/dashboard/exploratory-data-analysis/data-visualization" ItemIcon={AutoGraphIcon} open={open} />
            </List >
            
            {/* {open && (<Divider light color="white" sx={{ borderColor: "rgba(0,0,0,0.5)" }} variant="middle" />)} */}
            <hr style={{ borderColor: 'transparent', width: "100%", backgroundColor: "rgb(86 86 86)" }} />
            <List sx={{ mt: 0 }} >
                <SidebarSubheader title="Data Preprocessing" open={open}></SidebarSubheader>
                <SidebarItem itemKey={1} name="Missing Value Imputation" path="/dashboard/data-preprocessing/missing-value-imputation" ItemIcon={InboxIcon} open={open} />
                <SidebarItem itemKey={2} name="Numerical Encoding" path="/dashboard/data-preprocessing/numerical-encoding" ItemIcon={MailIcon} open={open} />
            </List>

            <hr style={{ borderColor: 'transparent', width: "100%", backgroundColor: "rgb(86 86 86)" }} />
            {/* {open && (<Divider light color="white" sx={{ borderColor: "rgba(0,0,0,0.5)" }} variant="middle" />)} */}
            <List sx={{ mt: 0 }}>
                <SidebarSubheader title="Feature Engineering" open={open}></SidebarSubheader>
                <SidebarItem itemKey={1} name="Exponential Transformation" path="/dashboard/feature-engineering/exponential-transformation" ItemIcon={InboxIcon} open={open} />
                <SidebarItem itemKey={2} name="Logarithmic Transformation" path="/dashboard/feature-engineering/logarithmic-transformation" ItemIcon={MailIcon} open={open} />
            </List>
        </Drawer >
    )
}

export default Sidebar;