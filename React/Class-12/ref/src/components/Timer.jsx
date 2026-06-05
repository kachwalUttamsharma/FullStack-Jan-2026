import React, { useEffect, useState, useRef } from "react";

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  // between multiple re-renders, it will maintain the same reference and value
  const timerId = useRef(null);
  useEffect(() => {
    timerId.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(timerId.current);
    }
  }, []);
  return (
    <div>
      <p>Seconds: {seconds}</p>
      <button
        onClick={() => {
          clearInterval(timerId.current);
        }}
      >
        Stop Timer
      </button>
    </div>
  );
};

export default Timer;
