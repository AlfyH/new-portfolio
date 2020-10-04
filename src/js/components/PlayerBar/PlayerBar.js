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
  value=0
 }) => {
   const [mouseX, setMouseX] = useState(null);
   const [touchX, setTouchX] = useState(null);
   const [seeking, setSeeking] = useState(false);
   const [touchId, setTouchId] = useState(false);
   const [valuePercent, setValuePercent] = useState(0);
   const barRef = useRef();

   const getPositionFromMouseX = useCallback(() => {
     const barDomNode = barRef.current;
     if (!barDomNode) {
       return 0;
     }
     const { left, width } = barDomNode.getBoundingClientRect();
     const cursor = typeof touchX === "number" ? touchX : mouseX || 0;
     const clamped = clamp(left, left + width, cursor);
     const decimal = round((clamped - left) / width, 7);
     return round((max - min) * decimal, 7);
   }, [max, min, mouseX, touchX]);

   const getPositionFromCursor = useCallback(() => {
     return getPositionFromMouseX();
   }, [getPositionFromMouseX]);

   const getValuePercent = useCallback(
     (values) => {
       return ((clamp(min, max, values) / (max - min)) * 100).toFixed(5);
     },
     [max, min]
   );


   /* -------Start Mouse--------- */

   const handleMouseMove = useCallback(
     (e) => {
       setMouseX(e.pageX);
       if (seeking && onScrubChange) {
         onScrubChange(getPositionFromCursor());
         if (onScrubStart) {
           onScrubStart(getPositionFromCursor());
         }
         if (onScrubEnd) {
           onScrubEnd(getPositionFromCursor());
         }
         $("#outer-wrapper").scrollTop(getPositionFromCursor());
       }
     },
     [getPositionFromCursor, onScrubChange, onScrubEnd, onScrubStart, seeking]
   );

   const handleSeekStart = useCallback(
     (e) => {
       setSeeking(true);
       if (onScrubStart) {
         onScrubStart(getPositionFromCursor());
       }
     },
     [getPositionFromCursor, onScrubStart]
   );

   const handleSeekEnd = useCallback(() => {
     if (seeking) {
       if (onScrubEnd) {
         onScrubEnd(getPositionFromCursor());
       }
       setSeeking(false);
       $("#outer-wrapper").scrollTop(getPositionFromCursor());
     }
   }, [getPositionFromCursor, onScrubEnd, seeking]);

   /* -------End Mouse--------- */
   /* -------Start Touch--------- */

   const handleTouchMove = useCallback(
     (e) => {
       if (seeking) {
         e.preventDefault();
       }

       const touch = Array.from(e.changedTouches).find(
         (t) => t.identifier === touchId
       );
       if (touch) {
         setTouchX(e.pageX);
         if (seeking && onScrubChange) {
           onScrubChange(getPositionFromCursor());
         }
       }
     },
     [getPositionFromCursor, onScrubChange, seeking, touchId]
   );

   const handleTouchStart = useCallback(
     (e) => {
       const touch = e.changedTouches[0];
       setSeeking(true);
       setTouchId(touch.identifier);
       setTouchX(touch.pageX);
       if (onScrubStart) {
         onScrubStart(getPositionFromCursor());
       }
     },
     [getPositionFromCursor, onScrubStart]
   );

   const handleTouchEnd = useCallback(
     (e) => {
       const touch = Array.from(e.changedTouches).find(
         (t) => t.identifier === touchId
       );
       if (touch && seeking) {
         if (onScrubEnd) {
           onScrubEnd(getPositionFromCursor());
         }
         setSeeking(false);
         setTouchX(null);
         setTouchId(null);
       }
     },
     [getPositionFromCursor, onScrubEnd, seeking, touchId]
   );

   /* -------End Touch--------- */

   useEffect(() => {
     setValuePercent(getValuePercent(value));
   }, [getValuePercent, value]);

   useEffect(() => {
     window.addEventListener("mousemove", handleMouseMove);
     window.addEventListener("mouseup", handleSeekEnd);
     window.addEventListener("touchmove", handleTouchMove);
     window.addEventListener("touchend", handleTouchEnd);
     return () => {
       window.removeEventListener("mousemove", handleMouseMove);
       window.removeEventListener("mouseup", handleSeekEnd);
       window.removeEventListener("touchmove", handleTouchMove);
       window.removeEventListener("touchend", handleTouchEnd);
     };
   }, [handleMouseMove, handleSeekEnd, handleTouchEnd, handleTouchMove]);

   return (
     <div
       onMouseDown={handleSeekStart}
       onTouchStart={handleTouchStart}
       onTouchEnd={(e) => e.preventDefault()}
       // onMouseOver={() => setHover(true)} //TODO add hover class
       // onMouseLeave={() => setHover(false)} //TODO remove hover class
       className={"scrubber"}
     >
       <div id={"bar"} ref={barRef}>
         <div id="bar-progress" style={{ width: `${valuePercent}%` }} />
         <div id="bar-thumb" style={{ left: `${valuePercent}%` }} />
       </div>
     </div>
   );
 };