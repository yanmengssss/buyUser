import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom"; // 用来渲染子路由
import {
  BookOutlined,
  AreaChartOutlined,
  TeamOutlined,
  PicCenterOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme, Avatar, Space, Popover } from "antd";
import { useNavigate } from "react-router-dom";
const { Header, Content, Sider } = Layout;
import "./index.css";
type MenuItem = Required<MenuProps>["items"][number];
type url = "/home/ShowEcharts" | "/home/PersonManger" | "/home/bookManger";
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("数据展示", "/home/ShowEcharts", <AreaChartOutlined />),
  getItem("人员管理", "/home/PersonManger", <TeamOutlined />),
  getItem("书籍管理", "/home/bookManger", <BookOutlined />),
  getItem("借阅管理", "/home/borrowManger", <PicCenterOutlined />),
];
const keyMap = {
  "/home/ShowEcharts": "数据展示",
  "/home/PersonManger": "人员管理",
  "/home/bookManger": "书籍管理",
  "/home/borrowManger": "借阅管理",
};
const LayoutPage: React.FC = () => {
  const Navigate = useNavigate();
  const [act, setAct] = useState("/home/ShowEcharts");
  const [collapsed, setCollapsed] = useState(false);
  const [place, setplace] = useState("数据展示");
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const changeMenu = (e) => {
    console.log(e.key);
    Navigate(e.key);
    setAct(e.key);
    setplace(keyMap[e.key as url]);
  };
  const content = (
    <p
      style={{ fontSize: "12px", fontWeight: "bold" }}
      onClick={() => {
        localStorage.removeItem("token");
        Navigate("/login");
      }}
    >
      退出登录
    </p>
  );
  useEffect(() => {
    Navigate(act);
  }, [act]);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["/home/ShowEcharts"]}
          mode="inline"
          items={items}
          onClick={changeMenu}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div className="head">
            <Space>
              <Popover placement="bottom" content={content}>
                <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
              </Popover>

              <span>Ye</span>
            </Space>
          </div>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>{place}</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              height: "85vh",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutPage;
