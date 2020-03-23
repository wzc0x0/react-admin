import React from "react";
import { Spin } from "antd";
import "./style.less";

export default function PageLoading() {
  return (
    <div className="loading-container">
      <Spin size="large" />
    </div>
  );
}
