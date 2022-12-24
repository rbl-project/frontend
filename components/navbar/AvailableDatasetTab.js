import * as React from 'react';
import Radio from '@mui/material/Radio';
import { Box, Button } from '@mui/material';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

const AvailableDatasetTab = ({ handleModalClose }) => {

    const [value, setValue] = React.useState('Dataset1');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <Box sx={{ height: "100%" }}>
            <FormControl sx={{ minHeight: 360 }}>
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={value}
                    onChange={handleChange}
                >
                    <FormControlLabel value="Dataset1" control={<Radio />} label="Dataset1" />
                    <FormControlLabel value="Dataset2" control={<Radio />} label="Dataset2" />
                    <FormControlLabel value="Dataset3" control={<Radio />} label="Dataset3" />
                    <FormControlLabel value="Dataset4" control={<Radio />} label="Dataset4" />
                    <FormControlLabel value="Dataset5" control={<Radio />} label="Dataset5" />
                </RadioGroup>
            </FormControl>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}  >
                <Button onClick={handleModalClose} variant="contained"  >Select</Button>
            </Box>
        </Box>
    );
}

export default AvailableDatasetTab;
