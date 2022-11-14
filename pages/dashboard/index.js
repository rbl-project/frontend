import * as React from 'react';
import Box from '@mui/material/Box';
import { styled, useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Image from "next/image";

import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Dashboard = () => {

    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex', bgcolor: "rgba(218, 223, 230,1)", color: "black", minHeight: "100vh" }}>
            <CssBaseline />
            < Navbar handleDrawerOpen={handleDrawerOpen} open={open} drawerWidth={drawerWidth} />
            < Sidebar handleDrawerClose={handleDrawerClose} open={open} drawerWidth={drawerWidth} DrawerHeader={DrawerHeader} />

            <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }} >
                <Grid container spacing={3}>
                    <Grid xs={8}>
                        <Item>
                            <Image src="/images/graph.png" height={300} width={300} />
                        </Item>
                    </Grid>
                    <Grid xs={4}>
                        <Item>
                            <Image src="/images/graph.png" height={300} width={300} />
                        </Item>
                    </Grid>
                    <Grid xs={6}>
                        <Item>
                            <Image src="/images/graph.png" height={300} width={300} />
                        </Item>
                    </Grid>
                    <Grid xs={6}>
                        <Item>
                            <Image src="/images/graph.png" height={300} width={300} />
                        </Item>
                    </Grid>
                    <Grid xs={4}>
                        <Item>
                            <Image src="/images/graph.png" height={300} width={300} />
                        </Item>
                    </Grid>
                    <Grid xs={4}>
                        <Item>
                            <Image src="/images/graph.png" height={300} width={300} />
                        </Item>
                    </Grid>
                    <Grid xs={4}>
                        <Item>
                            <Image src="/images/graph.png" height={300} width={300} />
                        </Item>
                    </Grid>
                    <Grid xs={12}>
                        <Item>
                            <Image src="/images/graph.png" height={300} width={300} />
                        </Item>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default Dashboard;