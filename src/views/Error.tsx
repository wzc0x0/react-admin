import React from "react";
import { createBrowserHistory } from "history";
import { Result, Button } from "antd";
const customHistory = createBrowserHistory({ forceRefresh: true });

interface Props {
  status?: any;
  title: string;
  subTitle: string;
}
export default function forbiddenPage({ status, subTitle }: Props) {
  const goHome = () => {
    customHistory.replace("/login");
  };
  return (
    <Result
      status={status}
      title={status}
      subTitle={subTitle}
      extra={
        <Button type="primary" onClick={goHome}>
          回到主页
        </Button>
      }
    ></Result>
  );
}
