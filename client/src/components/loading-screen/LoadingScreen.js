import loadingIcon from 'assets/icons/play-icon.png';
import './loading-screen.css';
import { useState, useEffect } from 'react';

const LoadingScreen = () => {
  return (
    <div id="LoadingScreen" className="startAnimation">
      <div class="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
