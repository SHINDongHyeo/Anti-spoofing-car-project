import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "./_reducers/user";

const First = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(userActions.loginRequest({ token }));
    } else {
    }
  }, []);
  return <></>;
};

export default First;
