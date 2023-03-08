import React, { useState } from 'react';
import { Box, Paper, Typography, Divider, Tooltip, Button, TextField } from '@mui/material';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

// icons
import ApplyChangesIcon from '@mui/icons-material/Done';
import RevertChangesIcon from '@mui/icons-material/Replay';


const ImputeMissingValueMainSection = ({ columnName }) => {

  const filter = createFilterOptions();

  // Options for Missing Value Dropdown
  const MissingValueOptions = [{ title: 'null', value: null }]
  // Options for Handle Missing Value Dropdown
  const MissingValueHandleOptions = [
    { title: 'Impute Mean', value: 'mean' },
    { title: 'Impute Median', value: 'median' },
    { title: 'Impute Mode', value: 'mode' },
    { title: 'Drop All Rows', value: 'drop-rows' },
    { title: 'Drop Column', value: 'drop-column', disabled: columnName === 'all-columns'? true : false },
  ]

  // State for Missing Value Dropdown
  const [missingValue, setMissingValue] = useState({ title: 'null', value: null });
  // State for Fill Missing Value Dropdown
  const [handleMissingValueBy, setHandleMissingValueBy] = useState({ title: 'Mean', value: 'mean' });

  // Click Handler for Submit Button
  const handleSubmit = () => {
    console.log(missingValue, handleMissingValueBy);
  }


  return (
    <Box sx={{ flexGrow: 1, height: "100%" }}>
      < Paper sx={{ height: "100%", p: 2, pt: 1 }}>

        {/* Heading  */}
        <Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", }} > Missing Value Imputation - {columnName} </Typography>
            <Tooltip title="Once You Click on this Button, All the Changes will be made into Original Dataset Permanently">
              <Button variant="contained" color='success' size="small">Save Changes</Button>
            </Tooltip>
          </Box>
          < Divider sx={{ my: 1 }} />
        </Box>

        {/* Missing Value and Imputation Dropdowns */}
        <Box sx={{ display: "flex", mt: 3,justifyContent:"center", alignItems: "center" }}>

          {/* Missing Value Dropdown */}
          <Box sx={{ width: "20vw", mr: 2 }}>
            <Autocomplete
              size='small'
              value={missingValue}

              onChange={(event, newValue) => {
                // When the user Types and Directly Presses Enter
                if (typeof newValue === 'string') {
                  console.log(newValue);
                  setMissingValue({
                    title: newValue,
                    value: newValue,
                  });
                }
                // When User Types and Creates a New Value 
                else if (newValue && newValue.inputValue) {
                  setMissingValue({
                    title: newValue.inputValue,
                    value: newValue.inputValue,
                  });
                }
                // When User Selects an Existing Value or Clears the Input
                else {
                  setMissingValue(newValue);
                }
              }}

              filterOptions={(options, params) => {
                const filtered = filter(options, params);

                const { inputValue } = params;
                // Suggest the creation of a new value
                const isExisting = options.some((option) => inputValue === option.title);
                if (inputValue !== '' && !isExisting) {
                  filtered.push({
                    inputValue,
                    title: `Add "${inputValue}"`,
                  });
                }

                return filtered;
              }}

              selectOnFocus
              clearOnBlur
              handleHomeEndKeys
              id="free-solo-with-text-demo"
              options={MissingValueOptions}

              getOptionLabel={(option) => {
                // Value selected with enter, right from the input
                if (typeof option === 'string') {
                  return option;
                }
                // Add "xxx" option created dynamically
                if (option.inputValue) {
                  return option.inputValue;
                }
                // Regular option
                return option.title;
              }}

              renderOption={(props, option) => <li {...props}>{option.title}</li>}
              freeSolo
              renderInput={(params) => (
                <TextField {...params} label="Missing Value" />
              )}
            />
          </Box>

          {/* Handle Missing Value Dropdown */}
          <Box sx={{ width: "20vw", mr: 3 }}>
            <Autocomplete
              size='small'
              value={handleMissingValueBy}

              onChange={(event, newValue) => {
                // When the user Types and Directly Presses Enter
                if (typeof newValue === 'string') {
                  console.log(newValue);
                  setHandleMissingValueBy({
                    title: newValue,
                    value: newValue,
                  });
                }
                // When User Types and Creates a New Value 
                else if (newValue && newValue.inputValue) {
                  setHandleMissingValueBy({
                    title: newValue.inputValue,
                    value: newValue.inputValue,
                  });
                }
                // When User Selects an Existing Value or Clears the Input
                else {
                  setHandleMissingValueBy(newValue);
                }
              }}

              filterOptions={(options, params) => {
                const filtered = filter(options, params);

                const { inputValue } = params;
                // Suggest the creation of a new value
                const isExisting = options.some((option) => inputValue === option.title);
                if (inputValue !== '' && !isExisting) {
                  filtered.push({
                    inputValue,
                    title: `Impute "${inputValue}"`,
                  });
                }

                return filtered;
              }}

              selectOnFocus
              clearOnBlur
              handleHomeEndKeys
              id="free-solo-with-text-demo2"
              options={MissingValueHandleOptions}
              getOptionDisabled={(option) => option.disabled}
              getOptionLabel={(option) => {
                // Value selected with enter, right from the input
                if (typeof option === 'string') {
                  return option;
                }
                // Add "xxx" option created dynamically
                if (option.inputValue) {
                  return option.inputValue;
                }
                // Regular option
                return option.title;
              }}

              renderOption={(props, option) => <li {...props}>{option.title}</li>}
              freeSolo
              renderInput={(params) => (
                <TextField {...params} label="Operation" />
              )}
            />
          </Box>

          {/* Apply Chnage Button */}
          <Box sx={{ mr: 1 }}>
            < Tooltip title="Apply Changes" >
              <Button aria-label="Apply Changes" variant="contained">
                <ApplyChangesIcon />
              </Button>
            </Tooltip>
          </Box>

          {/* Revert Chnage Button */}
          <Box sx={{ mr: 1 }}>
            < Tooltip title="Revert Changes" >
              <Button aria-label="Revert Changes" variant="contained" color='warning'>
                <RevertChangesIcon />
              </Button>
            </Tooltip>
          </Box>

        </Box>

        {/* Show Result */}
        <Box sx={{ mt: 3 }}>
              
        </Box>

      </Paper>
    </Box>
  )
}

export default ImputeMissingValueMainSection;








