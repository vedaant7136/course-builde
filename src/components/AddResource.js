// src/components/AddResource.js
import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

const AddResource = ({ onAdd }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile.name);
  };

  const handleAddResource = () => {
    if (file) {
      onAdd(file, fileName);
      setFile(null);
      setFileName('');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <input
        type="text"
        placeholder="Enter file name"
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
      />
      <button onClick={handleAddResource}><FaPlus /> Add Resource</button>
    </div>
  );
};

export default AddResource;
