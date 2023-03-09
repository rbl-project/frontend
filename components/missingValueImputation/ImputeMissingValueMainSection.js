import React, { useState } from 'react';
import { Box, Paper, Typography, Divider, Tooltip, Button, TextField, } from '@mui/material';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MUIDataTable from "mui-datatables";

// components
import MissingValuePercentageBar from './MissingValuePercentageBar';
import MissingValuePercentagePie from './MissingValuePercentagePie';
import MissingValuePercentageCircle from './MissingValuePercentageCircle';

// icons
import ApplyChangesIcon from '@mui/icons-material/Done';
import RevertChangesIcon from '@mui/icons-material/Replay';

// Overriding Existing Styles
const theme = createTheme({
  components: {
    MuiTableBody: {
      styleOverrides: {
        root: {
          // backgroundColor: "#FF0000",
          "&::-webkit-scrollbar": {
            width: "0.6rem",
            height: "0.6rem",
            borderRadius: "2rem"
          },
          "&::-webkit-scrollbar-track": {
            bgcolor: "#f1f1f1"
          },
          "&::-webkit-scrollbar-thumb": {
            bgcolor: "#c1c1c1",
            borderRadius: "3rem"
          }
        }
      }
    }
  }
})

const table_options = {
  selectableRowsHideCheckboxes: true,
  selectableRowsOnClick: false,
  rowsPerPage: 12,
  elevation: 0,
  tableBodyHeight: '74vh',
  fixedHeader: true,
  download: false,
  print: false,
  textLabels: {
    body: {
      noMatch: 'No data to show',
    }
  }
};

const table_columns = ["Column 1", "Column 2", "Column 3", "Column 4", "Column 5", "Column 6", "Column 7", "Column 8", "Column 9", "Column 10", "Column 11", "Column 12", "Column 13", "Column 14", "Column 15"]

