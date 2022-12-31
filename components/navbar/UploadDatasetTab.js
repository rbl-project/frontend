import React, { useEffect } from 'react';
import { Typography, Button, Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import { DropzoneArea } from './uploadDatasetStyles';
import { toast, Flip } from 'react-toastify';

import { uploadDataset , resetRequestStatus} from '/store/datasetSlice';
import { REQUEST_STATUS_FAILED, REQUEST_STATUS_SUCCEEDED } from '/constants/Constants';

const UploadDatasetTab = ({ handleModalClose }) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({ accept: { 'text/csv': [".csv"] }, maxFiles: 1 });
  const dispatch = useDispatch();

  const datasetState = useSelector((state) => state.dataset);

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {(file.size/(1024*1024)).toFixed(2)} MB
    </li>
  ));

  const toastId = React.useRef(null);

  const clickHandler = (e) => {
    e.preventDefault();
    dispatch(uploadDataset({ dataset: acceptedFiles[0], updateProgress: updateProgress }));
    // handleModalClose();
  }

  const updateProgress = (data) => {
    const progress = data.loaded / data.total;

    // check if we already displayed a toast
    if (toastId.current === null) {
      toastId.current = toast.info('Progress', {
        position: "bottom-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: Math.min(progress, 0.99),
        theme: "dark",
      });
    } else {
      toast.update(toastId.current, {
        render: "Uploading : " + Math.round(Math.min(progress, 0.99)*100) + "%",
        progress: Math.min(progress, 0.99),
      });
    }
  }

  // Update Toast On Success or Failure of Dataset Upload
  useEffect(() => {
    // console.log(datasetState);
    if (datasetState.datasetUploadStatus === REQUEST_STATUS_SUCCEEDED) {
      toast.update(toastId.current,{
        render:datasetState.message,
        type: toast.TYPE.SUCCESS,
        transition: Flip,
        hideProgressBar: true
      });
      dispatch(resetRequestStatus());
    } else if (datasetState.datasetUploadStatus === REQUEST_STATUS_FAILED) {
      toast.update(toastId.current,{
        render: datasetState.message,
        type: toast.TYPE.ERROR,
        transition: Flip,
        hideProgressBar: true
      });
      dispatch(resetRequestStatus());
    }
  }, [datasetState.datasetUploadStatus])


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