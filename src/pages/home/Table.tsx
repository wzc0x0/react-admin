import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { getCounties } from "@/services";

interface Counties {
  key: number;
  code: string;
  name: string;
  population: number;
}

export default function HomePage() {
  const [lists, setLists] = useState<Counties[]>([]);
  const columns = [
    {
      title: "国家代码",
      dataIndex: "code"
    },
    {
      title: "国家",
      dataIndex: "name"
    },
    {
      title: "人口",
      dataIndex: "population",
      render: (population: number): string => population.toLocaleString()
    }
  ];
  useEffect(() => {
    getCounties().then(({ data }) => {
      setLists(
        data.list.map((item: Counties, i: number) => {
          item.key = i;
          return item;
        })
      );
    });
  }, []);
  return <Table<Counties> bordered dataSource={lists} columns={columns} />;
}
