// NavigationBar.js
import React from 'react';
import './NavigationBar.css';

const NavigationBar = () => {
  const handleHomeClick = () => {
    // Add functionality for the Home button here
    console.log('Home clicked');
  };

  const handleUserAccountClick = () => {
    // Add functionality for the User Account button here
    console.log('User Account clicked');
  };

  return (
    <nav className="navigation-bar">
      <div className="left-section" onClick={handleHomeClick}>
        Home
      </div>
      <span className="separator">|</span>
      <div className="right-section" onClick={handleUserAccountClick}>
        User Account
      </div>
    </nav>
  );
};

export default NavigationBar;
