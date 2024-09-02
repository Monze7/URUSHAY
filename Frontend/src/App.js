// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Upload from './components/Upload';
import SavedDocuments from './components/SavedDocuments';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="upload" element={<Upload />} />
          <Route path="saved" element={<SavedDocuments />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
