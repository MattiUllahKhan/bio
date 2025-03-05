// components/Loading.js
import React from 'react';
import './Loading.css'; // Import your custom styles

const Loading = () => {
  return (
      <div className="loading-overlay">
          <div className="spinner"></div>
      </div>
  );
};

export default Loading;