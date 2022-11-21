import React from "react";
import { Button, notification} from "antd";
import {
  AlertOutlined
} from '@ant-design/icons';
import styled from "styled-components";


const tablestyle = {
    borderCollapse: 'collapse',
    margin: '25px 0' ,
    fonSize:' 0.9em',
    fontFamily: 'sans-serif',
    minWidth: '400px',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.15)'
}

const headersytle = {
    backgroundColor: '#009879',
    color: '#ffffff',
    textAlign: 'left'}

const tablecellstyle = {
    padding: '12px 15px'
}

const style = styled.div`
.styled-table tbody tr {
    border-bottom: 1px solid #dddddd;
}

.styled-table tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
}

.styled-table tbody tr:last-of-type {
    border-bottom: 2px solid #009879;
}
`
const buttonstyle = {


/* CSS */

//font-family: 'Nanum Gothic', sans-serif;
//font-family: 'Noto Sans KR', sans-serif;