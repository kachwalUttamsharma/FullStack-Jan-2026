import React from "react";
import { useRef } from "react";

const RefExample = () => {
  const inputRef = useRef();
  const focusInput = () => {
    // document.querySelector("input").focus();
    console.log(inputRef);
    console.log(inputRef?.current);
    inputRef.current.value = "arun";
    inputRef.current.focus();
  };
  return (
    <div>
      <input type="text" ref={inputRef} />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
};

export default RefExample;
