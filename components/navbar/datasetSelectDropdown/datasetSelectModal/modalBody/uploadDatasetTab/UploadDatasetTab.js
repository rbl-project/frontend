import React from 'react'
import Dropzone from 'react-dropzone'

const UploadDatasetTab = () => {
    const getUploadParams = ({ meta }) => {
      const url = 'https://httpbin.org/post'
      return { url, meta: { fileUrl: `${url}/${encodeURIComponent(meta.name)}` } }
    }
  
    const handleChangeStatus = ({ meta }, status) => {
      console.log(status, meta)
    }
  
    const handleSubmit = (files, allFiles) => {
      console.log(files.map(f => f.meta))
      allFiles.forEach(f => f.remove())
    }
  
    return (
      <Dropzone
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        onSubmit={handleSubmit}
        accept=".csv"
        inputContent={(files, extra) => (extra.reject ? 'Image, audio and video files only' : 'Drag Files')}
        styles={{
          dropzoneReject: { borderColor: 'red', backgroundColor: '#DAA' },
          inputLabel: (files, extra) => (extra.reject ? { color: 'red' } : {}),
        }}
      />
    )
  }

export default UploadDatasetTab;