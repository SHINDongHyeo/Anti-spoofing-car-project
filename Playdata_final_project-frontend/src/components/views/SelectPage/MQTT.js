import {
  PoweroffOutlined,
  UpCircleOutlined,
  DownCircleOutlined,
  UnlockOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { Button, Space, message, Modal, Image } from "antd";
import styled from "styled-components";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN_USER } from "../../../_actions/types";
import { registerUser } from "../../../_actions/user_action";
import { mqttRequestAPI } from "../../../_reducers/user";

function Mqtt({ ROLE }) {
  const [signal, setSignal] = useState("close");
  const token = localStorage.getItem("token");
  const [number, setMessage] = useState("0");
  const [disabled, setDisabled] = useState(false);
  const headers = {
    //"Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };

  const CusModal = styled(Modal)`
    & .ant-modal-content {
      display: none;
    }
  `;

  function openhandler(number) {
    setDisabled(true);
    console.log(disabled);

    setMessage(number);
    let body = {
      message: number,
      retained: "false",
      qos: "1",
    };

    //setSignal("open")
    console.log(disabled);
    console.log("number: " + body.number);
    axios
      .post("/api/mqtt/publish", body, { headers: headers })
      .then((response) => {
        if (response.status === 200) {
          //console.log("signal: "+signal);
          console.log(response.data);
          message.info("요청 중 입니다. 잠시만 기다려주세요.");
        } else {
          message.warning("요청 실패입니다. 다시 시도하세요.");
        }
        setTimeout(() => {
          setDisabled(false);
          console.log(disabled);
        }, 5000);
      })
      .catch((error) => {
        console.log(error);
        alert("문제가 발생했습니다. 관리자에게 문의하세요");
        setTimeout(() => {
          setDisabled(false);
        }, 15000);
      });
  }

  const [loadings, setLoadings] = useState([]);
  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 6000);
    // eslint-disable-next-line react-hooks/rules-of-hooks

    // openhandler();
  };

  const StyledButton = styled(Button)`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    margin: 10px;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 3px 4px rgba(0, 0, 0, 0.1);

    span {
      font-size: 20px;
    }
  `;

  const dispatch = useDispatch();

  const testHandler = (id) => {
    let body = {
      message: String(id),
      retained: "false",
      qos: "1",
    };

    dispatch(mqttRequestAPI(body));
  };

  const { mqttLoading } = useSelector((state) => state.userReducers);
  const [loading, setLoading] = useState(false);

  const ref = useRef(false);

  useEffect(() => {
    if (ref.current) {
      if (mqttLoading) {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 5000);
      }
    } else {
      ref.current = true;
    }
  }, [mqttLoading]);

  console.log("mqttLoading::", mqttLoading);
  return (
    <>
      <div
        ref={ref}
        style={{
          display: "block",
          alignItems: "center",
          fontWeight: "bold",
          fontSize: "2rem",
          textAlign: "center",
          padding: "20px 0",
          justifyContent: "center",
          borderBottom: "1px solid #0b0b5c",
        }}
      >
        차단기 제어
      </div>

      <br />
      <br />
      <br />
      <Space
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "nowrap",
          margin: "50px 0",
          flexDirection: "column",
          minWidth: "80%",
          //width: "100%",
        }}
      >
        <div style={{ display: "flex", width: "100%" }}>
          <StyledButton
            icon={<UpCircleOutlined />}
            loading={loadings[1]}
            onClick={() => {
              testHandler(1);
            }}
            //={() => openhandler()}
            style={{ background: "#00A482", borderColor: "white" }}
            disabled={loading}
          >
            5초 열림
          </StyledButton>
          <StyledButton
            type="primary"
            icon={<LockOutlined />}
            loading={loadings[1]}
            // eslint-disable-next-line no-undef
            onClick={() => {
              testHandler(3);
            }}
            style={{
              background: "#84D277",
              borderColor: "white",
            }}
            disabled={loading}
          >
            열림 고정
          </StyledButton>
          <StyledButton
            type="primary"
            icon={<UnlockOutlined />}
            loading={loadings[1]}
            // eslint-disable-next-line no-undef
            onClick={() => {
              testHandler(5);
            }}
            style={{
              background: "#F9F871",
              borderColor: "white",
              color: "#333",
            }}
            disabled={mqttLoading}
          >
            닫힘 고정
          </StyledButton>
        </div>

        <div style={{ display: "flex", width: "100%" }}>
          <StyledButton
            type="primary"
            icon={<DownCircleOutlined />}
            loading={loadings[1]}
            // eslint-disable-next-line no-undef
            onClick={() => {
              testHandler(2);
            }}
            style={{
              background: "#005974",
              borderColor: "white",
            }}
            disabled={mqttLoading}
          >
            닫힘
          </StyledButton>
          <StyledButton
            type="primary"
            icon={<LockOutlined />}
            loading={loadings[1]}
            // eslint-disable-next-line no-undef
            onClick={() => {
              testHandler(4);
            }}
            style={{
              background: "#BF90B7",
              borderColor: "white",
            }}
            disabled={loading}
          >
            열림 고정 해제
          </StyledButton>
          <StyledButton
            type="primary"
            icon={<UnlockOutlined />}
            loading={loadings[1]}
            // eslint-disable-next-line no-undef
            onClick={() => {
              testHandler(6);
            }}
            style={{
              background: "#F7B3D6",
              borderColor: "white",
            }}
            disabled={loading}
          >
            닫힘 고정 해제
          </StyledButton>
        </div>
      </Space>
      {/*<CusModal width={1} open={disabled} header="none" footer={false}></CusModal>*/}
    </>
  );
}
export default Mqtt;
