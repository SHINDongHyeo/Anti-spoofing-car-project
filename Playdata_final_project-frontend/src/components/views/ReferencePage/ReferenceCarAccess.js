import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Tag } from "antd";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import axios from "axios";
import Carimgbtn from "../ShowTables/Carimgbtn";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  updateCheckAPI,
  userActions,
  userReducers,
} from "../../../_reducers/user";
import { client2 } from "../../../constant/client";

function SearchTables() {
  const cardata = useSelector((state) => state?.userReducers?.caraccess);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = {
      //"Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
    //client2.get("/api/findparkingaccesscar", { headers: headers })
    //.then(response => {
    // if (response.request.status === 200) {
    // console.log('responseofcardata', response.data);
    //console.log(typeof(response.data.registered))
    // setCardata(response.data);
    // } else {
    //alert('주차장 정보를 불러오는데 실패했습니다.')
    // };})
    client2
      .get("/api/enableparkinglot", { headers: headers })
      .then((response) => {
        if (response.request.status === 200) {
          console.log("responseofcardata2", response.data);
          console.log(typeof response.data.registered);
        } else {
          alert("주차장 정보를 불러오는데 실패했습니다.");
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

  const dispatch = useDispatch();

  const onClickhandler = (record) => {
    console.log("onClickhandler::", record);
    dispatch(
      updateCheckAPI({
        detectedid: String(record.detected.detectedid),
        checked: "true",
      })
    );
    dispatch(userActions.changeValidation(record.detected.detectedid));
  };

  const columns = [
    {
      title: "차량번호",
      dataIndex: "accesscarnum",
      key: "accesscarnum",

      ...getColumnSearchProps("accesscarnum"),
    },
    {
      title: "입차시간",
      dataIndex: "intime",
      key: "intime",
      ...getColumnSearchProps("intime"),
      sorter: (a, b) => a.intime.length - b.intime.length,
      sortDirections: ["descend", "ascend"],
      render: (date) => <>{moment(date).format("YYYY-MM-DD HH:mm:ss")}</>,
    },
    {
      title: "출차시간",
      dataIndex: "outime",
      key: "outime",
      ...getColumnSearchProps("outime"),
      sorter: (a, b) => a.outime - b.outime,
      sortDirections: ["descend", "ascend"],
      render: (date) => <>{moment(date).format("YYYY-MM-DD HH:mm:ss")}</>,
    },

    {
      title: "이상여부",
      dataIndex: "validation",
      key: "validation",
      render: (val) => (
        <div>
          {val ? (
            <Tag color="#f50">이상차량</Tag>
          ) : (
            <Tag color="#108ee9">정상</Tag>
          )}
        </div>
      ),
      // ...getColumnSearchProps('validation'),
    },
    {
      title: "정기권 등록여부",
      dataIndex: "registered",
      key: "registered",
      render: (val) => <div>{val ? "정기권" : "미등록"}</div>,
      //...getColumnSearchProps('registered'),
    },
    {
      title: "입차이미지",
      dataIndex: "inimg",
      key: "inimg",
      render: (text, index) => <Carimgbtn imgSrc={text} />,
    },
    {
      title: "출차이미지",
      dataIndex: "outimg",
      key: "outimg",
      render: (text, index) => <Carimgbtn imgSrc={text} />,
    },
    {
      title: "주차장 id",
      dataIndex: "parkid",
      key: "parkid",
    },
    {
      title: "확인하기",
      dataIndex: "detectedid",
      key: "detectedid",
      render: (id, record) => (
        <>
          {record.detected === null || record.detected?.checked ? (
            <></>
          ) : (
            // 규격 수정 후 조건을 record.checked로 변경
            <Button
              onClick={() => {
                onClickhandler(record);
              }}
            >
              완료
            </Button>
          )}
        </>
      ),
    },
  ];

  console.log("cardata::", cardata);
  return (
    <Table
      columns={columns}
      dataSource={cardata}
      pagination={{
        position: ["none", "Center"],
      }}
    />
  );
}

export default SearchTables;
