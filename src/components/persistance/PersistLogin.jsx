import { Outlet } from "react-router-dom";
import React, { useState, useEffect } from "react";

import useRefreshToken from "../../hooks/useRefreshToken";
import { useAuth } from "../../hooks/useAuth";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.log(error?.message);
      } finally {
        setIsLoading(false);
      }
    };

    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  // useEffect(() => {
  //   console.log({ isLoading });
  //   console.log(`at: ${JSON.stringify(auth?.accessToken)}`);
  // }, [isLoading]);

  return <>{isLoading ? <p>Loading...</p> : <Outlet />}</>;
};

export default PersistLogin;