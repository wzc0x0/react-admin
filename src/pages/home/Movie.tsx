import React, { useEffect, useState } from "react";
import { List, Spin } from "antd";
import { MessageOutlined, StarOutlined } from "@ant-design/icons";
import { getMovies } from "@/services";

const IconText = ({ icon, text }: any) => (
  <span>
    {React.createElement(icon, { style: { marginRight: 8 } })}
    {text}
  </span>
);

interface movie {
  id: number;
  title: string;
  desc: string;
  quote: string;
  img_url: string;
  star: number;
  comment: number;
  country: string;
  year: number;
}

export default function Movie() {
  const [data, setData] = useState<movie[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const pageSize = 3;

  useEffect(() => {
    const setRefer = document.createElement("meta");
    setRefer.name = "referrer";
    setRefer.content = "no-referrer";
    document.body.appendChild(setRefer);
    return () => {
      document.body.removeChild(setRefer);
    };
  });

  useEffect(() => {
    getMovies({ page_size: pageSize, current: page }).then(({ data }) => {
      setData(data.list);
      setTotal(data.total);
    });
  }, [page]);

  return (
    <Spin spinning={data.length === 0}>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page: number) => {
            setPage(page);
          },
          total: total,
          pageSize: pageSize
        }}
        dataSource={data}
        footer={
          <div>
            <b>ant design</b> footer part
          </div>
        }
        renderItem={item => (
          <List.Item
            key={item.id}
            actions={[
              <IconText
                icon={StarOutlined}
                text={item.star}
                key="list-vertical-star-o"
              />,
              <IconText
                icon={MessageOutlined}
                text={item.comment}
                key="list-vertical-message"
              />
            ]}
            extra={<img width={100} alt="logo" src={item.img_url} />}
          >
            <List.Item.Meta
              title={
                <a href="https://baidu.com">{`No.${item.id} ${item.title}  【${item.country}】 【${item.year}】`}</a>
              }
              description={item.desc}
            />
            {item.quote}
          </List.Item>
        )}
      />
    </Spin>
  );
}
