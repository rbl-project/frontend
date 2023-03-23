import React from 'react';
import { useRouter } from "next/router";
import { ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip, Zoom, } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useSelector, useDispatch } from "react-redux";

// Redux Actions
import { setOpenMenuItem, setOpenGlobalDataRepresentation } from "/store/globalStateSlice";

// Custom Theme for Sidebar Item

const SidebarItem = ({ itemKey, path, name, open, isSelect, ItemIcon, isGlobal }) => {

    const theme = createTheme({
        components: {
            MuiListItemButton: {
                styleOverrides: {
                    root: {
                        '&.Mui-selected': {
                            backgroundColor: "#3d4a6b",
                            color: "#f5f5f5"
                        },
                        '&.Mui-selected:hover': {
                            backgroundColor: "#3d4a6b",
                            color: "#f5f5f5"
                        },
                        '&:hover': {
                            backgroundColor: "#2e374f",
                            color: "#f5f5f5"
                        }
                    },
                },
            },
        },
    });


    const router = useRouter();

    // Redux State
    const dispatch = useDispatch();
    const selectedDataset = useSelector((state) => state.dataset.selectedDataset);
    const selectedMenuItem = useSelector((state) => state.global.openMenuItem);

    // When No Dataset is Selected or Available
    const isDisabled = selectedDataset === null || selectedDataset === undefined || selectedDataset === "";

    const clickHandler = () => {
        if (isGlobal) {
            dispatch(setOpenGlobalDataRepresentation(true));
        }
        else {
            router.push(path);
            dispatch(setOpenMenuItem(name));
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <ListItem key={itemKey} disablePadding sx={{ display: 'block' }} >
                <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: "auto", borderRadius: 2, }} selected={selectedMenuItem === name} disabled={isDisabled} onClick={clickHandler} >
                    <Tooltip title={name} placement="right" TransitionComponent={Zoom} >
                        <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', color: isGlobal ? "cyan" : "white" }} >
                            <ItemIcon />
                        </ListItemIcon>
                    </Tooltip>
                    <ListItemText primaryTypographyProps={{ fontSize: '15px', textTransform: isGlobal ? "uppercase" : "capitalize", color: isGlobal ? "cyan" : "white", letterSpacing: isGlobal ? 2 : 0 }} primary={name} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
            </ListItem>
        </ThemeProvider>
    )
}

export default SidebarItem;