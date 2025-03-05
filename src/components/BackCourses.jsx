import React from "react";
import { useNavigate } from "react-router-dom";
import { IoCaretBack } from "react-icons/io5";


const BackButton = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Navigates to the previous page in history
  };

  return (
    <button onClick={handleBackClick} style={buttonStyle} className='pt-32 ml-2 mr-2 border-2 border-red-500 shadow-custom-red'>
      <div className="flex items-center justify-evenly font-extrabold"><IoCaretBack />Back</div>
    </button>
  );
};

const buttonStyle = {
  padding: "6px 12px",
  fontSize: "12px",
  cursor: "pointer",
  
  color: "red",
  
  borderRadius: "5px",
};

export default BackButton;
