// src/components/Upload.js
import React, { useState } from 'react';
import './Upload.css';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (
      selectedFile &&
      (selectedFile.type === 'application/pdf' ||
        selectedFile.type.startsWith('image/'))
    ) {
      setFile(selectedFile);
      setErrorMessage('');
    } else {
      setErrorMessage('Only PDF or image files are allowed.');
      setFile(null);
    }
  };

  const handleUpload = () => {
    if (file) {
      console.log('Uploading:', file);
      // Implement the upload logic here
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload from System</h2>
      <input type="file" onChange={handleFileChange} />
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <button onClick={handleUpload} disabled={!file}>
        Upload
      </button>
    </div>
  );
};

export default Upload;
