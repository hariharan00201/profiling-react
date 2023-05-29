import React, { useState } from 'react';
import axios from 'axios';
import { createBrowserHistory } from 'history';

const UploadFile = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const history = createBrowserHistory();
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', selectedFile);
    axios.post('http://localhost:8080/upload-file', formData).then((response) => {
      console.log(response.data);
      window.localStorage.setItem("file",response.data);
      window.location = "/charts"
    });
    
  };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type='file' onChange={handleFileSelect} />
                <button type='submit'>Upload</button>
            </form>
        </div>
    );
};


export default UploadFile;