import React from 'react';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const DatasetSelectDropdown = () => {
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    return (
        <div>
            <FormControl sx={{ mx:2,mt:0.2, minWidth: 320 }}>
                <Select
                    value={age}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    sx={{
                        height: 32, color: 'darkblue',
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'darkblue',
                            borderWidth: 2
                        },
                        '& .MuiSvgIcon-root': {
                            color: 'darkblue'
                        }
                    }}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}

export default DatasetSelectDropdown;
