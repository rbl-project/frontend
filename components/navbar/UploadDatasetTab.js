import React, { useEffect } from 'react';
import { Typography, Button, Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import { DropzoneArea } from './uploadDatasetStyles';
import { toast, Rotate } from 'react-toastify';

import { uploadDataset } from '/store/datasetSlice';
import { REQUEST_STATUS_FAILED, REQUEST_STATUS_SUCCEEDED } from '/constants/Constants';

const UploadDatasetTab = ({ handleModalClose }) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({ accept: { 'text/csv': [".csv"] }, maxFiles: 1 });
  const dispatch = useDispatch();

  const datasetState = useSelector((state) => state.dataset);

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const toastId = React.useRef(null);

  const clickHandler = (e) => {
    e.preventDefault();
    dispatch(uploadDataset({ dataset: acceptedFiles[0], updateProgress: updateProgress }));
    handleModalClose();
  }


  useEffect(() => {
    console.log("In useeffcet", datasetState);
    if (datasetState.datasetStatus === REQUEST_STATUS_SUCCEEDED) {
      console.log("Success");
      toast.update(toastId.current, "Upload Successful", {
        type: toast.TYPE.SUCCESS,
        transition: Rotate,
        position: "bottom-right",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });

    } else if (datasetState.datasetStatus === REQUEST_STATUS_FAILED) {
      toast.update(toastId.current, "Upload Unsuccessful", {
        type: toast.TYPE.ERROR,
        transition: Rotate,
        position: "bottom-right",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
    }
  }, [datasetState.datasetStatus])


  const updateProgress = (data) => {
    const progress = data.loaded / data.total;

    // check if we already displayed a toast
    if (toastId.current === null) {
      toastId.current = toast.info('Upload in Progress', {
        position: "bottom-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        // progress: Math.min(progress, 1 - Number.MIN_VALUE),
        progress: progress,
        theme: "dark",
      });
    } else {

      toast.update(toastId.current, {
        position: "bottom-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        // progress: Math.min(progress, 1 - Number.MIN_VALUE),
        progress: progress,
        theme: "dark",
      });
    }
  }

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
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}  >
        <Button onClick={clickHandler} variant="contained" disabled={files.length === 0} >Upload</Button>
      </Box>
    </section>
  );
}

export default UploadDatasetTab;