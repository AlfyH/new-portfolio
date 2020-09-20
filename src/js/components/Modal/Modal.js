import React, { useEffect } from 'react';
import $ from 'jquery';

export default () => {

  useEffect(() => {
    $("#component-modal").hide();
  }, []);
  
  return (
    <div
      className="component-modal"
      id="component-modal"
      onClick={() => {
        $("#component-modal").hide();
        console.log("hide modal");
      }}
    >
      Modal
    </div>
  );
};