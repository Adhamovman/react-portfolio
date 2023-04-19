import React, { useState } from "react";
import { Button, Form, Input, Modal, Select, Table } from "antd";
import { deleteData, getData, putData, sendData } from "../../server/common";
import { USER_ROLES } from "../../const";
import { toast } from "react-toastify";
import { useFetch } from "../../hooks";

const Users = () => {
  const columns = [
    {
      title: "Firstname",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Lastname",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
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
              editUser(_id);
            }}
          >
            Edit
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => {
              deleteUser(_id);
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
  const { data: users, loading, recall } = useFetch("users");

  const handleOk = () => {
    setIsModalOpen(false);
    form.validateFields().then((values) => {
      delete values.confirm;
      if (selected) {
        values.password || delete values.password;
        putData(`users/${selected}`, { ...values }).then(() => {
          recall();
          setIsModalOpen(false);
        });
      } else {
        sendData("users", values).then((res) => {
          console.log(res);
          recall();
          setIsModalOpen(false);
        });
      }
    });
  };
  function editUser(id) {
    showModal();
    setSelected(id);
    getData(`users/${id}`).then((res) => {
      form.setFieldsValue(res.data);
    });
  }
  function deleteUser(id) {
    Modal.confirm({
      title: "Are you sure?",
      content: "You want to delete this user?",
      okText: "Yes",
      cancelText: "No",
      onOk() {
        deleteData(`users/${id}`).then((res) => {
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
            <h4>Users table</h4>
            <Button className="px-3 " type="primary" onClick={openFormModal}>
              Add user
            </Button>
          </div>
        )}
        dataSource={users}
        columns={columns}
        loading={loading}
        scroll={{ x: 700 }}
      />
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={selected ? "Save user" : "Add user"}
      >
        <Form
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          form={form}
          name="register"
          initialValues={{ role: "client" }}
        >
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[
              {
                required: true,
                message: "Please input your field!",
              },
            ]}
          >
            <Input placeholder="Firstname" />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[
              {
                required: true,
                message: "Please input your field!",
              },
            ]}
          >
            <Input placeholder="Lastname" />
          </Form.Item>
          <Form.Item
            name="username"
            label="User Name"
            rules={[
              {
                required: true,
                message: "Please input your field!",
              },
            ]}
          >
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="role"
            label="Role"
            tooltip="What do you want others to call you?"
            rules={[
              {
                required: true,
                message: "Please input your role!",
                whitespace: true,
              },
            ]}
          >
            <Select
              options={USER_ROLES.map((role, i) => ({
                label: role,
                key: i,
                value: role,
              }))}
            ></Select>
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: selected ? false : true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: selected ? false : true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm Password" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Users;
