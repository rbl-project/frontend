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

const AuthNavbar = () => {

    return (
        <>
            <AuthNavbarWrapper>
                <AuthNavbarDiv>

                    <AuthNavbarLeft>
                        <h2>DataX</h2>
                    </AuthNavbarLeft>

                    <AuthNavbarRight>
                        <List>
                            <ListOption> <FacebookIcon/> </ListOption>
                            <ListOption> <TwitterIcon/> </ListOption>
                            <ListOption> <GitHubIcon/> </ListOption>
                            <ListOption>
                                <HomeButton>
                                    Home
                                </HomeButton>
                            </ListOption>
                        </List>
                    </AuthNavbarRight>

                </AuthNavbarDiv>
            </AuthNavbarWrapper>
        </>
    )
}

export default AuthNavbar;