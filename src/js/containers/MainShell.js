import React, {useState, useEffect} from 'react';
import $ from 'jquery';
import PlayerBar from '../components/PlayerBar/PlayerBar';

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

  useEffect(() => {
    console.log('state', state);
    console.log('value', value);
  }, [state, value]);

  return (
    <div>
      {children}
      <div className="player-bar-wrapper">
        <PlayerBar
          min={0}
          max={($("#inner-wrapper").width() * 2) / 3}
          value={value}
          onScrubStart={handleScrubStart}
          onScrubEnd={handleScrubEnd}
          onScrubChange={handleScrubChange}
        />
      </div>
    </div>
  );
};