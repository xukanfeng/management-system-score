import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { BattlesDoc } from './types';
import moment from 'moment';
import { ONE_DAY, isSameDate } from '../../utils/date';

type RowData = {
  key: number;
  date: Date;
  totalRecords: number;
  validRecords: number;
};

const columns = [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    render: (date: Date) => <span>{moment(date).format('YYYY/MM/DD')}</span>,
  },
  {
    title: 'Records(valid/total)',
    key: 'records',
    render: (rowData: RowData) => (
      <span>{`${rowData.validRecords}/${rowData.totalRecords}`}</span>
    ),
  },
];

type Props = {
  battles: BattlesDoc[];
  dateRange: string[];
};

const Summary: React.FC<Props> = (props) => {
  const {
    battles,
    dateRange: [startDate, endDate],
  } = props;
  const [tableData, setTableData] = useState([] as RowData[]);

  useEffect(() => {
    const dates = [];
    let date = new Date(startDate);
    while (date <= new Date(endDate)) {
      dates.push(date);
      date = new Date(date.getTime() + ONE_DAY);
    }
    const data: RowData[] = dates.map((date, index) => {
      const arr: any[] = [];
      battles.forEach((battle) => {
        if (isSameDate(battle.createTime, date)) {
          arr.push(battle);
        }
      });
      const totalRecords = arr.length;
      const validRecords = arr.reduce(
        (prev, cur) => prev + (cur.records.length > 0 ? 1 : 0),
        0
      );
      return { key: index, date, totalRecords, validRecords };
    });
    setTableData(data);
  }, [battles, endDate, startDate]);

  return (
    <div>
      <Table dataSource={tableData} columns={columns}></Table>
    </div>
  );
};

export default React.memo(
  Summary,
  (prevProps, nextProps) => prevProps.battles === nextProps.battles
);
