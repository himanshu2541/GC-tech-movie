import React, { useEffect, useState } from "react";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";
import DeleteAccount from "../components/account/DeleteAccount";
import { sha256 } from "js-sha256";

const UserCard = ({user}) => {
  const IMG_URL = "https://gravatar.com/avatar/" + sha256(String(user.email).trim().toLowerCase()) + "?d=robohash&s=256"
  return (
    <div className="p-4 font-lg text-2xl flex flex-row">
      <div className="">
        <div className="flex w-full gap-4 items-center mb-4">
          <div className="border-b-4 border-l-4 px-4 py-2 rounded-lg hover:border-b-[2px] hover:border-l-[2px] hover:cursor-pointer hover:mb-[2px] hover:mr-[2px]">{user.name}</div>
        </div>
        <div className="flex w-full gap-4 items-center mb-4">
          <div className="border-b-4 border-l-4 px-4 py-2 rounded-lg hover:border-b-[2px] hover:border-l-[2px] hover:cursor-pointer hover:mb-[2px] hover:mr-[2px]">{user.email}</div>
        </div>
        <div className="flex w-full gap-4 items-center">
          <div className="flex gap-4">
            {user.role.map((role) => (
              <div className="p-2 border-b-4 border-l-4 rounded-lg px-4 hover:border-b-[2px] hover:border-l-[2px] hover:cursor-pointer hover:mb-[2px] hover:mr-[2px]" key={role}>{role}</div>
            ))}
          </div>
        </div>
      </div>
      <div className="ml-[40%]">
        <img src={IMG_URL} alt={`${user.name}`} sizes=""/>
      </div>
    </div>
  )
}

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
          {/*<span className="flex w-full gap-4 items-center">*/}
          {/*  <p>Name</p>*/}
          {/*  <span>:</span>*/}
          {/*  <p>{users.name}</p>*/}
          {/*</span>*/}
          {/*<span className="flex w-full gap-4 items-center">*/}
          {/*  <p>Email</p>*/}
          {/*  <span>:</span>*/}
          {/*  <p>{users.email}</p>*/}
          {/*</span>*/}
          {/*<span className="flex w-full gap-4 items-center">*/}
          {/*  <p>Roles</p>*/}
          {/*  <span>:</span>*/}
          {/*  <span className="flex gap-4">*/}
          {/*    {users.role.map((role) => (*/}
          {/*      <p key={role}>{role}</p>*/}
          {/*    ))}*/}
          {/*  </span>*/}
          {/*</span>*/}
          <UserCard user={users}/>
          <div className="p-4 mt-5">
            <Button
              className="w-fit hover:bg-yellow-500 hover:text-white transition hover:border-yellow-700"
              onClick={() => navigate("/change-password")}
            >
              Change Password
            </Button>
            <DeleteAccount className="w-[25%] mt-2"/>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
