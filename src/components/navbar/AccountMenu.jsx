import React from "react";
import MenuItem from "./MenuItem";
import { useNavigate } from "react-router-dom";
import { axiosPrivate } from "../../api/axios";
import { useAuth } from "../../hooks/useAuth";

const LOGOUT_URL = "refresh-token"; // delete request
const AccountMenu = ({ isOpen }) => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();

  const handleLogout = async () => {
    try {
      await axiosPrivate.delete(LOGOUT_URL, {
        headers: {
          Authorization: `Bearer ${auth?.accessToken}`,
        },
        withCredentials: true,
        credentials: "include",
      });
      setAuth({});
      navigate("/login");
    } catch (error) {
      console.log(error?.message);
    }
  };

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
            <MenuItem
              onClick={handleLogout}
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
