import React from 'react';
import Wechat from '../services/wechat';
import { Button } from 'antd';

interface BattlesDoc {
  createTime: string;
  isFinished: boolean;
  isOverdue: boolean;
  isStarted: boolean;
  lastUpdate: string;
  managerOpenId: string;
  players: [];
  playersCountToRecord: number;
  records: [];
  reserveFees: boolean;
  totalReserveFees: number;
  verifySum: boolean;
  wxaCodeUrl: string;
  _id: string;
  _openid: string;
}

const Battles: React.FC<any> = (props) => {
  const onRequest = () => {
    const date = '2021-01-27';
    Wechat.requestRpc(
      `db.collection('battles').where({
        createTime: _.gte(new Date('${date}'))
      }).get()`
    )
      .then((data: any) => data.data)
      .then((docs: BattlesDoc[]) => {
        const res = docs.filter((doc: BattlesDoc) => doc.records.length > 0);
        console.log(res);
      });
  };
  return (
    <div>
      <Button type="primary" onClick={onRequest}>
        查询
      </Button>
    </div>
  );
};
export default Battles;
