import React from 'react'
import Wechat from '../services/wechat'
import { Button } from 'antd'

const Battles: React.FC<any> = props => {
  const onRequest = () => {
    Wechat.request('battles', {
      action: 'query',
      params: {
        _openid: 'o79OX5GScMZ4ICq-Od3nup4XqvXM'
      }
    }).then(data => console.log(data))
  }
  return <div>
    <Button type="primary" onClick={onRequest}>查询</Button>
  </div>
}
export default Battles;
