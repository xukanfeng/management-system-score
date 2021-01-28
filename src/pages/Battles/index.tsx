import React, { useState } from 'react';
import Wechat from '../../services/wechat';
import { DatePicker, Button, Tabs } from 'antd';
import Summary from './Summary';
import Detail from './Detail';
import { BattlesDoc } from './types';

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

const Battles: React.FC<any> = (props) => {
  const [params, setParams] = useState({
    startDate: '',
    endDate: '',
  });
  const [battles, setBattles] = useState([] as BattlesDoc[]);

  const getDateQueryCommand = (startDate: string, endDate: string) => {
    if (startDate && endDate) {
      return `_.gte(new Date('${startDate}')).and(_.lte(new Date('${endDate}')))`;
    } else if (startDate) {
      return `_.gte(new Date('${startDate}'))`;
    } else if (endDate) {
      return `_.lte(new Date('${endDate}'))`;
    } else {
      return `_.lte(new Date())`;
    }
  };

  const onRequest = () => {
    Wechat.requestRpc(
      `
      (async () => {
        const MAX_LIMIT = 100
        const countRes = await db.collection('battles').count()
        const total = countRes.total
        const batches = Math.ceil(total / MAX_LIMIT)
        const tasks = []
        for (let i = 0; i < batches; i++) {
          const promise = db.collection('battles').where({
            createTime: ${getDateQueryCommand(params.startDate, params.endDate)}
          }).skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
          tasks.push(promise)
        }
        return (await Promise.all(tasks)).reduce((acc, cur) => {
          return {
            data: acc.data.concat(cur.data),
            errMsg: acc.errMsg
          }
        })
      })()
      `
    )
      .then((data: any) => data.data)
      .then((docs: BattlesDoc[]) => {
        setBattles(docs);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onDateRangeChange = (dates: any, dateStrings: [string, string]) => {
    setParams({
      ...params,
      startDate: dateStrings[0],
      endDate: dateStrings[1],
    });
  };

  return (
    <div>
      <RangePicker
        showTime={{ format: 'HH:mm' }}
        format="YYYY-MM-DD HH:mm"
        onChange={onDateRangeChange}
      ></RangePicker>
      <Button type="primary" onClick={onRequest}>
        查询
      </Button>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Summary" key="1">
          <Summary
            battles={battles}
            dateRange={[params.startDate, params.endDate]}
          ></Summary>
        </TabPane>
        <TabPane tab="Detail" key="2">
          <Detail battles={battles}></Detail>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Battles;
