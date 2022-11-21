import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/user_action";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Input from "./Input";
import Button from "./Button";
import styled from "styled-components";
import image from "./back.jpg";
import { client2 } from "../../../constant/client";

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [username, setuserName] = useState("이름은 두글자 이상 입력해주세요");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("2~10자리의 닉네임을 입력하세요");
  const [userEmail, setUserEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const message = [
    "2~10자리의 닉네임을 입력하세요",
    "이름은 두글자 이상 입력하세요",
    "8~20자리의 비밀번호를 입력하세요",
  ];

  useEffect(() => {
    fetch("/api/signup")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      });
  }, []);

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

  const oncompanyHandler = (event) => {
    setCompany(event.currentTarget.value);
  };
  const onphoneHandler = (event) => {
    setPhone(event.currentTarget.value);
  };

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault(); //prevent page reflesh?

    //check if nickname is over 2 characters and 10  characters
    if (nickname.length < 2 || nickname.length > 10) {
      return alert("닉네임은 2자 이상 10자 이하로 입력해주세요.");
    }
    //check if userName is over 2 characters and 10  characters
    if (username.length < 2 || username.length > 10) {
      return alert("이름은 2자 이상 10자 이하로 입력해주세요.");
    }

    //check if not password is over 8 characters and 20  characters
    if (password.length < 8 || password.length > 20) {
      return alert("비밀번호는 8자 이상 20자 이하로 입력해주세요.");
    }

    if (password !== ConfirmPassword) {
      return alert("비밀번호와 비밀번호 확인은 같아야 합니다.");
    }

    let body = {
      email: userEmail,
      password: password,
      userName: username,
      nickname: nickname,
      phone: phone,
      company: company,
    };
    console.log(body);

    client2.post("/api/signup", body).then((response) => {
      if (response.status === 200) {
        alert("회원가입 성공!");
        navigate("/login");
      } else {
        alert("회원가입 실패");
      }

      // dispatch(registerUser(body))
      // .then(response => {
      //     console.log(response.data);

      //     // if (response) {
      //     //     navigate('/login');

      //     // } else {
      //     //     alert('Failed to sign up')
      //     // }
    });
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          flexDirection: "column",
          margin: "auto",
          alignItems: "center",
        }}
        onSubmit={onSubmitHandler}
      >
        <MainContainer>
          <InputContainer>
            <label>Email</label>
            <Input
              type="email"
              value={userEmail}
              onChange={oneuserEmailhandler}
            />
            <label>nickname</label>
            <Input type="text" value={nickname} onChange={onenicknameHandler} />
            <label>userName</label>
            <Input type="text" value={username} onChange={oneuserNameHandler} />
            <label>password</label>
            <Input
              type="password"
              value={password}
              onChange={onpasswordHandler}
            />
            <label>Confirm Password</label>
            <Input
              type="password"
              value={ConfirmPassword}
              onChange={onConfirmPasswordHandler}
            />
            <label>company</label>
            <Input type="text" value={company} onChange={oncompanyHandler} />
            <label>phone</label>
            <Input type="text" value={phone} onChange={onphoneHandler} />
          </InputContainer>

          <ButtonContainer>
            <Button content="Signup" type="submit" />
          </ButtonContainer>
        </MainContainer>
      </form>
    </div>
  );
}

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  height: 80vh;
  width: 30vw;

  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border-radius: 10px;
  color: black;
  text-transform: uppercase;
  letter-spacing: 0.4rem;
`;

const WelcomeText = styled.h2`
  margin: 3rem 0 2rem 0;
`;

const InputContainer = styled.div`
  margin-top: 14rem;
  margin-bottom: 8rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 20%;
  width: 100%;
`;

const ButtonContainer = styled.div`
  margin-top: 3rem;

  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default RegisterPage;
