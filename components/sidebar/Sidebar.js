import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { List,Box } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import { useSelector } from 'react-redux';

// Icons
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import DatasetIcon from '@mui/icons-material/Dataset';
import TableChartIcon from '@mui/icons-material/TableChart';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import MissingValueImputationIcon from '@mui/icons-material/Troubleshoot';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import GlobalDataRepresentationIcon from '@mui/icons-material/RemoveRedEye';
import RepeatOneIcon from '@mui/icons-material/RepeatOne';

// Components
import SidebarItem from './SidebarItem';
import SidebarSubheader from './SidebarSubheader';

// Constants
import {
    DRAWER_WIDTH,
    DATASET_OVERVIEW,
    DATASET_OVERVIEW_PATH,
    DATA_CORRELATION,
    DATA_CORRELATION_PATH,
    TABULAR_REPRESENTATION,
    TABULAR_REPRESENTATION_PATH,
    GRAPHICAL_REPRESENTATION,
    GRAPHICAL_REPRESENTATION_PATH,
    MISSING_VALUE_IMPUTATION,
    MISSING_VALUE_IMPUTATION_PATH,
    DATA_CLEANING,
    DATA_CLEANING_PATH,
    FEATURE_ENCODING,
    FEATURE_ENCODING_PATH,
    DATA_TRANSFORMATION,
    DATA_TRANSFORMATION_PATH,
    DATA_DISCRETIZATION,
    DATA_DISCRETIZATION_PATH,
    DATASET_VIEW,
} from '/constants/Constants';

const drawerWidth = DRAWER_WIDTH;


const Sidebar = () => {

    const theme = useTheme();
    const open = useSelector((state) => state.global.openSidebar);

    // Custom styles for opened sidebar
    const openedMixin = (theme) => ({
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: 'hidden',
    });

    // Custom styles for closed sidebar
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

    // Custom styled Drawer
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
        <Drawer variant="permanent" open={open} PaperProps={{ sx: { backgroundColor: "rgba(30,41,59,1)", color: "white", overflow:"hidden" } }} >
            {/* <DrawerHeader ></DrawerHeader> */}
            <Box sx={{height:"7vh"}} />
            <Box sx={{ display: "flex", flexDirection: "column", height: "93vh" }}>
                <Box sx={{ flexGrow: 1, overflowX:"hidden",overflowY:"auto", "&::-webkit-scrollbar": { width: "0.5rem", borderRadius: "2rem" },
                                    "&::-webkit-scrollbar-track": { bgcolor: "rgba(255,255,255,0)",borderRadius: "3rem" },
                                    "&::-webkit-scrollbar-thumb": { bgcolor: "rgba(255,255,255,0.1)", borderRadius: "3rem" }}}>
                    {/* Exploratory Data Analysis Functions */}
                    <List sx={{ mt: 0,mx:1 }} >
                        <SidebarSubheader title="Exploratory Data Analysis" open={open}></SidebarSubheader>
                        <SidebarItem itemKey={1} name={DATASET_OVERVIEW} path={DATASET_OVERVIEW_PATH} ItemIcon={DatasetIcon} open={open} />
                        <SidebarItem itemKey={2} name={DATA_CORRELATION} path={DATA_CORRELATION_PATH} ItemIcon={ScatterPlotIcon} open={open} />
                        <SidebarItem itemKey={3} name={TABULAR_REPRESENTATION} path={TABULAR_REPRESENTATION_PATH} ItemIcon={TableChartIcon} open={open} />
                        <SidebarItem itemKey={4} name={GRAPHICAL_REPRESENTATION} path={GRAPHICAL_REPRESENTATION_PATH} ItemIcon={AutoGraphIcon} open={open} />
                    </List >

                    {/* Data Preprocessing Functions */}
                    <List sx={{ mt: 0,mx:1,}} >
                    <hr style={{ borderColor: 'transparent', width: "100%", backgroundColor: "rgb(86 86 86)" }} />
                        <SidebarSubheader title="Data Preprocessing" open={open}></SidebarSubheader>
                        <SidebarItem itemKey={1} name={MISSING_VALUE_IMPUTATION} path={MISSING_VALUE_IMPUTATION_PATH} ItemIcon={MissingValueImputationIcon} open={open} />
                        <SidebarItem itemKey={2} name={DATA_CLEANING} path={DATA_CLEANING_PATH} ItemIcon={CleaningServicesIcon} open={open} />
                    </List>

                    {/* Feature Engineering Functions */}
                    <List sx={{ mt: 0,mx:1 }}>
                    <hr style={{ borderColor: 'transparent', width: "100%", backgroundColor: "rgb(86 86 86)" }} />
                        <SidebarSubheader title="Feature Engineering" open={open}></SidebarSubheader>
                        <SidebarItem itemKey={1} name={FEATURE_ENCODING} path={FEATURE_ENCODING_PATH} ItemIcon={RepeatOneIcon} open={open} />
                        <SidebarItem itemKey={2} name={DATA_TRANSFORMATION} path={DATA_TRANSFORMATION_PATH} ItemIcon={MailIcon} open={open} />
                        <SidebarItem itemKey={3} name={DATA_DISCRETIZATION} path={DATA_DISCRETIZATION_PATH} ItemIcon={CleaningServicesIcon} open={open} />
                    </List>
                </Box>
                <Box sx={{ mb: 1,mx:1 }}>
                    <hr style={{ borderColor: 'transparent', width: "100%", backgroundColor: "rgb(86 86 86)" }} />
                    <SidebarItem itemKey={1} name={DATASET_VIEW} path={null} ItemIcon={GlobalDataRepresentationIcon} open={open} isGlobal={true} />
                </Box>

            </Box>

        </Drawer >
    )
}

export default Sidebar;