import React from "react";
import Link from 'next/link';
// styled components
import {
    AuthNavbarWrapper,
    AuthNavbarDiv,
    AuthNavbarLeft,
    AuthNavbarRight,
    List,
    ListOption,
    HomeButton,
} from "./AuthNavbarStyles";

// icons
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';

const AuthNavbar = (props) => {

    return (
        <>
            <AuthNavbarWrapper page={props.page} >
                <AuthNavbarDiv>

                    <AuthNavbarLeft>
                        <h2>DataTreat</h2>
                    </AuthNavbarLeft>

                    <AuthNavbarRight>
                        <List>
                            <ListOption>
                                <a href="https://github.com/rbl-project" target="_blank" rel="noopener noreferrer"> <GitHubIcon /> </a>
                            </ListOption>
                            <ListOption>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"> <TwitterIcon /> </a>
                            </ListOption>
                            <ListOption>
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"> <FacebookIcon /> </a>
                            </ListOption>
                            <ListOption>
                                {
                                    props.page === "home" ?
                                        < Link href="/auth/login">
                                            <HomeButton href="/auth/login" page="home">
                                                Login
                                            </HomeButton>
                                        </Link>
                                        :
                                        <Link href="/home">
                                            <HomeButton href="/home" page="auth">
                                                Home
                                            </HomeButton>
                                        </Link>
                                }
                            </ListOption>
                        </List>
                    </AuthNavbarRight>

                </AuthNavbarDiv>
            </AuthNavbarWrapper>
        </>
    )
}

export default AuthNavbar;