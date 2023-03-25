import React, { useEffect } from 'react';
import { Typography, Button, Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import { toast, Flip } from 'react-toastify';

// Styled Components
import { DropzoneArea } from './UploadDatasetStyles';

// Redux Actions
import { uploadDataset, resetRequestStatus, getAllDatasets } from '/store/datasetSlice';

// Constants
import { REQUEST_STATUS_FAILED, REQUEST_STATUS_SUCCEEDED, MAXIMUM_ALLOWED_DATASETS_PER_USER } from '/constants/Constants';


const UploadDatasetTab = ({ handleModalClose }) => {

  // Dropzone
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({ accept: { 'text/csv': [".csv"] }, maxFiles: 1 });

  // Redux State
  const dispatch = useDispatch();
  const datasetState = useSelector((state) => state.dataset);

  const fileSizeMB = (size) => {
    size = size / (1024 * 1024);
    let sizeIn2Decimal = size.toFixed(2);
    if (sizeIn2Decimal === "0.00") {
      sizeIn2Decimal = "< 0.01";
    }
    return sizeIn2Decimal;
  }

  // Selected Files
  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {fileSizeMB(file.size)} MB
    </li>
  ));

  const toastId = React.useRef(null);

  const clickHandler = async (e) => {
    e.preventDefault();
    await dispatch(uploadDataset({ dataset: acceptedFiles[0], updateProgress: updateProgress }));
    dispatch(getAllDatasets());
  }

  // Update Toast On Progress of Dataset Upload
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
        render: "Uploading : " + Math.round(Math.min(progress, 0.99) * 100) + "%",
        progress: Math.min(progress, 0.99),
      });
    }
  }

  // Update Toast On Success or Failure of Dataset Upload
  useEffect(() => {
    // console.log("datasetState",datasetState);
    if (datasetState.datasetUploadStatus === REQUEST_STATUS_SUCCEEDED) {
      toast.update(toastId.current, {
        render: datasetState.message,
        type: toast.TYPE.SUCCESS,
        transition: Flip,
        hideProgressBar: true
      });
      dispatch(resetRequestStatus());
    } else if (datasetState.datasetUploadStatus === REQUEST_STATUS_FAILED) {
      toast.update(toastId.current, {
        render: datasetState.message,
        type: toast.TYPE.ERROR,
        transition: Flip,
        hideProgressBar: true
      });
      dispatch(resetRequestStatus());
    }
  }, [datasetState.datasetUploadStatus,datasetState.requestStatus])


  return (
    <section className="container"  >

      {/* Check if User has reached the Maximum Allowed Datasets */}
      {datasetState.datasetCount === MAXIMUM_ALLOWED_DATASETS_PER_USER ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "Center", height: "40vh" }}>
          <div>
            <Typography variant="h6" align="center">Cannot Add More than {MAXIMUM_ALLOWED_DATASETS_PER_USER} Datasets</Typography>
            <Typography variant="subtitle1" align="center" > Please Delete few databases to add a New One</Typography>
          </div>
        </Box>
      ) : (

        // Dropzone
        <>
          <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <DropzoneArea>
              <Typography >
                Drag & drop your File here OR Click to a Select File
              </Typography>
            </DropzoneArea>
          </div>

          {/* Selected Files */}
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

          {/* Upload Button */}
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}  >
            <Button onClick={clickHandler} variant="contained" disabled={files.length === 0} >Upload</Button>
          </Box>

        </>
      )}
    </section >
  );
}

export default UploadDatasetTab;