import React from 'react'
import Wechat from '../services/wechat'
import { Button } from 'antd'

const Battles: React.FC<any> = props => {
  const onRequest = () => {
    const date = '2021-01-27'
    Wechat.requestRpc(
      `db.collection('battles').where({
        createTime: _.gte(new Date('${date}'))
      }).get()`).then(data => console.log(data))
  }
  return <div>
    <Button type="primary" onClick={onRequest}>查询</Button>
  </div>
}
export default Battles;
