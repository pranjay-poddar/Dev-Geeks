import React from "react";
import { useState } from "react";

const Input = ({ setInputValue }) => {
  const [value, setValue] = useState("");
  const handleClick = () => {
    setInputValue(value);
    setValue("");
  };
  return (
    <div>
      <div className="flex justify-center">
        <div className="">
          <div className="font-[roboto] flex justify-center">
            <p className="mt-3  text-4xl">Enter a URL</p>
          </div>
          <div className="font-[poppins] flex justify-center">
            <input
              value={value}
              type="text"
              onChange={e => setValue(e.target.value)}
              className="border border-gray-500 mt-3 rounded-lg p-1 w-[30vw]"
            />
          </div>

          <div className="flex font-[poppins] justify-center">
            <button
              onClick={handleClick}
              className="bg-blue-700 hover:bg-[#0099ff] text-white px-4 py-2 rounded-3xl mt-3"
            >
              Shorten
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Input;
