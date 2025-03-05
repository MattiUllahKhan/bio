// src/components/LoadingOverlay.jsx
import React from 'react';
import './LoadingOverlay.css'; // Create LoadingOverlay.css for styles

const LoadingOverlay = ({ isLoading }) => {
  if (!isLoading) {
    return null;
  }

  return (
    <div className="loading-overlay">
      <div className="loading-spinner"></div>
      <p className="loading-text">Loading Content...</p>
    </div>
  );
};

export default LoadingOverlay;