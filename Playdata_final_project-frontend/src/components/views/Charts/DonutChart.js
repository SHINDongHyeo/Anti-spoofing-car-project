import React, { useEffect, useMemo } from "react";
import { Pie, measureTextWidth } from "@ant-design/plots";
import { Result } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { enableParkinglotAPI, userActions } from "../../../_reducers/user";
import Forbidden_copy from "../PageNotFound/Forbidden copy";
const DemoPie = () => {
  const token = localStorage.getItem("token");
  const headers = {
    //"Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };

  const dispatch = useDispatch();

  const enableParkinglotResult = useSelector(
    (state) => state.userReducers.enableParkinglotResult
  );
  const userLoginInfo = useSelector(
    (state) => state.userReducers.userLoginInfo
  );

  useEffect(() => {
    dispatch(enableParkinglotAPI());
    const interval = setInterval(() => {
      dispatch(enableParkinglotAPI());
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  console.log("enableParkinglotResult::", enableParkinglotResult);

  function renderStatistic(containerWidth, text, style) {
    //get data from "/data"
    const { width: textWidth, height: textHeight } = measureTextWidth(
      text,
      style
    );
    const R = containerWidth / 2; // r^2 = (w / 2)^2 + (h - offsetY)^2

    let scale = 1;

    if (containerWidth < textWidth) {
      scale = Math.min(
        Math.sqrt(
          Math.abs(
            Math.pow(R, 2) /
              (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2))
          )
        ),
        1
      );
    }

    const textStyleStr = `width:${containerWidth}px;`;
    return `<div style="${textStyleStr};font-size:${scale}em;line-height:${
      scale < 1 ? 1 : "inherit"
    };">${text}</div>`;
  }

  //data2 안에 있는 parkingDtoSet 안에 있는 allarea를 뽑아내야함
  //data2 안에 있는 parkingDtoSet 안에 있는 enablearea를 뽑아내야함

  //data2[0].parkingDtoSet[0].parkname

  const data = [
    {
      type: "남은 공간",
      value:
        enableParkinglotResult.allparkinglot -
        enableParkinglotResult.residentparkinglot -
        enableParkinglotResult.nonparkinglot,
    },
    {
      type: "주차된 일반차량",
      value: enableParkinglotResult.nonparkinglot,
    },
    {
      type: "주차된 정기차량",
      value: enableParkinglotResult.residentparkinglot,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 1,
    innerRadius: 0.64,
    meta: {
      value: {
        formatter: (v) => `${v} 개`,
      },
    },
    label: {
      type: "inner",
      offset: "-50%",
      style: {
        textAlign: "center",
      },
      autoRotate: false,
      content: "{value}",
    },
    statistic: {
      title: {
        offsetY: -4,
        customHtml: (container, view, datum) => {
          const { width, height } = container.getBoundingClientRect();
          const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
          const text = datum ? datum.type : "주차장";
          return renderStatistic(d, text, {
            fontSize: 28,
          });
        },
      },
      content: {
        offsetY: 4,
        style: {
          fontSize: "32px",
        },
        customHtml: (container, view, datum, data) => {
          const { width } = container.getBoundingClientRect();
          const text = datum
            ? ` ${datum.value} 대`
            : `${data.reduce((r, d) => r + d.value, 0)} 대`;
          return renderStatistic(width, text, {
            fontSize: 32,
          });
        },
      },
    },

    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
      {
        type: "pie-statistic-active",
      },
    ],
  };

  if (!token)
    return (
      <>
        <Forbidden_copy />
      </>
    );
  if (!userLoginInfo) return <>"userLoginInfos"</>;
  if (userLoginInfo.parkingDtoSet[0].parkname === "test")
    return <Result status="warning" title="주차장 승인 대기 중 입니다." />;
  return (
    <div style={{ position: "relative" }}>
      <Pie {...config} />
      <div
        style={{
          position: "absolute",
          marginRight: "100px",
          marginBottom: "0px",
          marginTop: "0px",
          textAlign: "center",
          right: 0,
          top: "50%",
          width: 500,
          height: 300,
          fontSize: "60px",
          fontWeight: "bolder",
        }}
      >
        <TestComponent detectedResult />
      </div>
    </div>
  );
};

export default DemoPie;
//ReactDOM.render(<DemoPie />, document.getElementById('container'));

const TestComponent = () => {
  const { detectedPark, caraccess } = useSelector(
    (state) => state?.userReducers
  );
  const dispatch = useDispatch();

  const detectedResult = useMemo(() => {
    const array = [];
    let array2 = [];
    try {
      caraccess.forEach((v) => {
        const result = detectedPark.find((j) => j.detectedid === v.accessid);
        if (result) {
          array.push(result);
        }
      });
      const result = array.filter((v) => !v.checked);
      array2 = result;
    } catch (e) {
      console.log(e);
    }
    console.log("arrayarrayarray", array);
    dispatch(userActions.setFilterdDetected({ array, array2 }));
    return { array, array2 };
  }, [detectedPark, caraccess]);

  return (
    <>
      <p style={{ fontSize: "45px", marginBottom: "0px" }}>이상감지 </p>
      <span style={{ color: "red", fontSize: "60px" }}>
        {detectedResult.array2.length}
      </span>
      <span>/{detectedResult.array.length}(건)</span>
    </>
  );
};
