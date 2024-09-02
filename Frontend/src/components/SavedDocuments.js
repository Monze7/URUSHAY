// src/components/SavedDocuments.js
import React from 'react';
import './SavedDocuments.css';

const SavedDocuments = () => {
  const documents = [
    { name: 'Document 1', date: '2024-09-01' },
    { name: 'Photo 1', date: '2024-08-28' },
    // Add more documents as needed
  ];

  return (
    <div className="saved-documents-container">
      <h2>Saved Documents</h2>
      <ul>
        {documents.map((doc, index) => (
          <li key={index}>
            {doc.name} <span className="doc-date">{doc.date}</span>
            <button className="view-button">View</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedDocuments;
