import React from 'react';
import Home from './js/pages/Home/Home';
import About from "./js/pages/About/About";
import Portfolio from "./js/pages/Portfolio/Portfolio";
import Contact from "./js/pages/Contact/Contact";

export default () => {

  return (
    <div className="outer-wrapper" id="outer-wrapper">
      <div className="inner-wrapper" id="inner-wrapper">
        <Home />
        <About />
        <Portfolio />
        <Contact />
      </div>
    </div>
  );
};

