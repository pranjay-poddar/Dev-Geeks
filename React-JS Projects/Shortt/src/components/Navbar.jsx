import React from "react";

export default function Navbar() {
  return (
    <div>
      <div className="">
        <nav className="p-4">
          <ul className="flex justify-between">
            <div>
              <li className="mt-1 font-[roboto] ml-5 text-5xl">Shortt.</li>
            </div>
            <div className="">
              <a href="mailto:tayyabilyas963@gmail.com">
                <button className="bg-blue-700 hover:bg-[#0099ff] rounded-3xl text-white font-[Poppins] text-xl mt-2 mr-5 px-4 py-2">
                  <li className="">Contact</li>
                </button>
              </a>
            </div>
          </ul>
        </nav>
      </div>
    </div>
  );
}
