import React, { useState } from "react";
import AccountMenu from "./AccountMenu";

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="flex items-center justify-between p-8 pt-10 w-full ">
      <h1 className="text-red-600 text-4xl font-bold cursor-pointer">KGPLAY</h1>
      <div>
        <button className="text-white pr-4">Favourites</button>
        <button
          className="bg-red-600 px-6 py-2 rounded cursor-pointer relative"
          onClick={() => setOpen(!isOpen)}
        >
          Account
          <div className="absolute w-24 h-32">
            <AccountMenu isOpen={isOpen} />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
