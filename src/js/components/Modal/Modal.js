import React, { useEffect } from 'react';
import Text from '../Text/Text';
import $ from 'jquery';

export default () => {

  useEffect(() => {
    $("#component-modal").hide();
  }, []);
  
  return (
    <div
      className="component-modal-wrapper"
      id="component-modal"
      onClick={() => {
        $("#component-modal").hide();
        console.log("hide modal");
      }}
    >
      <div className="component-modal">
        <Text text={"Hi, I’m Alfy Hushairi. A web developer"} className={'font-overlay-title overlay-title'}/>
        <Text text={"currently working in London, UK."} className={'font-overlay-title'}/>
        <Text text={`Contact me at me@alfyhushairi.com`} className={'font-overlay-subtitle overlay-subtitle'}/>
      </div>
    </div>
  );
};