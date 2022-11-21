import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import axios from "axios";
import useNavigate from "react-router-dom";
import { client } from "../../../constant/client";
import DeletebtnResi from "../ShowTables/DeletebtnResi";
import UpdateModalResident from "../ShowTables/UpdateModalResident";

function SearchResidence() {
  const [userdata, setUserdata] = useState(null);
  //const navigate = useNavigate;
  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = {
      //"Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
    client
      .get("/api/findparking/residence", { headers: headers })
      .then((response) => {
        if (response.request.status === 200) {
          console.log("정기권조회", response.data);
          setUserdata(response.data);
          //console.log("userdata[0].authorityDtoSet[0].authorityName: "+ userdata[0].authorityDtoSet[0].authorityName);
        } else {
          alert(
            "알 수 없는 오류입니다. 다시 시도하거나 관리자에게 연락하세요."
          );
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
    console.log("userdata", userdata);
  }, [userdata]);

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
    },
    {
      title: "소유주",
      dataIndex: "owner",
      key: "owner",

      ...getColumnSearchProps("owner"),
    },
    {
      title: "전화번호",
      dataIndex: "phone",
      key: "phone",

      ...getColumnSearchProps("phone"),
    },
    {
      title: "비상연락처",
      dataIndex: "secondphone",
      key: "secondphone",

      ...getColumnSearchProps("resiaddress"),
    },

    {
      title: "주소",
      dataIndex: "resiaddress",
      key: "resiaddress",

      ...getColumnSearchProps("resiaddress"),
    },
    {
      title: "차 특징",
      dataIndex: "feature",
      key: "feature",

      ...getColumnSearchProps("feature"),
    },
    {
      title: "그룹코드",
      dataIndex: "groupcode",
      key: "groupcode",

      ...getColumnSearchProps("groupcode"),
    },
    {
      title: "사용여부",
      dataIndex: "usestate",
      key: "usestate",

      ...getColumnSearchProps("usestate"),
      render: (val) => <>{val ? "사용중" : "만료"}</>,
    },
    {
      title: "만료기간",
      dataIndex: "enddate",
      key: "enddate",

      ...getColumnSearchProps("enddate"),
      //render:(text, record) => (<>{text.map(v => v.building)}</>)
    },
    {
      title: "수정",
      dataIndex: "carnum",
      key: "carnum",

      render: (text, record) => (
        <UpdateModalResident carnum={text} record={record} />
      ),
    },
    {
      title: "삭제",
      dataIndex: "carnum",
      key: "carnum",

      render: (text, index) => <DeletebtnResi id={text} />,
    },
  ];
  return (
    <div
      style={{
        minWidth: "50%",
        height: "100%",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        alignContent: "center",
        marginTop: "100px",
        paddingBottom: "50px",
      }}
    >
      <p style={{ fontSize: "40px", textAlign: "center", width: "100%" }}>
        정기권 사용자 조회
      </p>
      <Table
        columns={columns}
        dataSource={userdata}
        pagination={{
          position: ["none", "bottomCenter"],
        }}
      />
    </div>
  );
}

export default SearchResidence;
