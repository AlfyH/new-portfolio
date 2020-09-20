import React, { useEffect, useState, useRef, useCallback } from 'react';
import $ from 'jquery';

const clamp = (min, max, val) => Math.min(Math.max(min, val), max);
const round = (val, dp) => parseFloat(val.toFixed(dp));

export default ({
  onScrubStart,
  onScrubChange,
  onScrubEnd,
  min=0,
  max=100,
  className, 
  value=0
 }) => {
  const [ mouseX, setMouseX ] = useState(null);
  const [ touchX, setTouchX] = useState(null);
  const [ seeking , setSeeking] = useState(false);
  const [ touchId, setTouchId] = useState(false);
  const [ valuePercent, setValuePercent ] = useState(0);
  const barRef = useRef();
  const classes = ['scrubber', 'horizontal'];

  const getPositionFromMouseX = useCallback(() => {
    const barDomNode = barRef.current;
    if (!barDomNode) {
      return 0;
    }
    const { left, width } = barDomNode.getBoundingClientRect();
    const cursor = typeof touchX === 'number' ? touchX : mouseX || 0;
    const clamped = clamp(left, left + width, cursor);
    const decimal = round((clamped - left) / width, 7);
    return round((max - min) * decimal, 7);
  }, [max, min, mouseX, touchX]);

  const getPositionFromCursor = useCallback(() => {
    return getPositionFromMouseX();
  },[getPositionFromMouseX]);

  const handleMouseMove = useCallback(e => {
    setMouseX(e.pageX);
    if (seeking && onScrubChange) {
        console.log("mousemove", seeking, e.pageX);
      onScrubChange(getPositionFromCursor());
    }
  }, [getPositionFromCursor, onScrubChange, seeking]);

  const handleTouchMove = useCallback(e => {
    if (seeking) {
      e.preventDefault();
    }

    const touch = Array.from(e.changedTouches).find(t => t.identifier === touchId);
    if (touch) {
      setTouchX(e.pageX);
      if (seeking && onScrubChange) {
        onScrubChange(getPositionFromCursor());
      }
    }
  }, [getPositionFromCursor, onScrubChange, seeking, touchId]);

  const handleSeekStart = useCallback(e => {
    setSeeking(true);
    setMouseX(e.pageX);
    if (onScrubStart) {
      onScrubStart(getPositionFromCursor());
    }
  }, [getPositionFromCursor, onScrubStart]);

  const handleSeekEnd = useCallback(() => {
    if (seeking) {
      if (onScrubEnd) {
        onScrubEnd(getPositionFromCursor());
      }
      setSeeking(false);
      setMouseX(null);
      $("#outer-wrapper").scrollTop((getPositionFromCursor()));
      // console.log('position', $("#outer-wrapper").scrollTop());
      // console.log("screen width", $("#inner-wrapper").width()*2/3);
    }
  }, [getPositionFromCursor, onScrubEnd, seeking]);

  const handleTouchStart = useCallback(e => {
    const touch = e.changedTouches[0];
    setSeeking(true);
    setTouchId(touch.identifier);
    setTouchX(touch.pageX);
    if (onScrubStart) {
      onScrubStart(getPositionFromCursor());
    }
  }, [getPositionFromCursor, onScrubStart]);

  const handleTouchEnd = useCallback(e => {
    const touch = Array.from(e.changedTouches).find(t => t.identifier === touchId);
    if (touch && seeking) {
      if (onScrubEnd) {
        onScrubEnd(getPositionFromCursor());
      }
      setSeeking(false);
      setTouchX(null);
      setTouchId(null);
    }
  },[getPositionFromCursor, onScrubEnd, seeking, touchId]);

  const getValuePercent = useCallback(values => {
    return ((clamp(min, max, values) / (max - min)) * 100).toFixed(5);
  }, [max, min]);

  useEffect(() => {
    setValuePercent(getValuePercent(value))
  }, [getValuePercent, value]);


  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleSeekEnd);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleSeekEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    }
  }, [handleMouseMove, handleSeekEnd, handleTouchEnd, handleTouchMove]);

  useEffect(() => {
    if (seeking) classes.push('seeking');
  }, [classes, seeking]);

  useEffect(() => {
    if (className) classes.push(className);
  }, [className, classes]);

  return (
    <div
      onMouseDown={handleSeekStart}
      onTouchStart={handleTouchStart}
      onTouchEnd={(e) => e.preventDefault()}
      // onMouseOver={() => setHover(true)}
      // onMouseLeave={() => setHover(false)}
      className={classes.join(" ")}
    >
      <div className="bar" ref={barRef}>
        <div className="bar__progress" style={{ width: `${valuePercent}%` }} />
        <div className="bar__thumb" style={{ left: `${valuePercent}%` }} />
      </div>
    </div>
    // <div className="player-bar">
    //   <div
    //     className={"progress-bar"}
    //     style={{ width: progressPercentage }}
    //   />
    //   <div className="progress-thumb" style={{ left: progressPercentage }} />
    // </div>
  );
};