import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_action";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Input from "./Input";
import Button from "./Button";
import NavBar from "../NavBar/NavBar";
import { client2, client3 } from "../../../constant/client";
import { message } from "antd";
function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const oneuserEmailhandler = (event) => {
    setUserEmail(event.currentTarget.value);
  };

  const oneuserNameHandler = (event) => {
    setuserName(event.currentTarget.value);
  };
  const onenicknameHandler = (event) => {
    setNickname(event.currentTarget.value);
  };

  const onpasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault(); //prevent page reflesh?

    let body = {
      username: username,
      password: password,
      // userName:userName,
      // nickname:nickname
    };
    console.log(body);

    client3
      .post("/api/authenticate", body)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          localStorage.clear();
          //localStorage.setItem('token', response.data.token);

          localStorage.setItem("username", username);

          console.log("token", response.data);

          localStorage.setItem("token", response.data.token);
          // navigate('/');
          window.location.href = "/";
          //return Response({"id" : user.id, "token" : token}, status=200)
        } else {
          alert("로그인 실패");
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          message.error("아이디 또는 비밀번호가 틀렸습니다.");
          console.log("catch client 3 error status 401");
        } else {
          message.error("로그인 실패. 관리자에게 문의하세요.");
        }
      });
  };

  if (localStorage.getItem("token")) {
    localStorage.clear();
    window.location.reload();
    return <></>;
  }
  return (
    <div>
      <Con>
        <form
          onSubmit={onSubmitHandler}
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            flexDirection: "column",
            margin: "auto",
            alignItems: "center",
          }}
        >
          <MainContainer>
            <div
              style={{
                display: "flex",
                alignContent: "center",
                justifyContent: "center",
                margin: "auto",
                alignItems: "center",
              }}
            >
              <img src="basiclogo.png" alt="basic" />
            </div>

            <InputContainer>
              <label>닉네임</label>
              <Input
                type="text"
                value={username}
                onChange={oneuserNameHandler}
              />

              <label>비밀번호</label>
              <Input
                type="password"
                value={password}
                onChange={onpasswordHandler}
              />
            </InputContainer>
            <br />
            <ButtonContainer>
              <Button content="로그인" type="submit" />
            </ButtonContainer>
            {/* <Button type="submit">
                    Login
                </Button> */}
          </MainContainer>
        </form>
      </Con>
    </div>
  );
}
export const Con = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MainContainer = styled.div`
  display: flex;
  margin-top: 30vh;
  flex-direction: column;
  align-items: center;
  margin: 20px, 200px, 200px, 400px;
  height: 10%;
  width: 30vw;
  background: rgba(255, 255, 255, 80%);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border-radius: 10px;
  color: black;
  text-transform: uppercase;
  letter-spacing: 0.4rem;
`;

export const WelcomeText = styled.h2`
  margin: 3rem 0 2rem 0;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 10%;
  width: 100%;
`;

export const ButtonContainer = styled.div`
  margin: 1rem 0 2rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoginWith = styled.h5`
  cursor: pointer;
`;

export const HorizontalRule = styled.hr`
  width: 90%;
  height: 0.3rem;
  border-radius: 0.8rem;
  border: none;
  background: linear-gradient(to right, #14163c 0%, #03217b 79%);
  background-color: #ebd0d0;
  margin: 1.5rem 0 1rem 0;
  backdrop-filter: blur(25px);
`;

export const IconsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 2rem 0 3rem 0;
  width: 80%;
`;

export const ForgotPassword = styled.h4`
  cursor: pointer;
`;
export let body = styled.div`
  background-image: url("./background.jpg");
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  font-family: "Raleway", sans-serif;
`;

export default LoginPage;
