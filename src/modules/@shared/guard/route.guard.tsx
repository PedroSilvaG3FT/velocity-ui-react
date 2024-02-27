import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import store, { RootState } from "../../../store";

const RouteGuardWrapper: React.FC = () => {
  const navigate = useNavigate();
  const { userData } = useSelector((state: RootState) => state.auth);

  const checkUserToken = () => {
    const { token } = store.getState().auth;

    if (token) navigate(`/chat`);
    else navigate(`/auth/sign-in`);
  };

  useEffect(() => {
    checkUserToken();
  }, [userData]);

  return <Outlet />;
};

export default RouteGuardWrapper;
