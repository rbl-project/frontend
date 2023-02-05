import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';

import { useSelector } from 'react-redux';



const ColumnCheckList = ({checkedColumns,handleCheckToggle}) => {

  const dataCorrelationState = useSelector((state) => state.dataCorrelation);
  const columns1 = dataCorrelationState.numerical_columns;
  const columns = [columns1.length > 0 && columns1[0]]

  return (
    <List dense sx={{ width: '100%', height: "77vh", px:1,overflow: "auto", bgcolor: 'background.paper',"&::-webkit-scrollbar": { width: "0.6rem",borderRadius:"2rem" }, "&::-webkit-scrollbar-track": { bgcolor:"#f1f1f1" }, "&::-webkit-scrollbar-thumb": { bgcolor:"#c1c1c1",borderRadius:"3rem" } }}>
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
                <ListItemText id={labelId} primary={value} />
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