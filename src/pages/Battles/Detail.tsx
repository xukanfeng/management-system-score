import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { Records, BattlesDoc } from './types';
import moment from 'moment';

const Detail: React.FC<{ battles: BattlesDoc[] }> = (props) => {
  const { battles } = props;
  const [tableData, setTableData] = useState([] as any[]);

  useEffect(() => {
    setTableData(battles.filter((doc: BattlesDoc) => doc.records.length > 0));
  }, [battles]);

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date: Date) => <span>{moment(date).format('YYYY/MM/DD')}</span>,
    },
    {
      title: 'Records',
      dataIndex: 'records',
      key: 'records',
      render: (records: Records) => <span></span>,
    },
    {},
  ];
  return (
    <div>
      <Table dataSource={tableData} columns={columns}></Table>
    </div>
  );
};

export default Detail;
