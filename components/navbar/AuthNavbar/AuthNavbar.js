import React from "react";

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
            <AuthNavbarWrapper page = {props.page} >
                <AuthNavbarDiv>

                    <AuthNavbarLeft>
                        <h2>DataX</h2>
                    </AuthNavbarLeft>

                    <AuthNavbarRight>
                        <List>
                            <ListOption> 
                                <a href="https://github.com/rbl-project" target="_blank"> <GitHubIcon/> </a>
                            </ListOption>
                            <ListOption> 
                                <a href="https://twitter.com" target="_blank"> <TwitterIcon/> </a>
                            </ListOption>
                            <ListOption>
                                <a href="https://facebook.com" target="_blank"> <FacebookIcon/> </a>
                            </ListOption>
                            <ListOption>
                                {
                                    props.page === "home" ?
                                    <HomeButton href="/auth/login" page="home">
                                        Login
                                    </HomeButton>
                                    :
                                    <HomeButton href="/home" page="auth">
                                        Home
                                    </HomeButton>
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