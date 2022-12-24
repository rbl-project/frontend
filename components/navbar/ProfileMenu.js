import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useRouter } from 'next/router';
import decode from "jwt-decode";

//constants
import { REQUEST_STATUS_LOADING, REQUEST_STATUS_SUCCEEDED } from '/constants/Constants';

//actions
import { logout } from "/store/authSlice";


const ProfileMenu = () => {

    const [anchorEl, setAnchorEl] = useState(null);
    const [user, setUser] = useState(null);
    
    const authState = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const router = useRouter();


    // This useEffect is used to check if user is logged in or not and if not then redirect to login page from any page
    useEffect(() => {
        const current_user = JSON.parse(localStorage.getItem('profile'));
        const token = current_user?.access_token;
        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()){
                localStorage.removeItem('profile'); // no need to logout from backend as token is expired
                router.replace('/auth/login');
            } 
        } else {
            router.replace('/auth/login');
        }
        setUser(current_user);
    }, [authState.authenticationStatus])


    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                color="inherit"
                id="demo-positioned-button"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{p:0}}
            >
                <AccountCircle fontSize="large"  />
            </IconButton>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                disableScrollLock={true}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={() => { dispatch(logout()) }}>
                    {
                        authState.authenticationStatus === REQUEST_STATUS_LOADING ?
                        (    <div>
                            <img src="/images/loadingdots2.gif" style={{width: "50px", height: "30px"}}/>
                        </div>)
                        : "Logout"
                    }
                </MenuItem>
            </Menu>
        </div>
    );
}

export default ProfileMenu;