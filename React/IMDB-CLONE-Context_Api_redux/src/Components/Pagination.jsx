import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ pageNo, handlePrev, handleNext }) => {
  return (
    <div className="flex justify-center items-center gap-4 p-3 rounded-lg mt-4 bg-gray-700">
      <button
        className="text-white p-2 rounded-full bg-black/50"
        onClick={handlePrev}
      >
        <ChevronLeft />
      </button>
      <div className="text-lg font-semibold mx-4 text-white">{pageNo}</div>
      <button
        className="text-white p-2 rounded-full bg-black/50"
        onClick={handleNext}
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
