// app.js
import {promisifyAll} from 'miniprogram-api-promise'

const wxp = wx.p = {}
promisifyAll(wx,wxp)
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  onLaunch(){
    wx.login({
      success: (res) => {
        if (res.code) {
          //发起网络请求，换取openid
          wx.request({
            method: 'POST',
            url: 'https://api.yngy.cloud/wechat/ma/wxa9b14525f3c10f15/code2session',
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 修改请求
            },
            data: {
              code: res.code
            },
            success: (res) => {
              const openId = res.data.openId
              //将openid和sessionkey存入本地缓存
              wx.setStorageSync('openId', res.data.openId)
              if (res.data.userId) {
                // 发送登录请求
                wx.request({
                  url: 'https://api.yngy.cloud/wechat/ma/wxa9b14525f3c10f15/login/' + openId,
                  method: 'POST',
                  header: {
                    'content-type': 'application/x-www-form-urlencoded' // 修改请求
                  },
                  success: (res) => {
                    // 发送登录请求成功后，将返回的access_token存储到本地
                    wx.setStorageSync('token', res.data.access_token)
                  }
                })
              }
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      },
      fail: () => {
        console.log('登录失败！' + res.errMsg)
      }
    })
  },
})
