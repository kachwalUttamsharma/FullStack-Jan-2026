import React from "react";
import { LoaderCircle } from "lucide-react";

const Spinner = () => {
  return (
    <div className="fixed top-1/2 left-1/2">
      <LoaderCircle strokeWidth={2} size={64} color="#2b7fff" />
    </div>
  );
};

export default Spinner;
