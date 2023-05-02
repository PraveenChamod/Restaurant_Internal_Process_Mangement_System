import React from 'react';
import preloaderGif from '../../Images/Preloader/Welcome.gif';
import * as l from './PreloaderElements'
const Preloader = () => {
  return (
    <l.Div>
      <l.GIF src={preloaderGif} alt="Loading..." />
    </l.Div>
  );
};

export default Preloader;
