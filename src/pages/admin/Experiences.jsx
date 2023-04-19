import React, { useState } from "react";
import { Button, Form, Input, Modal, Table } from "antd";
import { deleteData, getData, putData, sendData } from "../../server/common";

import { toast } from "react-toastify";
import { useFetch } from "../../hooks";
import { ROLE, USER_ID } from "../../utils";

const Experiences = () => {
  const columns = [
    {
      title: "Work name",
      dataIndex: "workName",
      key: "workName",
    },
    {
      title: "Company name",
      dataIndex: "companyName",
      key: "companyName",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Start date",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "End date",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Action",
      key: "action",
      width: 180,
      render: ({ _id }) => (
        <span className="d-flex justify-content-between">
          <Button
            type="primary"
            onClick={() => {
              editExperience(_id);
            }}
          >
            Edit
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => {
              deleteExperience(_id);
            }}
          >
            Delete
          </Button>
        </span>
      ),
    },
  ];

  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const {
    data: experiences,
    loading,
    recall,
  } = useFetch(`experiences${ROLE === "client" ? `?user[in]=${USER_ID}` : ``}`);
  const handleOk = () => {
    setIsModalOpen(false);
    form.validateFields().then((values) => {
      if (selected) {
        putData(`experiences/${selected}`, { ...values }).then(() => {
          setIsModalOpen(false);
          recall();
        });
      } else {
        sendData("experiences", values).then(() => {
          setIsModalOpen(false);
          recall();
        });
      }
    });
  };
  function editExperience(id) {
    showModal();
    setSelected(id);
    getData(`experiences/${id}`).then((res) => {
      form.setFieldsValue(res.data);
    });
  }
  function deleteExperience(id) {
    Modal.confirm({
      title: "Are you sure?",
      content: "You want to delete this user?",
      okText: "Yes",
      cancelText: "No",
      onOk() {
        deleteData(`experiences/${id}`).then((res) => {
          toast.success("O'chirildi");
          recall();
        });
      },
    });
  }
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const openFormModal = () => {
    showModal();
    setSelected(null);
    form.resetFields();
  };

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
            <h5 className="m-0">Experiences table</h5>
            <Button className="px-3 " type="primary" onClick={openFormModal}>
              Add experience
            </Button>
          </div>
        )}
        dataSource={experiences}
        columns={columns}
        loading={loading}
        scroll={{ x: 700 }}
        rowKey={(record) => record.id}
      />
      <Modal
        title="Add Experience"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={selected ? "Save Experience" : "Add Experience"}
      >
        <Form
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          form={form}
          name="register"
          initialValues={{ role: "client" }}
        >
          <Form.Item
            name="workName"
            label="Work name"
            rules={[
              {
                required: true,
                message: "Please input your field!",
              },
            ]}
          >
            <Input placeholder="Work name" />
          </Form.Item>
          <Form.Item
            name="companyName"
            label="Company name"
            rules={[
              {
                required: true,
                message: "Please input your field!",
              },
            ]}
          >
            <Input placeholder="Company name" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                required: true,
                message: "Please input your field!",
              },
            ]}
          >
            <Input placeholder="Description" />
          </Form.Item>
          <Form.Item
            name="startDate"
            label="Start date"
            rules={[
              {
                required: true,
                message: "Please input your field!",
              },
            ]}
          >
            <Input placeholder="Start date" />
          </Form.Item>
          <Form.Item
            name="endDate"
            label="End date"
            rules={[
              {
                required: true,
                message: "Please input your field!",
              },
            ]}
          >
            <Input placeholder="End date" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Experiences;
