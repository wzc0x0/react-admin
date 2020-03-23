import React from "react";
import { Link, useParams } from "react-router-dom";
import { Result, Button } from "antd";

const errorTips = {
  "404": "页面正在构建中",
  "500": "服务器正在开小差"
};
export default function Error() {
  const { type } = useParams();
  return (
    <Result
      status={type || "404"}
      title={type || "404"}
      subTitle={errorTips[type] || errorTips["404"]}
      extra={
        <Link to="/login" replace>
          <Button type="primary">回到主页</Button>
        </Link>
      }
    />
  );
}
