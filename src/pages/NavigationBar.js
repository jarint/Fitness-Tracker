// NavigationBar.js
import React, { useState } from 'react';
import Home from '../Homepage';
import './NavigationBar.css';

const NavigationBar = () => {

  const handleUserAccountClick = () => {
    // Add functionality for the User Account button here
    console.log('User Account clicked');
  };

  return (
    <nav className="navigation-bar">
      <div className="left-section" >
        Home
      </div>

    </nav>
  );
};

export default NavigationBar;
