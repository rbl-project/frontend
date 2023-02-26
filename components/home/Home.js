import React from "react";
import Image from "next/image";
import {Box,Grid,Container} from '@mui/material';


// components
import HomePageFooter from "../footers/HomePageFooter";

// styled components
import { 
    HeadingTextPrimary,
    HeadingTextSecondary,
    HomeButton
} from "./HomeStyles";


const Home = () => {
    return (
        <Box sx={{ flexGrow: 1, padding: "2rem 0rem" }}>
            <Container>
                <Grid container spacing={2}>

                    <Grid item xs={6} md={6} >
                        <Box sx={{ position: "relative", top: "25%" }}>

                            <Grid item md={12}>
                                <HeadingTextPrimary>
                                    DataX - A great place to start with your data.
                                </HeadingTextPrimary>
                            </Grid>
                            <Grid item md={12}>
                                <HeadingTextSecondary>
                                    DataX is the destination for all types of data engineering such Data Preprocessing, Exploratory Data Analysis and Feature Engineering. DataX is a platform where you can store your data and access it from anywhere.
                                </HeadingTextSecondary>
                            </Grid>
                            <Grid item md={12}>
                                <HomeButton href="/auth/login" type="dark">
                                    Get Started
                                </HomeButton>
                                <HomeButton href="https://github.com/rbl-project" type="light">
                                    GitHub
                                </HomeButton>
                            </Grid>
                        </Box>
                    </Grid>

                    <Grid item xs={6} md={6} sx={{ textAlign: "right" }}>
                        <Image src="/images/home_image.png" width={600} height={600} alt="Home Image" />
                    </Grid>

                </Grid>
            </Container>
            <HomePageFooter />
        </Box>
    )
}

export default Home;