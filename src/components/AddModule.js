// src/components/AddModule.js
import React, { useState } from 'react';

const AddModule = ({ onAdd }) => {
  const [moduleName, setModuleName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(moduleName);
    setModuleName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={moduleName}
        onChange={(e) => setModuleName(e.target.value)}
        placeholder="New Module Name"
        required
      />
      <button type="submit">Add Module</button>
    </form>
  );
};

export default AddModule;
