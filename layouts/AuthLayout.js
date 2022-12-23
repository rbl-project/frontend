import React from "react";
import Box from '@mui/material/Box';

// Import components
import AuthNavbar from '../components/navbar/AuthNavbar/AuthNavbar';
import NoSSRWrapper from "../components/no-ssr-wrapper";

const AuthLayout = ({ children }) => {

    return (
        <NoSSRWrapper>
            <Box sx = {{
                display: "flow-root",
                bgcolor: "rgba(30,41,59,1);",
                color: "white",
                backgroundImage: "url('/images/auth_bg.png')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100%",
            }}>
                <AuthNavbar page="auth" />
                {children}
            </Box>
        </NoSSRWrapper>
    )
}

export default AuthLayout;