import { Loader } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div>
      <div className="flex justify-center items-center h-[70vh]">
        <div className="flex flex-col justify-center items-center">
          <Loader className="animate-spin" size={60} />
          <p className="text-center text-gray-600 text-lg animate-pulse">
            Loading tasks...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
