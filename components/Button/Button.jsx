// Button.jsx
import React from "react";

const Button = ({btnName, handleClick, classStyles}) => {
  const buttonStyle = {
    padding: '12px 24px',
    backgroundColor: '#1D4ED8',
    color: '#F9FAFB',
    fontWeight: '500',
    fontSize: '16px',
    border: '1px solid #1D4ED8',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '44px',
    outline: 'none',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    textDecoration: 'none',
    lineHeight: '1.5'
  };

  const handleMouseEnter = (e) => {
    e.target.style.backgroundColor = '#1E40AF';
    e.target.style.borderColor = '#1E40AF';
    e.target.style.boxShadow = '0 4px 12px rgba(29, 78, 216, 0.15)';
  };

  const handleMouseLeave = (e) => {
    e.target.style.backgroundColor = '#1D4ED8';
    e.target.style.borderColor = '#1D4ED8';
    e.target.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)';
  };

  const handleMouseDown = (e) => {
    e.target.style.backgroundColor = '#1E3A8A';
    e.target.style.borderColor = '#1E3A8A';
    e.target.style.transform = 'translateY(1px)';
  };

  const handleMouseUp = (e) => {
    e.target.style.backgroundColor = '#1E40AF';
    e.target.style.borderColor = '#1E40AF';
    e.target.style.transform = 'translateY(0)';
  };

  const handleFocus = (e) => {
    e.target.style.boxShadow = '0 0 0 3px rgba(29, 78, 216, 0.1)';
  };

  const handleBlur = (e) => {
    e.target.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)';
  };

  return (
    <button 
      style={buttonStyle}
      className={classStyles || ''}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {btnName}
    </button>
  );
};

export default Button;