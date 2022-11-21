import React from 'react';
import 'antd/dist/antd.css';
//import './index.css';
import { Button, Result} from 'antd';
import styled from 'styled-components';


const DevingPage = () => (
    <div className='content' style={divStyle}> 
    <Result
    title="요청하신 페이지는 존재하지 않습니다"
    
    extra={
      <Button type="primary" key="console" href='/'>
        홈으로
      </Button>
    }
  />
  </div>
  
);
const divStyle = {
    backgroundColor: "white",
    marginTop: "155px",
    margin:'auto',
    height:"100vh",
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',

    width:'100%'
  };

export default DevingPage;