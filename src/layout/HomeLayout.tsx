import React, { useState, useEffect } from "react";
import { Layout, Menu, Avatar, Dropdown, Button } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { getUserInfo, logout } from "@/services";
import { Link, useHistory } from "react-router-dom";
import "./HomeLayout.less";
const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

interface Props {
  children: React.ReactNode;
}

export default function HomePageLayout(props: Props) {
  const [collapsed, toggleCollapsed] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const history = useHistory();

  const handleLogout = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    logout().then(() => {
      history.push("/login");
    });
  };
  const userMenu = (
    <Menu>
      <Menu.Item key="0">
        <Button type="link" onClick={(e) => handleLogout(e)}>
          登出
        </Button>
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    getUserInfo().then(({ data }) => {
      setName(data.name);
    });
  }, []);

  return (
    <Layout id="components-layout-custom-trigger">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
        >
          <SubMenu
            key="sub1"
            title={
              <span>
                <UserOutlined />
                <span>nav 1</span>
              </span>
            }
          >
            <Menu.Item key="1">
              <Link to="/home/table">Home</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/home/chart">Chart</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/home/movie">movie-top250</Link>
            </Menu.Item>
          </SubMenu>
          {/* <SubMenu
            key="sub2"
            title={
              <span>
                <VideoCameraOutlined />
                <span>nav 2</span>
              </span>
            }
          >
            <Menu.Item key="4">option5</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="7">Option 7</Menu.Item>
              <Menu.Item key="8">Option 8</Menu.Item>
            </SubMenu>
            <Menu.Item key="6">option5</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub3"
            title={
              <span>
                <UploadOutlined />
                <span>nav 3</span>
              </span>
            }
          >
            <Menu.Item key="7">2</Menu.Item>
            <Menu.Item key="8">3</Menu.Item>
            <Menu.Item key="9">4</Menu.Item>
          </SubMenu> */}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {/* 左边展开按钮 */}
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => toggleCollapsed(collapsed ? false : true),
            }
          )}
          {/* 右边用户 */}
          <div className="user-avatar">
            <Dropdown overlay={userMenu} trigger={["click"]}>
              <Button type="link" onClick={(e) => e.preventDefault()}>
                <span className="user-name">{name}</span>
                <Avatar
                  style={{ backgroundColor: "#87d068" }}
                  icon={<UserOutlined />}
                />
              </Button>
            </Dropdown>
          </div>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
}
