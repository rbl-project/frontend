import React from 'react'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const ColorButton = styled(Button)(({ theme }) => ({
    '&:hover': {
        backgroundColor: "lightgray",
    },
}));


const DatasetSelectButton = () => {
    return (
        <ColorButton variant="outlined" size="large" align="left" disableElevation={true} fullWidth={true} endIcon={<KeyboardArrowDownIcon fontSize='large' />} sx={{
            mr: 2, textTransform: "none", height:30,my:"auto", minWidth:120, justifyContent:"space-between",px:1 }}>
            Dataset1
        </ColorButton>
    )
}

export default DatasetSelectButton;