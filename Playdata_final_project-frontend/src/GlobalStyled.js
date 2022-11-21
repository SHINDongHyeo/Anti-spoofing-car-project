import { createGlobalStyle } from "styled-components";

export const Global = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.ant-col-sm-8 {
  display: block;
  flex: 0 0 33.33333333%;
  min-width: 200px;}
.ant-input-number-input {
    width: 100% ;
    height: 30px;
    padding: 0 11px;
    text-align: left;
    background-color: transparent;
    border: 0;
    border-radius: 2px;
    outline: 0;
    transition: all 0.3s linear;
    transition-property: all;
    transition-duration: 0.3s;
    transition-timing-function: linear;
    transition-delay: 0s;
    -webkit-appearance: textfield !important;
    -moz-appearance: textfield !important;
    appearance: textfield !important;

.con{
  display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f5f5f5;
}


  
.site-layout-background{
  width: 100%;
}
.canvas{
  width: 100%;
}

}
.ant-layout-content{
  width: 100%;
}
.root{
  width: 100%;
  margin: 0;
  padding: 0;

}
.ant-table-wrapper{
  width: 800px;
}
.ant-table-wrapper{
  width: 100vw;
}
 
.ant-table-thead > tr > th {
  border-bottom: 1px solid #fc0 !important;
  background: linear-gradient(to bottom, #051937, #022341, #002d4a, #003752, #00415a) !important ;
  color: #fff !important;
  textAlign: center !important;
  justify-content: center !important;
    align-items: center !important;
    font-size: 1.2rem !important;
    font-weight: 200 !important;
    padding: 1rem !important;



}

& .ant-table-thead {
  border-collapse: collapse; 
  margin: 25px 0  ;
  font-size: 0.9em   ;
  font-family: sans-serif ;
  min-width: 400px  ;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15) ; 
}


& .ant-layout-sider-children {
  height: 100vh; !important;
  margin-top: -0.1px;
  padding-top: 0.1px;
  background:#001529;
}

& .ant-btn-primary {
    color: #fff;
    border-color: #2E3F56;
    background: #2E3F56;
    text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
    box-shadow: 0 2px 0 rgb(0 0 0 / 5%);
}
.ant-table-thead > tr > th, .ant-table-column-title, .ant-table-tbody > tr > td {
	text-align:center;

}

.ant-table-content {
  padding: 0 20px
}

`;
