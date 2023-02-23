import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
    components: {
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    '&.Mui-selected': {
                        backgroundColor: "#4884e6",
                        color: "#f5f5f5"
                    },
                    "&.Mui-selected:hover": {
                        backgroundColor: "#4884e6",
                        color: "#f5f5f5"
                    }
                },
            },
        },
    },
});

const SelectGraphTypeItem = ({ value, name, ItemIcon, setTabName,seletedTabName, }) => {

    const isSelected = seletedTabName === value;

    const clickHandler = () => {
        setTabName(value);
    }

    return (
        <ThemeProvider theme={theme}>
            <ListItem key={value} disablePadding sx={{ display: 'block' }} onClick={clickHandler} >
                <ListItemButton sx={{ px: "auto", justifyContent:"initial", borderRadius: 3, }} selected={isSelected} >
                    <ListItemIcon sx={{ minWidth: 0,mr:1, justifyContent: 'center', color: isSelected ? "white" :"black", }} >
                        <ItemIcon fontSize={value === "box" ?"1.5rem" :"medium"} />
                    </ListItemIcon>
                    <ListItemText primary={name} />
                </ListItemButton>
            </ListItem>
        </ThemeProvider>
    )
}

export default SelectGraphTypeItem;