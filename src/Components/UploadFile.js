import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";

const FileUpload = () => {
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [uploadComplete, setUploadComplete] = useState(false);

  useEffect(() => {
    // Reset state when files change
    setUploadProgress({});
    setUploadComplete(false);
  }, [files]);

  const onDrop = (acceptedFiles) => {
    const updatedFiles = acceptedFiles.map((file) => ({
      file,
      progress: 0,
      completed: false,
    }));
    setFiles([...files, ...updatedFiles]);
    uploadFiles(updatedFiles);
  };

  const uploadFiles = (uploadedFiles) => {
    const totalSteps = 100;

    uploadedFiles.forEach((uploadedFile, index) => {
      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep += 1;
        uploadedFile.progress = (currentStep / totalSteps) * 100;

        if (currentStep === totalSteps) {
          clearInterval(interval);
          uploadedFile.completed = true;
          const updatedFiles = [...files];
          updatedFiles[index] = uploadedFile;
          setFiles(updatedFiles);
          checkAllFilesUploaded();
        } else {
          const updatedFiles = [...files];
          updatedFiles[index] = uploadedFile;
          setFiles(updatedFiles);
        }
      }, 100);
    });
  };

  const removeFile = (index) => {
    const filteredFiles = files.filter((_, i) => i !== index);
    setFiles(filteredFiles);
  };

  const handleViewFile = (file) => {
    // Open the uploaded file in a new tab
    window.open(URL.createObjectURL(file), "_blank");
  };

  const checkAllFilesUploaded = () => {
    const isAllUploaded = files.every((file) => file.completed);
    if (isAllUploaded) {
      setUploadComplete(true);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".pdf",
    disabled: uploadComplete,
    multiple: true, // Allow multiple file uploads
  });

  return (
    <div>
      {!uploadComplete && (
        <div {...getRootProps()} style={dropzoneStyle}>
          <input {...getInputProps()} style={{ width: "20%" }} />
          <p>Drag & drop PDF files here, or click to select PDF files</p>
        </div>
      )}

      {files.map((uploadedFile, index) => (
        <div key={index}>
          {uploadedFile.completed && (
            <div>
              <p>File uploaded successfully: {uploadedFile.file.name}</p>
              <button onClick={() => removeFile(index)}>Remove File</button>
              <button onClick={() => handleViewFile(uploadedFile.file)}>
                View File
              </button>
            </div>
          )}

          {!uploadedFile.completed && (
            <div>
              <p>{uploadedFile.file.name}</p>
              <progress value={uploadedFile.progress} max="100" />
              <p>{uploadedFile.progress.toFixed(2)}%</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const dropzoneStyle = {
  border: "2px dashed #cccccc",
  borderRadius: "4px",
  padding: "20px",
  textAlign: "center",
  cursor: "pointer",
};

export default FileUpload;
