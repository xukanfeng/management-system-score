import config from '../config/config'

class Wechat {
  access_token = ''
  expires_in = 0

  constructor() {
    this.getAccessToken()
  }

  getAccessToken() {
    const url = `/cgi-bin/token?grant_type=client_credential&appid=${config.wechat.appid}&secret=${config.wechat.secret}`
    fetch(url).then(response => response.json()).then(data => {
      const {
        access_token,
        expires_in // 7200s
      } = data
      console.log('access_token updated: ' + access_token)
      this.access_token = access_token
      setTimeout(() => this.getAccessToken(), expires_in * 1000 * 0.9)
    })
  }

  request(cloudFunction: string, params: object) {
    const url = `/tcb/invokecloudfunction?access_token=${this.access_token}&env=${config.wechat.env}&name=${cloudFunction}`
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'post',
        body: JSON.stringify(params)
      }).then(response => response.json()).then(data => {
        const { errcode, errmsg, resp_data } = data
        if (errcode === 0) {
          const { errcode, errmsg, data } = JSON.parse(resp_data)
          if (errcode === 0) {
            resolve(data)
          } else {
            reject(errmsg)
          }
        } else reject(errmsg)
      })
    })
  }
}

export default new Wechat()