import React from 'react';
import {Typography,ListSubheader} from '@mui/material';


const SidebarSubheader = ({open,title}) => {
    return (
        <ListSubheader sx={{ backgroundColor: "inherit" }} inset={!open} >
            <Typography variant="overline" color="rgba(100,119,139,1)"  noWrap component="div" sx={{fontWeight:"bold"}}>
                {title}
            </Typography>
        </ListSubheader>
    )
}

export default SidebarSubheader;