const table_data = [
  ["Row 1.1", "Row 1.2", "Row 1.3", "Row 1.4", "Row 1.5", "Row 1.6", "Row 1.7", "Row 1.8", "Row 1.9", "Row 1.10", "Row 1.11", "Row 1.12", "Row 1.13", "Row 1.14", "Row 1.15"],
  ["Row 2.1", "Row 2.2", "Row 2.3", "Row 2.4", "Row 2.5", "Row 2.6", "Row 2.7", "Row 2.8", "Row 2.9", "Row 2.10", "Row 2.11", "Row 2.12", "Row 2.13", "Row 2.14", "Row 2.15"],
  ["Row 3.1", "Row 3.2", "Row 3.3", "Row 3.4", "Row 3.5", "Row 3.6", "Row 3.7", "Row 3.8", "Row 3.9", "Row 3.10", "Row 3.11", "Row 3.12", "Row 3.13", "Row 3.14", "Row 3.15"],
  ["Row 4.1", "Row 4.2", "Row 4.3", "Row 4.4", "Row 4.5", "Row 4.6", "Row 4.7", "Row 4.8", "Row 4.9", "Row 4.10", "Row 4.11", "Row 4.12", "Row 4.13", "Row 4.14", "Row 4.15"],
  ["Row 5.1", "Row 5.2", "Row 5.3", "Row 5.4", "Row 5.5", "Row 5.6", "Row 5.7", "Row 5.8", "Row 5.9", "Row 5.10", "Row 5.11", "Row 5.12", "Row 5.13", "Row 5.14", "Row 5.15"],
  ["Row 6.1", "Row 6.2", "Row 6.3", "Row 6.4", "Row 6.5", "Row 6.6", "Row 6.7", "Row 6.8", "Row 6.9", "Row 6.10", "Row 6.11", "Row 6.12", "Row 6.13", "Row 6.14", "Row 6.15"],
  ["Row 7.1", "Row 7.2", "Row 7.3", "Row 7.4", "Row 7.5", "Row 7.6", "Row 7.7", "Row 7.8", "Row 7.9", "Row 7.10", "Row 7.11", "Row 7.12", "Row 7.13", "Row 7.14", "Row 7.15"],
  ["Row 8.1", "Row 8.2", "Row 8.3", "Row 8.4", "Row 8.5", "Row 8.6", "Row 8.7", "Row 8.8", "Row 8.9", "Row 8.10", "Row 8.11", "Row 8.12", "Row 8.13", "Row 8.14", "Row 8.15"],
  ["Row 9.1", "Row 9.2", "Row 9.3", "Row 9.4", "Row 9.5", "Row 9.6", "Row 9.7", "Row 9.8", "Row 9.9", "Row 9.10", "Row 9.11", "Row 9.12", "Row 9.13", "Row 9.14", "Row 9.15"],
  ["Row 10.1", "Row 10.2", "Row 10.3", "Row 10.4", "Row 10.5", "Row 10.6", "Row 10.7", "Row 10.8", "Row 10.9", "Row 10.10", "Row 10.11", "Row 10.12", "Row 10.13", "Row 10.14", "Row 10.15"],
  ["Row 11.1", "Row 11.2", "Row 11.3", "Row 11.4", "Row 11.5", "Row 11.6", "Row 11.7", "Row 11.8", "Row 11.9", "Row 11.10", "Row 11.11", "Row 11.12", "Row 11.13", "Row 11.14", "Row 11.15"],
  ["Row 12.1", "Row 12.2", "Row 12.3", "Row 12.4", "Row 12.5", "Row 12.6", "Row 12.7", "Row 12.8", "Row 12.9", "Row 12.10", "Row 12.11", "Row 12.12", "Row 12.13", "Row 12.14", "Row 12.15"],
  ["Row 13.1", "Row 13.2", "Row 13.3", "Row 13.4", "Row 13.5", "Row 13.6", "Row 13.7", "Row 13.8", "Row 13.9", "Row 13.10", "Row 13.11", "Row 13.12", "Row 13.13", "Row 13.14", "Row 13.15"],
  ["Row 14.1", "Row 14.2", "Row 14.3", "Row 14.4", "Row 14.5", "Row 14.6", "Row 14.7", "Row 14.8", "Row 14.9", "Row 14.10", "Row 14.11", "Row 14.12", "Row 14.13", "Row 14.14", "Row 14.15"],
  ["Row 15.1", "Row 15.2", "Row 15.3", "Row 15.4", "Row 15.5", "Row 15.6", "Row 15.7", "Row 15.8", "Row 15.9", "Row 15.10", "Row 15.11", "Row 15.12", "Row 15.13", "Row 15.14", "Row 15.15"],
];


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
    { title: 'Drop Column', value: 'drop-column', disabled: columnName === 'all-columns' ? true : false },
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
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems:"center" }}>

            <Typography variant="h6" sx={{ fontWeight: "bold",mr:1 }} > Missing Value Imputation - {columnName} </Typography>
            <MissingValuePercentageCircle  />
            <Box sx={{ flexGrow: 1 }} />
            <Tooltip title="Once You Click on this Button, All the Changes will be made into Original Dataset Permanently">
              <Button variant="contained" color='success' size="small">Save Changes</Button>
            </Tooltip>
          </Box>
          < Divider sx={{ my: 1 }} />
        </Box>

        {/* Missing Value and Imputation Dropdowns */}
        <Box sx={{ display: "flex", mt: 3, alignItems: "flex-start" }}>

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
              <Button aria-label="Revert Changes" variant="contained" color='error'>
                <RevertChangesIcon />
              </Button>
            </Tooltip>
          </Box>




        </Box>

        {/* Show Result */}
        <Box sx={{ mt: 1 }}>
          < ThemeProvider theme={theme} >
            <MUIDataTable
              title={<Typography variant="h6" >Result</Typography>}
              data={table_data}
              columns={table_columns}
              options={table_options}
            />
          </ThemeProvider>
        </Box>

      </Paper>
    </Box>
  )
}

export default ImputeMissingValueMainSection;








