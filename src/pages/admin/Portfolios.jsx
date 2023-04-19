import { Button, Table } from "antd";
import React from "react";
import { ROLE, USER_ID } from "../../utils";
import { useFetch } from "../../hooks";

const Portfolios = () => {
  const columns = [
    {
      title: "workName",
      dataIndex: "workName",
      key: "workName",
    },
    {
      title: "companyName",
      dataIndex: "companyName",
      key: "companyName",
    },
    {
      title: "description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "startDate",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "endDate",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Action",
      key: "action",
      width: 180,
      render: () => (
        <span className="d-flex justify-content-between">
          <Button type="primary">Edit</Button>
          <Button type="primary" danger>
            Delete
          </Button>
        </span>
      ),
    },
  ];

  const { data: portfolios, loading } = useFetch(
    `portfolios${ROLE === "client" ? `?user[in]=${USER_ID}` : ``}`
  );
  return (
    <>
      <Table
        title={() => (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h4>Users table</h4>
            <Button className="px-3 " type="primary">
              Add user
            </Button>
          </div>
        )}
        dataSource={portfolios}
        columns={columns}
        loading={loading}
        scroll={{ x: 700 }}
        rowKey={(record) => record.id}
      />
    </>
  );
};

export default Portfolios;
