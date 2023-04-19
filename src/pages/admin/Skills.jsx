import React, { useState } from "react";
import { Button, Form, Input, Modal, Table } from "antd";
import { deleteData, getData, putData, sendData } from "../../server/common";

import { toast } from "react-toastify";
import { useFetch } from "../../hooks";
import { ROLE, USER_ID } from "../../utils";

const Skills = () => {
  const columns = [
    {
      title: "Skill name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Percent",
      dataIndex: "percent",
      key: "percent",
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
              editSkill(_id);
            }}
          >
            Edit
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => {
              deleteSkill(_id);
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
    data: skills,
    loading,
    recall,
  } = useFetch(`skills${ROLE === "client" ? `?user[in]=${USER_ID}` : ``}`);

  const handleOk = () => {
    setIsModalOpen(false);

    form.validateFields().then((values) => {
      recall();
      if (selected) {
        putData(`skills/${selected}`, { ...values }).then(() => {
          recall();
          setIsModalOpen(false);
        });
      } else {
        sendData("skills", values).then((res) => {
          console.log(res);
          recall();
          setIsModalOpen(false);
        });
      }
    });
  };
  function editSkill(id) {
    showModal();
    setSelected(id);
    getData(`skills/${id}`).then((res) => {
      form.setFieldsValue(res.data);
    });
  }
  function deleteSkill(id) {
    Modal.confirm({
      title: "Are you sure?",
      content: "You want to delete this user?",
      okText: "Yes",
      cancelText: "No",
      onOk() {
        deleteData(`skills/${id}`).then(() => {
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
            <h4>Skills table</h4>
            <Button className="px-3 " type="primary" onClick={openFormModal}>
              Add skill
            </Button>
          </div>
        )}
        dataSource={skills}
        columns={columns}
        loading={loading}
        scroll={{ x: 700 }}
        rowKey={(record) => record.id}
      />
      <Modal
        title="Add skill"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={selected ? "Save skill" : "Add skill"}
      >
        <Form
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          form={form}
          name="register"
          initialValues={{ role: "client" }}
        >
          <Form.Item
            name="name"
            label="Skills name"
            rules={[
              {
                required: true,
                message: "Please input your field!",
              },
            ]}
          >
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item
            name="percent"
            label="Percentage"
            rules={[
              {
                required: true,
                message: "Please input your field!",
              },
            ]}
          >
            <Input placeholder="Percent" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Skills;
