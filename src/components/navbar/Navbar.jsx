import React, { useState } from "react";
import AccountMenu from "./AccountMenu";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SearchBar from "./searchbar/Search2";
const Navbar = () => {
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between px-4 py-2 sm:px-6 lg:px-8 w-full absolute top-0 z-50 shadow- border-none">
      <div className="flex items-center justify-start  max-w-6xl gap-16 ">
        <div
          className="text-red-600  font-bold cursor-pointer flex items-center "
          onClick={() => navigate("/")}
        >
          <span className="text-5xl">K</span>
          <span className="text-[43px]">G</span>
          <span className="text-[38px]">P</span>
          <span className="text-[38px]">L</span>
          <span className="text-[43px]">A</span>
          <span className="text-5xl">Y</span>
        </div>
        <SearchBar />
      </div>

      <div className="flex">
        <FaRegUserCircle
          size={35}
          className="cursor-pointer relative"
          onClick={() => setOpen(!isOpen)}
        />
        <div className="absolute right-0 mt-10 z-50">
          <AccountMenu isOpen={isOpen} setOpen={setOpen} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
