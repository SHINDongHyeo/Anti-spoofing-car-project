import { Table } from 'antd';
import qs from 'qs';
import React, { useEffect, useState } from 'react';
const columns = [
  {
    title: '차량번호',
    dataIndex: 'carnum',
    sorter: true,
    //render: (name) => `${name.first} ${name.last}`,
    width: '20%',
  },
  {
    title: '이상감지',
    dataIndex: 'chcked',
    filters: [
      {
        text: 'Y',
        value: 'true',
      },
      {
        text: 'N',
        value: 'false',
      },
    ],
    width: '20%',
  },
  {
    title: '입차시간',
    dataIndex: 'entertime',
  },
  {
    title: '출차시간',
    dataIndex: 'exittime',
  },
  {
    title: '사진',
    dataIndex: '사진',
  },
];
const getRandomuserParams = (params) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});
function GenderTable(){
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const fetchData = () => {
    setLoading(true);
    fetch(`https://randomuser.me/api?${qs.stringify(getRandomuserParams(tableParams))}`)
      .then((res) => res.json())
      .then(({ results }) => {
        setData(results);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: 200,
            // 200 is mock data, you should read it from server
            // total: data.totalCount,
          },
        });
      });
  };

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(tableParams)]);
  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };
  return (
    <Table
      columns={columns}
      rowKey={(record) => record.login.uuid}
      dataSource={data}
      pagination={tableParams.pagination}
      loading={loading}
      onChange={handleTableChange}
    />
  );
};
export default GenderTable;