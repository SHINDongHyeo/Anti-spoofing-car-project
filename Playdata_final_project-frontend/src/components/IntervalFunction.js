import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  findParkInDetectedAPI,
  findparkingaccesscarAPI,
  userActions,
} from "../_reducers/user";
import { client } from "../constant/client";
import useInterval from "../hooks/useInterval";

const IntervalFunction = () => {
  const [count, setCount] = React.useState({});
  const [delay, setDelay] = useState(25000);
  const dispatch = useDispatch();
  const { findparkingaccesscar } = useSelector((state) => state.userReducers);
  const handler = () => {
    dispatch(findparkingaccesscarAPI());
  };

  const sref = useRef(false);

  useEffect(() => {
    if (sref.current) {
      console.log("findparkingaccesscar::2", findparkingaccesscar);
      dispatch(userActions.setCaraccessRequest(findparkingaccesscar));
      dispatch(findParkInDetectedAPI());
    } else {
      console.log("findparkingaccesscar::1", findparkingaccesscar);
      sref.current = true;
    }
  }, [findparkingaccesscar]);

  const ref = useRef();

  const intervalHandler = useInterval(handler, delay);

  useEffect(() => {
    handler();
    return () => {
      setDelay(0);
    };
  }, []);

  return <></>;
};

export default IntervalFunction;
