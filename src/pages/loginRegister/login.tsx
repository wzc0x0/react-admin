import React from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import "./Login.css";
import { login } from "@/services";
import { useHistory } from "react-router-dom";

export default function LoginRegister() {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 }
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 }
  };
  const history = useHistory();
  const onFinish = (values: Record<string, string>) => {
    login(values)
      .then(() => {
        history.replace("/home");
      })
      .catch(res => {
        message.warning(res.msg);
        console.log(res);
      });
  };
  const onFinishFailed = (errorInfo: object) => {
    message.warn(errorInfo);
  };

  return (
    <div className="form-wrapper">
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
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

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
