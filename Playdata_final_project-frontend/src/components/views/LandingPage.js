import React, { useState } from "react";
import DemoPie from "./Charts/DonutChart";
import Forbidden from "./PageNotFound/Forbidden";
import Mqtt from "./SelectPage/MQTT";
import ReferenceCarAccess from "./ReferencePage/ReferenceCarAccess";
import { useSelector } from "react-redux";
import IntervalFunction from "../IntervalFunction";
import { Result } from "antd";

const LandingPage = () => {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : null
  );

  const { state, globalRoles, userLoginInfos } = useSelector(
    ({ userReducers }) => ({
      state: userReducers?.findparkingaccesscar,
      globalRoles: userReducers?.globalRole,
      userLoginInfos: userReducers?.userLoginInfo,
    })
  );

  if (!token) {
    window.location.href = "/login";
    return <></>;
  }
  if (!userLoginInfos) return <></>;
  if (userLoginInfos.parkingDtoSet[0].parkname === "test") return <></>;
  return (
    <>
      {token ? (
        <div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <ReferenceCarAccess cardata={state} />
          {globalRoles.find((v) => v === "ROLE_ADMIN") && <Mqtt />}
          {true && <IntervalFunction />}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default LandingPage;
