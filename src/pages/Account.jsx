import React, { useEffect, useState } from "react";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";
import DeleteAccount from "../components/account/DeleteAccount";
const Account = () => {
  const axiosPrivate = useAxiosPrivate();
  const [users, setUsers] = useState();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getUser = async () => {
      try {
        const response = await axiosPrivate.get("/user", {
          signal: controller.signal,
        });
        // console.log(response.data);
        isMounted && setUsers(response.data);
      } catch (err) {
        // console.log(err);
        if (!err.name === "AbortError") {
          navigate("/login", { state: { from: location }, replace: true });
        }
      }
    };
    getUser();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      {users && (
        <div className="flex flex-col w-1/2">
          <span className="flex w-full gap-4 items-center">
            <p>Name</p>
            <span>:</span>
            <p>{users.name}</p>
          </span>
          <span className="flex w-full gap-4 items-center">
            <p>Email</p>
            <span>:</span>
            <p>{users.email}</p>
          </span>
          <span className="flex w-full gap-4 items-center">
            <p>Roles</p>
            <span>:</span>
            <span className="flex gap-4">
              {users.role.map((role) => (
                <p key={role}>{role}</p>
              ))}
            </span>
          </span>

          <Button
            className="w-fit min-w-[200px] mt-12 hover:bg-primary-red hover:text-white transition hover:border-primary-red"
            onClick={() => navigate("/change-password")}
          >
            Change Password
          </Button>

          <DeleteAccount />
        </div>
      )}
    </div>
  );
};

export default Account;
