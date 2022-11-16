import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import Link from "next/link";


const SidebarItem = ({ key, path, name, open, ItemIcon }) => {
    return (
        <ListItem key={key} disablePadding sx={{ display: 'block' }}>
            <Link href={path} >
                <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5, }} >
                    <Tooltip title={name} placement="right" TransitionComponent={Zoom} >
                        <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', color: "white" }} >
                            <ItemIcon />
                        </ListItemIcon>
                    </Tooltip>
                    <ListItemText primary={name} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
            </Link>
        </ListItem>
    )
}

export default SidebarItem;