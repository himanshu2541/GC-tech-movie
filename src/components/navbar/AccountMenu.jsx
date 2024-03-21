import React from "react";
import MenuItem from "./MenuItem";
import { useNavigate } from "react-router-dom";

const AccountMenu = ({isOpen}) => {
  const navigate = useNavigate();

  return (
    <div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-40 right-2 bg-white overflow-hidden top-4 text-sm">
          <div
            className="
            flex
            flex-col
            cursor-pointer
          "
          >
            <MenuItem onClick={() => {navigate('/login')}} label="Log out" className={'text-primary-red'}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountMenu;
