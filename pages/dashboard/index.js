import * as React from 'react';
import Box from '@mui/material/Box';
import { styled, useTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Image from "next/image";

import DashboardLayout from '../../layouts/DashboardLayout';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Dashboard = () => {

    const theme = useTheme();

    return (

        <DashboardLayout>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }} >
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
        </DashboardLayout>
    );
}

export default Dashboard;