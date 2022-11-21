/*eslint-disable */
import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
//import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from "./components/views/LoginPage/LoginPage";
import Landing2 from "./components/views/LandingPage/Landing2";
import DevingPage from "./components/views/PageNotFound/DevingPage";
//import Auth from './hoc/auth';
import NavBar from "./components/views/NavBar/NavBar";
import Register from "./components/views/RegisterPage/Register";
import Aside from "./components/Aside";
import styled, { createGlobalStyle } from "styled-components";
import RegisterPark from "./components/views/RegisterPage/RegisterPark";
import ReferencePark from "./components/views/ReferencePage/ReferencePark";
import SearchAllUser from "./components/views/ReferencePage/AllRefernce";
import LoginReal from "./components/views/LoginPage/LoginReal";
import UserUpdate from "./components/views/RegisterPage/UserUpdate copy";
import RegisterGroup from "./components/views/RegisterPage/RegisterGroup";
import SearchAllGroups from "./components/views/ReferencePage/GroupcodeReference";
import RegisterRegidence from "./components/views/RegisterPage/RegisterResidence";

import Onemorelogin from "./components/views/Mypage/Onemorelogin";
import Forbidden from "./components/views/PageNotFound/Forbidden";
import Forbidden2 from "./components/views/PageNotFound/Forbidden copy";
import { Global } from "./GlobalStyled";
import ShowMyinfo from "./components/views/Mypage/Mypage";
import CustomInput from "./components/CustomInput";
import IntervalFunction from "./components/IntervalFunction";
import ShowParkingUser from "./components/views/ReferencePage/RefParkingUser";
import ReferenceCarAccess from "./components/views/ReferencePage/ReferenceCarAccess";
import RefparkingResidence from "./components/views/ReferencePage/RefparkingResidence";
import SearchAllGroupsforA from "./components/views/ReferencePage/GroupcodeReferenceA";
import SearchTables from "./components/views/ReferencePage/ReferenceCarAccess";
import Notification_Com from "./components/views/Notification/Notification_Com";
import Mqtt from "./components/views/SelectPage/MQTT";
import DemoPie from "./components/views/Charts/DonutChart";
import { Provider, useDispatch } from "react-redux";
import store from "./store/configureStore";
import { userActions } from "./_reducers/user";
import First from "./First";
import LandingPage from "./components/views/LandingPage";

function App() {
  // const NewLandingPage = Auth(LandingPage, null);
  // const NewLoginPage = Auth(LoginPage, false);
  // const NewRegisterPage = Auth(RegisterPage, false);

  const Container = styled.div`
    display: flex;
    flex-wrap: nowrap;
    min-height: calc(100vh - 60px);
  `;

  const MainContant = styled.div`
    min-width: calc(100vw - 200px);
  `;
  const token = localStorage.getItem("token");
  return (
    <Provider store={store}>
      <div>
        <First />
        <Global />
        <NavBar />

        <Container>
          <Aside style={token ? { display: "block" } : { display: "none" }} />

          <Router>
            <MainContant>
              <Routes>
                <Route
                  path="*"
                  element={
                    <div>
                      <DevingPage />
                    </div>
                  }
                />
                <Route
                  path="/referenceuser"
                  element={
                    <div>
                      <SearchAllUser />
                    </div>
                  }
                />
                <Route
                  path="/updateuser"
                  element={
                    <div>
                      <UserUpdate />
                    </div>
                  }
                />
                <Route
                  path="/carinout"
                  element={
                    <div>
                      <SearchTables />
                    </div>
                  }
                />
                <Route
                  path="/caraccess"
                  element={
                    <div>
                      <ReferenceCarAccess />
                    </div>
                  }
                />
                <Route
                  path="/onemorelogin"
                  element={
                    <div>
                      <Onemorelogin />
                    </div>
                  }
                />
                <Route path="/registerpark" element={<RegisterPark />} />
                <Route path="/referencepark" element={<ReferencePark />} />
                <Route
                  path="/"
                  element={
                    <>
                      <DemoPie />
                      <LandingPage />
                    </>
                  }
                />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/forbidden" element={<Forbidden2 />} />
                <Route path="/forbidden2" element={<Forbidden />} />
                <Route path="/register" element={<Register />} />
                <Route path="/mypage" element={<ShowMyinfo />} />
                <Route
                  path="/referenceparkuser"
                  element={<ShowParkingUser />}
                />
                <Route
                  path="/registergroup"
                  element={
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        height: "100vh",
                        flexWrap: "wrap",
                        padding: "50px 0 0",
                      }}
                    >
                      <SearchAllGroups />
                      <RegisterGroup />
                    </div>
                  }
                />
                <Route
                  path="/registerresidence"
                  element={
                    <div>
                      <RegisterRegidence />
                    </div>
                  }
                />
                <Route
                  path="/refparkinguser"
                  element={
                    <div>
                      <RefparkingResidence />
                    </div>
                  }
                />
                <Route
                  path="/refgroupadmin"
                  element={<SearchAllGroupsforA />}
                />
                <Route path="/updateUser" element={<UserUpdate />} />
              </Routes>
            </MainContant>
          </Router>
        </Container>
        <footer></footer>
      </div>
    </Provider>
  );
}

export default App;
