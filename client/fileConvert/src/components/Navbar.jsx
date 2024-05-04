import React from "react";

function Navbar() {
  return (
    <>
      <div className="navbar bg-white px-5 shadow-md border border-b"> 
        <div className="flex-1">
          <a className="font-bold p-2 text-xl text-[#4b42f8]">
            {" "}
            <span className="font-semibold  ">Quick</span>Convert
          </a>
        </div>
        <div className="navbar-end">
          <a className="inline-flex rounded  border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D] mr-2 hover:bg-[#4b42f8] hover:text-white">Log in</a>
        </div>
      </div>
    </>
  );
}

export default Navbar;
