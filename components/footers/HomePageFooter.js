import React from 'react'

// material ui
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

const HomePageFooter = () => {
    return (
        <Box sx={{ marginTop: "2rem" }}>
            <Divider />
            <Container>
                <Grid container spacing={2} sx={{ marginTop: "1rem" }}>
                    <Grid xs={6} md={6} sx={{ textAlign: "left" }}>
                        Copyright © DataX 2022
                    </Grid>
                    <Grid xs={6} md={6} sx={{ textAlign: "right" }}>
                        About | Contact Us | Terms of Service | Privacy Policy
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default HomePageFooter