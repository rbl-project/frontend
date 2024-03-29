import React from 'react';
import { ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useSelector } from "react-redux";
import { CATEGORICAL, NUMERICAL } from '/constants/Constants';

// Theme Overrides for MuiListItemButton
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


const SelectGraphTypeItem = ({ value, name, ItemIcon, setTabName, seletedTabName, columnType, nColumns }) => {

    // Redux State
    const n_numerical_columns = useSelector((state) => state.graphicalRepresentation.n_numerical_columns);
    const n_categorical_columns = useSelector((state) => state.graphicalRepresentation.n_categorical_columns);

    const isSelected = seletedTabName === value;
    const isDisabled = (columnType === NUMERICAL && n_numerical_columns < nColumns) || (columnType === CATEGORICAL && n_categorical_columns < nColumns);

    const clickHandler = () => {
        setTabName(value);
    }

    return (
        <ThemeProvider theme={theme}>
            < Tooltip title={isDisabled ? `You need at least ${nColumns} ${columnType} Column${nColumns > 1 ? "s" : ""} to use plot Graph` : ""} >
                <ListItem key={value} disablePadding sx={{ display: 'block' }} >
                    <ListItemButton sx={{ px: "auto", justifyContent: "initial", borderRadius: 2, }} selected={isSelected} disabled={isDisabled} onClick={clickHandler} >
                        <ListItemIcon sx={{ minWidth: 0, mr: 1, justifyContent: 'center', color: isSelected ? "white" : "black", }} >
                            <ItemIcon fontSize={value === "box" ? "1.5rem" : "medium"} />
                        </ListItemIcon>
                        <ListItemText primary={name} />
                    </ListItemButton>
                </ListItem>
            </Tooltip>
        </ThemeProvider>
    )
}

export default SelectGraphTypeItem;