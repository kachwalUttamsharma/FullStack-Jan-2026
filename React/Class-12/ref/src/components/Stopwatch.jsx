// Create a stopwatch application using React.
// The stopwatch should have the following features:

// Start the timer.
// Stop the timer.
// Reset the timer.
// Display the elapsed or current time in a format of hours:minutes:seconds.
// 00:00:00
// 00:00:01
import React, { useState, useEffect, useRef, useCallback } from "react";

const Stopwatch = () => {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  let timerFlag = useRef(null);
  useEffect(() => {
    timerFlag.current = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);

    return () => {
        clearInterval(timerFlag?.current);
    };
  }, []);

  const formatTime = useCallback((timeInSeconds) => {
    const seconds = timeInSeconds % 60;
    const minutes = timeInSeconds / 60;
    const hours = timeInSeconds / (60 * 60);
    return `${String(Math.floor(hours)).padStart(2, "0")}
        :${String(Math.floor(minutes)).padStart(2, "0")}
        :${String(seconds).padStart(2, "0")}`;
  }, []);

  const handleStart = useCallback(() => {
    timerFlag.current = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
    setIsRunning(true);
  },[]);

  const handleStop = useCallback(() => {
    clearInterval(timerFlag.current);
    setIsRunning(false);
  },[]);

  const handleReset = useCallback(() => {
    setTimer(0);
  },[]);

  return (
    <div>
      <h1>Stopwatch</h1>
      <h2>{formatTime(timer)}</h2>
      <button onClick={handleStart} disabled={isRunning}>Start</button>
      <button onClick={handleStop} disabled={!isRunning}>Stop</button>
      <button onClick={handleReset} disabled={timer === 0 ? true : false}>Reset</button>
    </div>
  );
};

export default Stopwatch;
