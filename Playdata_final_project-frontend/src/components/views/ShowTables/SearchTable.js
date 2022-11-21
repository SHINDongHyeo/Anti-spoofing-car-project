import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Pagination, Space, Table, Tag } from "antd";
import axios from "axios";
import React, { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import styled from "styled-components";
import { client2 } from "../../../constant/client";
const data = [
  {
    key: "1",
    carnum: "82가5252",
    age: "정기권",
    entertime: "2022-10-31 12:17:44",
    address: "2022-10-31 12:19:12",
  },
];
const SearchTables = () => {
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
      title: "차량번호",
      dataIndex: "carnum",
      key: "carnum",

      ...getColumnSearchProps("carnum"),
      render: (text, record) => (
        <>
          <Button onClick={() => console.log(record)}>{text}</Button>
        </>
      ),
    },
    {
      title: "차량구분",
      dataIndex: "age",
      key: "age",

      ...getColumnSearchProps("age"),
    },
    {
      title: "입차시간",
      dataIndex: "entertime",
      key: "entertime",

      ...getColumnSearchProps("entertime"),
      sorter: (a, b) => a.entertime.length - b.entertime.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "출차시간",
      dataIndex: "address",
      key: "address",

      ...getColumnSearchProps("address"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "이상감지",
      dataIndex: "chcked",
      filters: [
        {
          text: "Y",
          value: "true",
        },
        {
          text: "N",
          value: "false",
        },
      ],
      key: "checked",

      ...getColumnSearchProps("checked"),
    },
    {
      title: "차량 입차 이미지",
      dataIndex: "carpicture",
      key: "carpicure",
    },
  ];

  const [current, setCurrent] = useState(3);
  const onChange = (page) => {
    console.log(page);
    setCurrent(page);
    client2.get(`https://www.gfggg.com/?page=${page}`);
  };
  const array = [1, 2, 3, 4, 5];

  //array.map((v, index) => <div onClick={() => onclickHandler(index)}>console.log(v, index)</div>)

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          position: ["none", "bottomCenter"],
          style: { width: "100%" },
          pageSize: 5,
        }}
      />
      <Pagination current={current} onChange={onChange} total={50} />
    </>
  );
};
export default SearchTables;
