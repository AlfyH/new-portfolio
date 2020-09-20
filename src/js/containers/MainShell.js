import React, {useState, useEffect, useCallback} from 'react';
import Modal from '../components/Modal/Modal';
import $ from 'jquery';

import PlayerFurniture from '../components/PlayerFurniture/PlayerFurniture';

export default ({ children }) => {
  const [ value, setValue ] = useState(0);
  const [ state, setState] = useState('None');

  const handleScrubStart = x => {
    setValue(x);
    setState('Scrub Start')
  }

  const handleScrubEnd = x => {
    setValue(x);
    setState('Scrub End')
  }

  const handleScrubChange = x => {
    setState('Scrub Change')
  }

  const updateBarOnScroll = useCallback(() => {
    console.log("screen position", $("#outer-wrapper").scrollTop());
    setValue($("#outer-wrapper").scrollTop());
  }, []);

  useEffect(() => {
    document
      .getElementById("outer-wrapper")
      .addEventListener("scroll", updateBarOnScroll);

    return () =>
      document
        .getElementById("outer-wrapper")
        .removeEventListener("scroll", updateBarOnScroll);
  }, [updateBarOnScroll]);

  useEffect(() => {
    // console.log('state', state);
    // console.log("screen position", getScreenPosition());
    // console.log("screen width", getScreenWidth());
    // console.log("bar value", value);
    // console.log("screen percentage", `0${(getScreenPosition() / getScreenWidth()).toFixed(2)} / 01.00`.replace('.', ':'));
  }, [state, value]);

  return (
    <div>
      <Modal />
      {children}
      <PlayerFurniture
        handleScrubStart={handleScrubStart}
        handleScrubEnd={handleScrubEnd}
        handleScrubChange={handleScrubChange}
        value={value}
      />
    </div>
  );
};