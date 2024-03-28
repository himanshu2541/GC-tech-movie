import React, { useState } from "react";
import AccountMenu from "./AccountMenu";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SearchBar from "./searchbar/Search2";
const Navbar = () => {
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between pl-10 pr-16 pt-10 w-full absolute top-0 z-[2000]">
      <h1
        className="text-red-600 text-4xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        KGPLAY
      </h1>
      <SearchBar />
      <div>
        <FaRegUserCircle
          size={35}
          className="cursor-pointer relative"
          onClick={() => setOpen(!isOpen)}
        />
        <div className="absolute right-10">
          <AccountMenu isOpen={isOpen} setOpen={setOpen} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
