import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Form } from "antd";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import styled from "styled-components";
import axios from "axios";
import Deletebtn from "../ShowTables/Deletebtn";
import UpdateModal from "../ShowTables/UpdateModal";
import { client2 } from "../../../constant/client";
import RegisterGroup from "../RegisterPage/RegisterGroup";

function SearchAllGroupsforA() {
  const [groupdata, setGroupdata] = useState(null);
  const [form] = Form.useForm();

  const CustomTable = styled(Table)`
    .ant-table-thead > tr > th {
    }
  `;

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = {
      //"Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
    client2
      .get("/api/findparking/resident", { headers: headers })

      .then((response) => {
        if (response.request.status === 200) {
          console.log(response.data);
          setGroupdata(response.data);
          //console.log("userdata[0].authorityDtoSet[0].authorityName: "+ userdata[0].authorityDtoSet[0].authorityName);
        } else {
          alert(response.data);
        }
      });
  }, []);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  useEffect(() => {
    console.log("groupdata", groupdata);
  }, [groupdata]);

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "그룹코드",
      dataIndex: "groupcode",
      key: "groupcode",
      ...getColumnSearchProps("groupcode"),
    },
    {
      title: "그룹이름",
      dataIndex: "groupname",
      key: "groupname",
      ...getColumnSearchProps("groupname"),
    },
    {
      title: "만료기간",
      dataIndex: "endtime",
      key: "endtime",
      ...getColumnSearchProps("endtime"),
    },
    {
      title: "판매가",
      dataIndex: "totalprice",
      key: "totalprice",
      ...getColumnSearchProps("totalprice"),
    },

    {
      title: "주차장 이름",
      dataIndex: "parkname",
      key: "parkname",
      ...getColumnSearchProps("parkname"),
    },
    {
      title: "삭제",
      dataIndex: "groupcode",
      key: "groupcode",
      render: (text, index) => <Deletebtn id={text} />,
    },
    {
      title: "수정",
      dataIndex: "groupname",
      key: "groupname",
      render: (text, index) => <UpdateModal groupname={text} />,
    },
  ];

  return (
    <div
      style={{
        minWidth: "50%",
        height: "100%",
        marginTop: "100px",
        paddingBottom: "50px",
      }}
    >
      <p style={{ fontSize: "40px", textAlign: "center", width: "100%" }}>
        그룹코드 조회
      </p>
      <CustomTable
        columns={columns}
        dataSource={groupdata}
        pagination={{
          position: ["none", "bottomCenter"],
        }}
      />
      <RegisterGroup />
    </div>
  );
}

export default SearchAllGroupsforA;
