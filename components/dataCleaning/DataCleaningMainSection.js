import React from 'react'

// material-ui
import { 
    Box,
    Paper,
    Typography,
    Button,
    Grid,
    TextField,
 } from '@mui/material';

 import { styled } from '@mui/material/styles';
 
 const Item = styled(Paper)(({ theme }) => ({
     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
     ...theme.typography.body2,
     padding: theme.spacing(1),
     textAlign: 'center',
     color: theme.palette.text.secondary,
   }));

const DataCleaningMainSection = () => {


    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Item>
                        <Typography variant="h6" component="div" gutterBottom>Parameters</Typography>
                    </Item>
                </Grid>
                <Grid item xs={12} >
                    <Item>
                        <Typography variant="h6" component="div" gutterBottom>Result</Typography>
                    </Item>
                </Grid>
            </Grid>
        </Box>
    )
}

export default DataCleaningMainSection;