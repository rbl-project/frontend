import React from 'react';
import { Typography,Button,Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import { DropzoneArea } from './uploadDatasetStyles';

import { uploadDataset } from '/store/datasetSlice';

const UploadDatasetTab = ({handleModalClose}) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({accept:{'text/csv':[".csv"]}, maxFiles:1});
  const dispatch = useDispatch();

  const datasetState = useSelector((state) => state.dataset);
  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const clickHandler = (e) => {
    e.preventDefault();
    dispatch(uploadDataset({dataset:acceptedFiles[0]}));
    handleModalClose();
  }

  console.log(datasetState);

  return (
    <section className="container"  >
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <DropzoneArea>
          <Typography >
            Drag & drop your File here OR Click to a Select File
          </Typography>
        </DropzoneArea>
      </div>
      <aside>
        <h4>Selected File :</h4>
        <ul>
          {files.length === 0 ? (
            <li>No File Selected</li>
          ) : (
            files
          )}
        </ul>
      </aside>
      <Box sx={{display:"flex",justifyContent:"flex-end"}}  >
        <Button onClick={clickHandler} variant="contained" disabled={files.length === 0} >Upload</Button>
      </Box>
    </section>
  );
}

export default UploadDatasetTab;