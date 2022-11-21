import axios from "axios";
import { useDispatch } from "react-redux";
import { client2 } from "../constant/client";
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "./types";

export async function loginUser(dataToSubmit) {
  const request = await client2
    .post("/api/users/login", dataToSubmit)
    .then((response) => response.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export async function registerUser(dataToSubmit) {
  console.log("dispatch");
  let body = {
    message: "1",
    retained: "false",
    qos: "1",
  };

  const headers = {
    //"Content-Type": "application/json",
    Authorization:
      "Bearer " +
      "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyb290IiwiYXV0aCI6IlJPTEVfQURNSU4sUk9MRV9TWVNBRE1JTixST0xFX1VTRVIiLCJleHAiOjE2Njc2NDIzMjh9.rjsIejOjfOw8R5I9WMIVX2V_U_lNFV9sXR79wBHitNL3_mG8JN6GKdYf7RJQE0iojd8JdoMqOz63NgTKePRwww",
  };

  try {
    const request = await client2.post("/api/mqtt/publish", body, {
      headers: headers,
    });
    console.log(request);
    return {
      type: REGISTER_USER,
      payload: request.data,
    };
  } catch (e) {
    return {
      type: REGISTER_USER,
      payload: "실패",
    };
  }
}

export function auth() {
  const request = axios
    .get("/api/users/auth")
    .then((response) => response.data);

  return {
    type: AUTH_USER,
    payload: request,
  };
}
