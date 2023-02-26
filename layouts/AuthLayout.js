import React from "react";
import {Box} from '@mui/material';

// Import components
import AuthNavbar from '../components/navbar/AuthNavbar/AuthNavbar';

const AuthLayout = ({ children }) => {

    return (
            <Box sx = {{
                display: "flow-root",
                bgcolor: "rgba(30,41,59,1);",
                color: "white",
                backgroundImage: "url('/images/auth_bg.png')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100%",
                height: "100vh"
            }}>
                <AuthNavbar page="auth" />
                {children}
            </Box>
    )
}

export default AuthLayout;