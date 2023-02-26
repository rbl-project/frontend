import React from 'react'
import {Box,Container,Divider,Grid} from '@mui/material'

const HomePageFooter = () => {
    return (
        <Box sx={{ marginTop: "2rem" }}>
            <Divider />
            <Container>
                <Grid container spacing={2} sx={{ marginTop: "1rem" }}>
                    <Grid item xs={6} md={6} sx={{ textAlign: "left" }}>
                        Copyright © DataX 2022
                    </Grid>
                    <Grid item xs={6} md={6} sx={{ textAlign: "right" }}>
                        About | Contact Us | Terms of Service | Privacy Policy
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default HomePageFooter