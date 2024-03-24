import React, { useEffect, useState } from "react";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";
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
        console.log(response.data);
        isMounted && setUsers(response.data);
      } catch (err) {
        console.log(err);
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
        <div>
          <h1>{users.username}</h1>
          <h1>{users.email}</h1>
          <h1>
            {users.role.map((role) => (
              <p key={role}>{role}</p>
            ))}
          </h1>
        </div>
      )}
    </div>
  );
};

export default Account;
