// src/App.js
import React from 'react';
import CourseBuilder from './components/CourseBuilder';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Course Builder Application</h1>
      </header>
      <CourseBuilder />
    </div>
  );
}

export default App;
