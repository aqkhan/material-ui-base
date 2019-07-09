import React, { useCallback } from 'react';
import Title from './Title';
// Drag n Drop
import {useDropzone} from 'react-dropzone';
import Typography from '@material-ui/core/Typography';

const PaperDropZone = () => {
    const onDrop = useCallback(acceptedFiles => {
      console.log('Idhor: ', acceptedFiles);
    }, [])
    const {getRootProps, getInputProps, isDragActive, isDragReject} = useDropzone({onDrop})
  
    return (
        <>
            <Title>Drag & Drop Files</Title>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div style={{ minHeight: 300, padding: 15, border: '5px dotted #00518957' }}>
                    <Typography variant="body2" color="textSecondary" align="center">
                    {!isDragActive && 'Click here or drop a file to upload!'}
                    {isDragActive && !isDragReject && "Drop it like it's hot!"}
                    </Typography>
                </div>
            </div>
        </>
    )
}

export default PaperDropZone;