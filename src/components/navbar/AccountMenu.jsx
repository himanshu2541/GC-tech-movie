import React from "react";
import MenuItem from "./MenuItem";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const AccountMenu = ({ isOpen }) => {
  const navigate = useNavigate();

  return (
    <div>
      {isOpen && (
        <div className="absolute shadow-md w-36 right-6 top-4 text-xs">
          <div
            className="
            flex
            flex-col gap-1
            z-40
          "
          >
            <MenuItem
              onClick={() => {}}
              label="Profile"
              className={"text-primary-red"}
            />
            <MenuItem
              onClick={() => {}}
              label="Change Password"
              className={"text-primary-red"}
            />
            <MenuItem
              onClick={() => {
                navigate("/login");
                Cookies.remove("token", { path: "" }); // removed!
              }}
              label="Log out"
              className={"text-primary-red"}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountMenu;
