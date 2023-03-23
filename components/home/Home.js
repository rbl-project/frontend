import React from "react";
import Image from "next/image";
import { Box, Grid, Container } from '@mui/material';
import Link from 'next/link';


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
                                    DataTreat - A great place to start with your data.
                                </HeadingTextPrimary>
                            </Grid>
                            <Grid item md={12}>
                                <HeadingTextSecondary>
                                    DataTreat is the destination for all types of data engineering such Data Preprocessing, Exploratory Data Analysis and Feature Engineering. DataTreat is a platform where you can store your data and access it from anywhere.
                                </HeadingTextSecondary>
                            </Grid>
                            <Grid item md={12}>
                                <Link href="/auth/login">
                                    <HomeButton href="/auth/login" type="dark">
                                        Get Started
                                    </HomeButton>
                                </Link>
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