import { Button, InputNumber, Image } from "antd";
import React, { useState } from "react";
const Carimgbtn = ({ imgSrc }) => {
  const [visible, setVisible] = useState(false);
  const [scaleStep, setScaleStep] = useState(0.5);

  console.log("imgSrc::", imgSrc);

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        사진 확인하기
      </Button>
      <Image
        width={200}
        style={{
          display: "none",
        }}
        src={imgSrc}
        preview={{
          visible,
          scaleStep,
          src: imgSrc,
          onVisibleChange: (value) => {
            setVisible(value);
          },
        }}
      />
    </>
  );
};
export default Carimgbtn;
