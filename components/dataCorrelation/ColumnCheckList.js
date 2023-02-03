import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';

const ColumnCheckList = ({checkedColumns,setCheckedColumns,handleCheckToggle}) => {

  const columns = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

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
                />
              }
              disablePadding
            >
              <ListItemButton>
                <ListItemText id={labelId} primary={value} />
              </ListItemButton>
            </ListItem>
            <Divider component="li" />
          </>
        );
      })}
    </List>
  );
}

export default ColumnCheckList;