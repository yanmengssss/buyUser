import { useState } from "react";
import { Button, Form, Input, Card, message } from "antd";
import { login } from "@/apis/api";
import "./index.less";
import { useNavigate } from "react-router-dom";
const Login: React.FC = () => {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const goLogin = () => {
    if (!account) {
      messageApi.open({
        type: "error",
        content: "账号不能为空",
      });
      return;
    }
    if (!password) {
      messageApi.open({
        type: "error",
        content: "密码不能为空",
      });

      return;
    }

    login({
      account,
      password,
    })
      .then((res) => {
        if (res.code === "0") {
          messageApi.open({
            type: "success",
            content: "登录成功",
          });
          localStorage.setItem("token", res.data.token);
          navigate("/home");
        } else {
          messageApi.open({
            type: "error",
            content: "登录失败",
          });
        }
      })
      .catch((err) => {
        messageApi.open({
          type: "error",
          content: "登录失败",
        });
      });
  };

  return (
    <div className="bg">
      <div className="all">
        <h1 className="title">欢迎登录商品销售管理系统图书管理平台</h1>
        <Card className="card">
          <Form name="basic" autoComplete="off">
            <Form.Item label="账号" name="username">
              <Input
                value={account}
                onChange={(e) => setAccount(e.target.value)}
                placeholder="请输入账号"
              />
            </Form.Item>

            <Form.Item label="密码" name="password">
              <Input.Password
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="请输入密码"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" onClick={goLogin}>
                登录
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
