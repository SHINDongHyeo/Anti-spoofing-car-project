import axios from "axios";
import { message } from "antd";

import { useNavigate } from "react-router-dom";

export const client = axios.create();
export const client2 = axios.create();
export const client3 = axios.create();

client.defaults.baseURL = "http://15.164.76.195";
client2.defaults.baseURL = "http://15.164.76.195";
client3.defaults.baseURL = "http://15.164.76.195";
//client3.defaults.baseURL = "https://ppap.ekg.kr/";

client.interceptors.request.use(
  function (config) {
    console.log("req::", config);
    // 요청을 보내기 전에 수행할 일
    // ...
    return config;
  },
  function (error) {
    console.log("error::", error);
    // 오류 요청을 보내기전 수행할 일
    // ...
    return Promise.reject(error);
  }
);

// 응답 인터셉터 추가
client.interceptors.response.use(
  function (response) {
    console.log("response::", response);
    // 응답 데이터를 가공
    // ...
    return response;
  },
  function (error) {
    // 오류 응답을 처리
    // ...
    console.log("error::", error);
    if (error) {
      if (error.response.status === 401) {
        console.log(error.response);

        if (localStorage.getItem("token") == null) {
        } else {
        }
      } else if (
        error.response.status === 500 ||
        error.response.status === 504
      ) {
        message.error(
          "서버에 오류가 났습니다. 입력값을 올바르게 입력했는지 확인하거나, 서버를 점검한 후 다시 시도해주세요."
        );
      } else if (error.response.status === 403) {
        // message.error("권한이 없습니다. 관리자에게 문의하세요.");
      } else if (error.response.status === 500) {
        message.error("서버 오류입니다. 다시 시도하세요.");
      } else if (error.response.status === 404) {
        message.error("없는 페이지입니다.");
        window.location.href("*");
      } else {
        message.error("알 수 없는 오류입니다. 관리자에게 문의하세요.");
      }

      return Promise.reject(error.response);
    }
  }
);

client2.interceptors.request.use(
  function (config) {
    console.log("req::", config);
    // 요청을 보내기 전에 수행할 일
    // ...
    return config;
  },
  function (error) {
    console.log("error::", error);
    // 오류 요청을 보내기전 수행할 일
    // ...
    return Promise.reject(error);
  }
);

// 응답 인터셉터 추가
client2.interceptors.response.use(
  function (response) {
    console.log("response::", response);
    // 응답 데이터를 가공
    // ...
    return response;
  },
  function (error) {
    // 오류 응답을 처리
    // ...
    console.log("error::", error);
    if (error) {
      if (error.response.status === 401) {
        console.log(error.response);

        if (localStorage.getItem("token") == null) {
        } else {
        }
      } else if (
        error.response.status === 500 ||
        error.response.status === 504
      ) {
        message.error(
          "서버에 오류가 났습니다. 입력값을 올바르게 입력했는지 확인하거나, 서버를 점검한 후 다시 시도해주세요."
        );
      } else if (error.response.status === 403) {
        // message.error("권한이 없습니다. 관리자에게 문의하세요.");
      } else if (error.response.status === 500) {
        message.error("서버 오류입니다. 다시 시도하세요.");
      } else if (error.response.status === 404) {
        message.error("없는 페이지입니다.");
        window.location.href("*");
      } else if (error.response.status === 400) {
        message.error("형식에 맞게 값을 입력해주세요.");
      } else {
        message.error("알 수 없는 오류입니다. 관리자에게 문의하세요.");
      }

      return Promise.reject(error.response);
    }
  }
);
