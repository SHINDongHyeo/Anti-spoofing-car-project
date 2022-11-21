import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Space, Table } from "antd";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import axios from "axios";
import { client } from "../../../constant/client";
import useNavigate from "react-router-dom";
import DeleteUser from "../ShowTables/DeleteUser";
import UserUpdate from "../RegisterPage/UserUpdate";

function SearchAllUser() {
  const [userdata, setUserdata] = useState(null);
  //const navigate = useNavigate;
  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = {
      //"Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
    client.get("/api/Alluser", { headers: headers }).then((response) => {
      if (response.request.status === 200) {
        console.log(response.data);
        setUserdata(response.data);
      } else {
        alert("알 수 없는 오류입니다. 다시 시도하거나 관리자에게 연락하세요.");
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
      title: "이름",
      dataIndex: "username",
      key: "username",

      ...getColumnSearchProps("username"),
    },
    {
      title: "닉네임",
      dataIndex: "nickname",
      key: "nickname",

      ...getColumnSearchProps("nickname"),
    },
    {
      title: "이메일",
      dataIndex: "email",
      key: "email",

      ...getColumnSearchProps("email"),
    },
    {
      title: "회사",
      dataIndex: "company",
      key: "company",

      ...getColumnSearchProps("company"),
    },

    {
      title: "권한",
      dataIndex: "authorityDtoSet",
      key: "authorityDtoSet",

      ...getColumnSearchProps(),
      // render:(text, record) => (<>{text.map(v => v.authority_name  )}</>),
      render: (text, record) => (
        <>
          {text.map((v) => (
            <p style={{ marginBottom: 0 }}>
              {v.authority_name.replace("ROLE_", "")}
            </p>
          ))}
        </>
      ),
    },
    {
      title: "전화번호",
      dataIndex: "phone",
      key: "phone",

      ...getColumnSearchProps("phone"),
    },
    {
      title: "담당 주차장",
      dataIndex: "parkingDtoSet",
      key: "parkingDtoSet",

      //...getColumnSearchProps('parkingDtoSet.parkingName'),
      render: (text, record) => <>{text.map((v) => v.parkname)}</>,
    },
    {
      title: "건물",
      dataIndex: "parkingDtoSet",
      key: "parkingDtoSet",

      //...getColumnSearchProps('parkingDtoSet.building'),
      render: (text, record) => <>{text.map((v) => v.building)}</>,
    },
    {
      title: "삭제",
      dataIndex: "username",
      key: "username",

      render: (text, index) => <DeleteUser username={text} />,
    },
    {
      title: "수정",
      dataIndex: "username",
      key: "username",
      render: (text, record) => (
        <Button onClick={() => modalHandler(text)}>수정</Button>
      ),
    },
    // {
    //   title: 'starttime',
    //   dataIndex: 'starttime',
    //   key: 'starttime',
    //   ...getColumnSearchProps('starttime'),
    //   sorter: (a, b) => a.starttime.length - b.starttime.length,
    //   sortDirections: ['descend', 'ascend'],
    // },
    // {
    //   title: 'endtime',
    //   dataIndex: 'endtime',
    //   key: 'endtime',
    //   ...getColumnSearchProps('endtime'),
    //   sorter: (a, b) => a.endtime.length - b.endtime.length,
    //   sortDirections: ['descend', 'ascend'],
    // },
    // {
    //   title: '이상감지',
    //   dataIndex: 'chcked',
    //   filters: [
    //     {
    //       text: 'Y',
    //       value: 'true',
    //     },
    //     {
    //       text: 'N',
    //       value: 'false',
    //     },
    //   ],
    //   key: 'checked',
    //   width: '30%',
    //  // ...getColumnSearchProps('checked')
    // }
  ];

  const [modal, setModal] = useState({ visible: false, record: null });

  const modalHandler = (value) => {
    setModal({ ...modal, visible: true, username: value });
    console.log("modalValue::", value);
  };

  return (
    <div
      style={{
        minWidth: "50%",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        alignContent: "center",
        marginTop: "100px",
        paddingBottom: "50px",
      }}
    >
      <p style={{ fontSize: "40px", textAlign: "center", width: "100%" }}>
        이용자 관리
      </p>
      <Table
        columns={columns}
        dataSource={userdata}
        pagination={{
          position: ["none", "bottomCenter"],
        }}
      />
      <Modal
        title="운영자 정보 수정"
        open={modal.visible}
        onCancel={() => setModal({ ...modal, visible: false })}
        footer={<span style={{ color: "#fff" }}>"null"</span>}
        destroyOnClose={true}
      >
        <UserUpdate record={modal?.username} />
      </Modal>
    </div>
  );
}

export default SearchAllUser;
