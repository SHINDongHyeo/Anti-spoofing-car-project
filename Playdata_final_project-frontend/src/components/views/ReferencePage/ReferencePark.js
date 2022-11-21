import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import axios from "axios";
import UpdatePark from "../ShowTables/UpdatePark";
import { client2, client3 } from "../../../constant/client";

function SearchTables() {
  const [parkdata, setParkdata] = useState([]);

  const axiosHandler = () => {
    const token = localStorage.getItem("token");
    const headers = {
      //"Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
    client2.get("/api/findParking", { headers: headers }).then((response) => {
      if (response.request.status === 200) {
        console.log(response.data);
        setParkdata(response.data);
      } else {
        alert("주차장 정보를 불러오는데 실패했습니다.");
      }
    });
  };

  useEffect(() => {
    axiosHandler();
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
      title: "주차장 이름",
      dataIndex: "parkname",
      key: "parkname",

      ...getColumnSearchProps("parkname"),
    },
    {
      title: "건물",
      dataIndex: "building",
      key: "building",

      ...getColumnSearchProps("building"),
    },
    {
      title: "주소",
      dataIndex: "address",
      key: "address",

      ...getColumnSearchProps("address"),
    },
    {
      title: "무료 이용시간",
      dataIndex: "freetime",
      key: "freetime",

      ...getColumnSearchProps("freetime"),
    },

    {
      title: "기본 요금 비율",
      dataIndex: "baserate",
      key: "baserate",

      ...getColumnSearchProps("baserate"),
    },
    {
      title: "전기차 충전기",
      dataIndex: "eleccharger",
      key: "eleccharger",

      ...getColumnSearchProps("eleccharger"),
    },
    {
      title: "전체 가용 대수",
      dataIndex: "allarea",
      key: "allarea",

      ...getColumnSearchProps("allarea"),
    },

    {
      title: "운영 시작 날짜",
      dataIndex: "starttime",
      key: "starttime",
      ...getColumnSearchProps("starttime"),
      sorter: (a, b) => a.starttime.length - b.starttime.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "운영 종료 날짜",
      dataIndex: "endtime",
      key: "endtime",
      ...getColumnSearchProps("endtime"),
      sorter: (a, b) => a.endtime.length - b.endtime.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "수정",
      dataIndex: "parkname",
      key: "parkname",
      render: (text, index) => (
        <UpdatePark
          parkname={text}
          handler={() => {
            axiosHandler();
          }}
        />
      ),
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
        주차장 조회
      </p>
      <Table
        columns={columns}
        dataSource={parkdata}
        pagination={{
          position: ["none", "bottomCenter"],
        }}
      />
    </div>
  );
}

export default SearchTables;
