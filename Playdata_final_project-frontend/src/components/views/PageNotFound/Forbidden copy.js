import { Button, Result } from 'antd';
import React from 'react';
const Frobidden2 = () => (
  <Result
    status="403"
    title="403"
    subTitle="권한이 없습니다."
    extra={<Button type="primary" href='/'>메인화면으로</Button>}
  />
);
export default Frobidden2;