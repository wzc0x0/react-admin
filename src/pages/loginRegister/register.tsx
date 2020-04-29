import React from "react";
import { Form, Input, Button, message } from "antd";
import "./Login.css";
import { register } from "@/services";
import { useHistory } from "react-router-dom";

export default function Register() {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  const history = useHistory();
  const onFinish = (values: Record<string, string>) => {
    register(values)
      .then(() => {
        history.replace("/login");
      })
      .catch((res) => {
        message.warning(res.msg);
        console.log(res);
      });
  };

  return (
    <div className="form-wrapper">
      <Form {...layout} name="basic" onFinish={onFinish}>
        <Form.Item
          label="Username"
          name="name"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
