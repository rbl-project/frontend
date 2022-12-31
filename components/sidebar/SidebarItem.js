import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import Link from "next/link";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {useSelector,useDispatch} from "react-redux";
import {setOpenMenuItem} from "/store/globalStateSlice";

const theme = createTheme({
    components: {
        MuiListItem: {
            styleOverrides: {
                root: {
                    '&.Mui-selected': {
                        backgroundColor: 'dodgerblue',
                        // backgroundColor: 'mediumblue'
                    },
                },
            },
        },
    },
});

const SidebarItem = ({ itemKey, path, name, open, isSelect, ItemIcon }) => {

    const dispatch = useDispatch();
    const selectedMenuItem = useSelector((state) => state.global.openMenuItem);

    const clickHandler = () => {
        dispatch(setOpenMenuItem(name));
    }

    return (
        <ThemeProvider theme={theme}>
            <ListItem key={itemKey} disablePadding sx={{ display: 'block',borderRadius:3, }} selected={selectedMenuItem === name} onClick={clickHandler} >
                <Link href={path} >
                    <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: "auto" }} >
                        <Tooltip title={name} placement="right" TransitionComponent={Zoom} >
                            <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', color: "white" }} >
                                <ItemIcon />
                            </ListItemIcon>
                        </Tooltip>
                        <ListItemText primary={name} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </Link>
            </ListItem>
        </ThemeProvider>
    )
}

export default SidebarItem;