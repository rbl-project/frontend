import React from 'react';
import { styled,useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {toggleSidebar} from "/store/globalStateSlice";
import { useSelector,useDispatch } from 'react-redux';

const Navbar = () => {

    const theme = useTheme();
    const dispatch = useDispatch();
    const open = useSelector((state) => state.global.openSidebar);

    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
    })(({ theme, open }) => ({
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        })
    }));

    return (
        <AppBar position="fixed" open={open} sx={{bgcolor:"white",color:"black",zIndex: (theme) => theme.zIndex.drawer + 1 }} elevation={0} >
            <Toolbar variant='dense'>
                <IconButton color="inherit" aria-label="open drawer" onClick={() => {dispatch(toggleSidebar())}} edge="start" sx={{marginRight: 5}} >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                    Dashboard
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;