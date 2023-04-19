import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  RollbackOutlined,
} from "@ant-design/icons";

import { Button, Layout, Menu, theme } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TOKEN, USER } from "../../../const";
import { adminRoutes } from "../../../const/menus";
import "./Admin.scss";

const { Header, Sider, Content } = Layout;

const AdminLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const logOut = () => {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(USER);
    window.location.href = "/";
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo d-flex justify-content-center align-items-center">
          <Link to={"/"}>
            <RollbackOutlined /> Back
          </Link>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            ...adminRoutes.map((menu, i) => ({
              key: i,
              icon: <Link to={"/" + menu.url}>{menu.icon}</Link>,
              label: menu.label,
            })),
            {
              icon: (
                <Link className="logout" onClick={logOut}>
                  <LogoutOutlined />
                </Link>
              ),
              label: "Log Out",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default AdminLayout;
