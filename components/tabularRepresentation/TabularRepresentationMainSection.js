import React, { useState, useEffect } from 'react';
import {
    Box,
    Grid,
    Paper,
    Button,
    Divider,
    CircularProgress,
    Typography
} from "@mui/material";

import { useDispatch, useSelector } from 'react-redux';
import MUIDataTable from "mui-datatables";
import { ToastContainer, toast } from 'react-toastify';

// actions
import { getColumnInfo, getTabularRepresentation } from "/store/tabularRepresentationSlice";
import { setOpenMenuItem } from "/store/globalStateSlice";

// constants
import { REQUEST_STATUS_LOADING, TABULAR_REPRESENTATION } from '/constants/Constants';

// components
import SearchParameters from './SearchParameters';
import SortParameters from './SortParameters';
import FilterParameters from './FilterParameters';

const TabularRepresentationMainSection = () => {

    //! ================ SELECTED DATASET AND OTHER STATE INFO ===============

    // REdux state
    const dispatch = useDispatch();
    const selectedDataset = useSelector((state) => state.dataset.selectedDataset);
    const tabularRepresentationState = useSelector((state) => state.tabularRepresentation);
    const selectedMenuItem = useSelector((state) => state.global.openMenuItem);


    // Calling backend APIs
    useEffect(() => {
        if (selectedDataset !== null && selectedDataset !== undefined && selectedDataset !== "") {
            dispatch(getColumnInfo({ dataset_name: selectedDataset }));
            dispatch(getTabularRepresentation({ dataset_name: selectedDataset }));
        }
        setSearchQuery({
            "categorical_col": {},
            "numerical_col": {}
        })
        setSortQuery({})
        setFilterQuery({
            "columns": [], // if filtercolumn length is 0 then consider all the columnns
            "row_start": 0,
            "row_end": tabularRepresentationState.n_rows
        })
    }, [selectedDataset])

    // Setting Open Menu Item When Page Loads or Refreshes
    useEffect(() => {
        if (selectedMenuItem !== TABULAR_REPRESENTATION) {
            dispatch(setOpenMenuItem(TABULAR_REPRESENTATION));
        }
    }, []);


    const data_columns = tabularRepresentationState.filterd_data?.dataframe?.columns;
    const data_rows = tabularRepresentationState.filterd_data?.dataframe?.data;

    const options = {
        selectableRowsHideCheckboxes: true,
        selectableRowsOnClick: false,
        rowsPerPage: 12,
        elevation: 0,
        tableBodyHeight: '74vh',
        fixedHeader: true,
        textLabels: {
            body: {
                noMatch: 'No data to show',
            }
        }
    };


    //! ======  SEARCH PARAMETERS =======
    const [searchQuery, setSearchQuery] = useState({
        "categorical_col": {},
        "numerical_col": {}
    });

    //! ====== SORTING PARAMETERS ======
    const [sortQuery, setSortQuery] = useState({});


    //! ===== FILTERING PARAMETERS ======

    const [filterQuery, setFilterQuery] = useState({ // if end is string 'end' then consider end of the dataframe and do not conisder row_end
        "columns": [], // if filtercolumn length is 0 then consider all the columnns
        "row_start": 0,
        "row_end": tabularRepresentationState.n_rows
    });

    //! ======= FINAL SUBMIT AND OTHERs======

    const handleFinalSubmit = () => {
        // if row_end is not 'end' and is greater than row start then alert that row_start cannot be greater than row_end
        if (filterQuery.row_end !== 'end' && (parseInt(filterQuery.row_end) < parseInt(filterQuery.row_start))) {
            toast('Row start cannot be greater than row end', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return;
        }

        const finalQuery = {
            "dataset_name": selectedDataset,
            "search": searchQuery,
            "sort": sortQuery,
            "filter": filterQuery
        }

        console.log(finalQuery);
        dispatch(getTabularRepresentation(finalQuery));
    }

    return (
        <Box sx={{ flexGrow: 1, width: "100%" }}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Paper elevation={0} sx={{
                                
                                height: "89vh",
                            }}>
                                <Box sx={{
                                    py: "0.1rem",
                                    px: "0.7rem",
                                    height: "81vh",
                                    overflowY: "scroll",
                                    overflow: "auto",
                                    "&::-webkit-scrollbar": { width: "0.6rem", height: "0.6rem", borderRadius: "2rem" },
                                    "&::-webkit-scrollbar-track": { bgcolor: "#f1f1f1",borderRadius: "3rem" },
                                    "&::-webkit-scrollbar-thumb": { bgcolor: "#c1c1c1", borderRadius: "3rem" }
                                }}>
                                    {/* SEARCH  */}
                                    <SearchParameters searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

                                    <Divider sx={{ mt: 5 }} />
                                    {/* SORT  */}
                                    <SortParameters sortQuery={sortQuery} setSortQuery={setSortQuery} />

                                    <Divider sx={{ mt: 5 }} />
                                    {/* FILTER  */}
                                    <FilterParameters filterQuery={filterQuery} setFilterQuery={setFilterQuery} />
                                </Box>

                                <Divider />
                                <Box sx={{ my: "0.8rem", textAlign: 'center',mx:5 }}>
                                    <Button variant='contained' onClick={handleFinalSubmit} fullWidth>
                                        Submit
                                    </Button>
                                </Box>

                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>


                <Grid item xs={8}>
                    <Grid container >
                        <Grid item xs={12}>
                            {
                                tabularRepresentationState.requestStatus === REQUEST_STATUS_LOADING
                                    ? (
                                        <Paper elevation={0}>
                                            <Box sx={{ display: "flex", justifyContent: "center", alignItems: " center", width: "100%", height: "89vh" }}>
                                                <CircularProgress size="4rem" color="inherit" />
                                            </Box>
                                        </Paper>
                                    ) : (
                                        <MUIDataTable
                                            title={<Typography variant="h6" sx={{ fontWeight: 600 }}>Result</Typography>}
                                            data={data_rows}
                                            columns={data_columns}
                                            options={options}
                                        />
                                    )
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </Box>
    )
}

export default TabularRepresentationMainSection;