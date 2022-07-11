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
    
    // 登录
   wx.checkSession({
     success: (res) => {
       return
     },
     fail:(res)=>{
     wx.removeStorageSync('token')
     wx.removeStorageSync('userInfo')
     }
   })
  },
  globalData: {
    userInfo: null
  },
})
