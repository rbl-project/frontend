import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';

import { useSelector } from 'react-redux';



const ColumnCheckList = ({ checkedColumns, handleCheckToggle }) => {

  const dataCorrelationState = useSelector((state) => state.dataCorrelation);
  const columns = dataCorrelationState.numerical_columns;

  return (
    <List dense sx={{ width: '100%', height: "77vh", px: 1, overflow: "auto", bgcolor: 'background.paper', "&::-webkit-scrollbar": { width: "0.6rem", borderRadius: "2rem" }, "&::-webkit-scrollbar-track": { bgcolor: "#f1f1f1" }, "&::-webkit-scrollbar-thumb": { bgcolor: "#c1c1c1", borderRadius: "3rem" } }}>
      {columns.map((value) => {
        const labelId = `checkbox-list-secondary-label-${value}`;
        return (
          <>
            <ListItem
              key={value}
              secondaryAction={
                <Checkbox
                  edge="end"
                  onChange={handleCheckToggle(value)}
                  checked={checkedColumns.indexOf(value) !== -1}
                  inputProps={{ 'aria-labelledby': labelId }}
                  disabled={columns.length < 2}
                />
              }
              disablePadding
            >
              <ListItemButton key={`list-button-${value}`} disabled={columns.length < 2} >
                <Tooltip title={value} placement="bottom-start" key={`tooltip-${value}`}>
                  <ListItemText id={labelId} primary={value} primaryTypographyProps={{ sx: { overflow: "hidden", textOverflow: "ellipsis" } }} />
                </Tooltip>
              </ListItemButton>
            </ListItem>
            <Divider key={`divider-${value}`} component="li" />
          </>
        );
      })}
    </List>
  );
}

export default ColumnCheckList;