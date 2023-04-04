import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, Divider, Tooltip, Button, TextField, Grid, Select, FormControl, InputLabel, MenuItem, IconButton, CircularProgress } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router'
import Link from "next/link";
import { toast } from 'react-toastify';

// components
import MissingValuePercentagePie from './MissingValuePercentagePie';
import GlobalDataRepresentationContent from "/components/globalDataRepresentation/GlobalDataRepresentationContent";

// icons
import ApplyChangesIcon from '@mui/icons-material/Done';
import BackIcon from '@mui/icons-material/Reply';

// Redux Actions
import { setOpenMenuItem } from "/store/globalStateSlice";
import { getMissingValuePercentage, imputeMissingValue, resetRequestStatus } from '/store/missingValueImputationSlice';
import { getMetaData } from '/store/datasetUpdateSlice';

// Constants
import { MISSING_VALUE_IMPUTATION_PATH, MISSING_VALUE_IMPUTATION, NUMERICAL, CATEGORICAL, REQUEST_STATUS_SUCCEEDED, REQUEST_STATUS_FAILED, REQUEST_STATUS_LOADING } from '/constants/Constants';


const ImputeMissingValueMainSection = ({ columnName }) => {

  const router = useRouter();

  // Redux State
  const dispatch = useDispatch();
  const selectedDataset = useSelector((state) => state.dataset.selectedDataset);
  const selectedMenuItem = useSelector((state) => state.global.openMenuItem);
  const missingValueImputationState = useSelector((state) => state.missingValueImputation);
  const datasetUpdateState = useSelector((state) => state.datasetUpdate);

  // Get Column Type
  const columnType = ["bool", "object"].includes(datasetUpdateState.metadata?.column_datatypes?.[columnName]) ? CATEGORICAL : NUMERICAL;

  // Options for Imputation Method Dropdown
  const MissingValueHandleOptions = [
    { title: 'Drop All Rows', value: 'drop_rows' },
    { title: columnName === 'All Columns' ? 'Drop Columns' : 'Drop Column', value: 'drop_column' },
    { title: 'Impute Mean', value: 'mean', disabled: columnType === CATEGORICAL },
    { title: 'Impute Median', value: 'median', disabled: columnType === CATEGORICAL },
    { title: 'Impute Mode', value: 'mode', },
    { title: 'Impute Custom Value', value: 'custom_value', disabled: columnName === 'All Columns' }
  ]

  // State for Imputation Method Dropdown
  const [ImputationMethod, setImputationMethod] = useState("drop_rows");
  // State for Custom Value Input
  const [CustomValue, setCustomValue] = useState("");


  // Change Handler for Imputation Method Dropdown
  const handleImpuationMethodChange = (event) => {
    setImputationMethod(event.target.value);
  };

  // Change Handler for Custom Value Input
  const handleCustomValueChange = (event) => {
    if (columnType === CATEGORICAL) {
      setCustomValue(String(event.target.value));
    }
    else {
      setCustomValue(Number(event.target.value));
    }
  };

  // function to apply current changes to the dataset
  const applyDataChanges = async () => {
    // check if the request is already in progress
    if (missingValueImputationState.impute_missing_value_req_status !== REQUEST_STATUS_LOADING) {
      await dispatch(imputeMissingValue({ dataset_name: selectedDataset, column_name: columnName, imputation_method: ImputationMethod, imputation_value: CustomValue }));
      dispatch(getMetaData({ dataset_name: selectedDataset }));
      // If Imputation Method is drop column, Redirect to Missing Value Imputation Page
      if (ImputationMethod === "drop_column") {
        router.push(MISSING_VALUE_IMPUTATION_PATH);
      } else {
        dispatch(getMissingValuePercentage({ dataset_name: selectedDataset, get_all_columns: false, column_name: columnName }));
      }
    }
  }

console.log("status",missingValueImputationState);
  // toaster for dataCleaning state
  useEffect(() => {

    // // redirect to missing value imputation page if column does not exist
    if (missingValueImputationState.get_missing_value_percentage_req_status === REQUEST_STATUS_FAILED) {
      router.push(MISSING_VALUE_IMPUTATION_PATH);
    }
    // In case of success
    if (missingValueImputationState.impute_missing_value_req_status === REQUEST_STATUS_SUCCEEDED && ImputationMethod !== "drop_column") {
      toast.success(missingValueImputationState.message, {
        position: "bottom-right",
        autoClose: false,
        hideProgressBar: false,
        autoClose: 2000,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        theme: "light",
      });
      dispatch(resetRequestStatus());
    }

    // In case of failure
    else if (missingValueImputationState.impute_missing_value_req_status === REQUEST_STATUS_FAILED) {
      toast.error(missingValueImputationState.message, {
        position: "bottom-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        theme: "light",
      });
      dispatch(resetRequestStatus());
    }

  }, [missingValueImputationState.impute_missing_value_req_status, missingValueImputationState.get_missing_value_percentage_req_status])


  // Setting Open Menu Item When Page Loads or Refreshes
  useEffect(() => {
    if (selectedMenuItem !== MISSING_VALUE_IMPUTATION) {
      dispatch(setOpenMenuItem(MISSING_VALUE_IMPUTATION));
    }
  }, []);

  // When Revert Changes or Save Changes isx clicked, call backend to get the updated data
  useEffect(() => {
    if (datasetUpdateState.revertChangesRequestStatus === REQUEST_STATUS_SUCCEEDED || datasetUpdateState.saveChangesRequestStatus === REQUEST_STATUS_SUCCEEDED) {
      if(ImputationMethod !== "drop_column"){
        dispatch(getMissingValuePercentage({ dataset_name: selectedDataset, get_all_columns: false, column_name: columnName }));
      }
    }
  }, [datasetUpdateState.revertChangesRequestStatus, datasetUpdateState.saveChangesRequestStatus])

  // Calling backend APIs
  useEffect(() => {
    if (["", null, undefined].includes(selectedDataset) === false && ["", null, undefined,"undefined"].includes(columnName) === false) {
      dispatch(getMissingValuePercentage({ dataset_name: selectedDataset, get_all_columns: false, column_name: columnName }));
    }
  }, [selectedDataset, columnName])


  return (
    <Box sx={{ flexGrow: 1, height: "100%" }}>
      < Paper sx={{ height: "100%", p: 2, pt: 1 }}>

        {/* Heading  */}
        <Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            < Link href={MISSING_VALUE_IMPUTATION_PATH} >
              < IconButton size='small' sx={{ color: "black", border: 1, borderColor: "lightGray" }} >
                <BackIcon />
              </IconButton>
            </Link>
            <Typography variant="h6" sx={{ fontWeight: "bold", ml: 1 }} > Missing Value Imputation:</Typography>
            <Typography variant="h6" sx={{ fontWeight: 500, ml: 1 }} > {columnName} </Typography>
            {columnName !== "All Columns" && (<Typography variant="caption" sx={{ fontWeight: 500, ml: 1 }} > ({columnType}) </Typography>)}
            {missingValueImputationState.single_column_missing_value_data?.is_column_deleted && (<Typography variant="h6" color='error' sx={{ fontWeight: 500, ml: 1 }} > [Deleted] </Typography>)}

            <Box sx={{ flexGrow: 1 }} />
          </Box>
          < Divider sx={{ my: 1 }} />
        </Box>

        {/* Main Section  */}
        < Grid container spacing={3} sx={{ px: 2 }}>
          {/* Left Side */}
          <Grid item xs={3}>
            <Box sx={{ display: "flex", flexDirection: "column", }}>

              {/* Missing Value Percentage  */}
              < Box sx={{ height: "35vh", mt: 3 }} >

                {/* While get missing value percentage is loading */}
                {
                  missingValueImputationState.get_missing_value_percentage_req_status === REQUEST_STATUS_LOADING ? (
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", width: "100%" }}>
                      <CircularProgress size="2rem" color='inherit' />
                    </Box>
                  ) : (

                    < MissingValuePercentagePie isDeleted={missingValueImputationState.single_column_missing_value_data?.is_column_deleted} missingValueData={missingValueImputationState.single_column_missing_value_data} />
                  )}
              </Box>
              < Typography variant="caption" sx={{ textAlign: "center", mt: 1, fontWeight: 500, textTransform: "uppercase", color: missingValueImputationState.single_column_missing_value_data?.is_column_deleted ? "lightgray" : "black" }} > Missing Value Percentage </Typography>

              < Divider sx={{ my: 4 }} />

              {/* Handle Missing Value Dropdown */}
              <Box sx={{ mt: 2 }}>
                <FormControl fullWidth>
                  <InputLabel id="impute-missing-value-by-select">Imputation Method</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    size='small'
                    value={ImputationMethod}
                    label="Imputation Method"
                    onChange={handleImpuationMethodChange}
                  >
                    {MissingValueHandleOptions.map((option, index) => (
                      <MenuItem key={index} value={option.value} disabled={option.disabled}>{option.title}</MenuItem>
                    ))}

                  </Select>
                </FormControl>
              </Box>

              {/* Custom Value Input */}
              {ImputationMethod === 'custom_value' && (
                <Box sx={{ mt: 2 }}>
                  <TextField
                    fullWidth
                    id="custom-value-input"
                    label="Custom Value"
                    variant="outlined"
                    size='small'
                    type={columnType === NUMERICAL ? 'number' : 'text'}
                    value={CustomValue}
                    onChange={handleCustomValueChange}
                  />
                </Box>
              )}

              {/* Apply Chnage Button */}
              <Box sx={{ mt: 3 }}>
                < Tooltip title="Apply Changes will not modify Original Dataset" >
                  <Button
                    fullWidth
                    aria-label="Apply Changes"
                    variant="contained"
                    onClick={applyDataChanges}
                    disabled={missingValueImputationState.single_column_missing_value_data?.is_column_deleted}
                    endIcon={missingValueImputationState.impute_missing_value_req_status !== REQUEST_STATUS_LOADING && <ApplyChangesIcon />}
                  >
                    {
                      missingValueImputationState.impute_missing_value_req_status === REQUEST_STATUS_LOADING ? (
                        <CircularProgress size="1.5rem" color='inherit' />
                      ) : (
                        "Apply Changes"
                      )
                    }
                  </Button>
                </Tooltip>
              </Box>

            </Box>
          </Grid>

          { /* Right Side */}
          <Grid item xs={9}>
            {/* Show Result */}
            <Box >
              <Typography variant="h6" gutterBottom sx={{ textAlign: 'start', color: "black" }}>
                Result
              </Typography>
              <GlobalDataRepresentationContent
                currPage={0}
                column={''}
                columnValue={[]}
                numericalToValue={null}
                numericalFromValue={null}
                reload={missingValueImputationState.impute_missing_value_req_status === REQUEST_STATUS_SUCCEEDED || missingValueImputationState.impute_missing_value_req_status === REQUEST_STATUS_FAILED}
                parameters={{
                  "categorical_values": {},
                  "numerical_values": {}
                }}
              />
            </Box>
          </Grid>

        </Grid>

      </Paper>
    </Box >
  )
}

export default ImputeMissingValueMainSection;








