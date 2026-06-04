import React, { useEffect, useState } from "react";

let timerFlag = null;

const Timer = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    timerFlag = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  }, []);
  return (
    <div>
      <p>Seconds: {seconds}</p>
      <button
        onClick={() => {
          clearInterval(timerFlag);
        }}
      >
        Stop Timer
      </button>
    </div>
  );
};

export default Timer;
