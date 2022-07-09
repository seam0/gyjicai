// pages/my/my.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    token: '' //存储用户token
  },

  // 跳转页面--------------------------------------------------------------
  // 跳转到账号管理页面
  toPersonal() {
    wx.navigateTo({
      url: '../../pages/personal/personal',
    })
  },

  // 跳转到我的报价页面
  tomyPrice() {
    wx.navigateTo({
      url: '../../pages/myPrice/myPrice',
    })
  },

  // 跳转到企业管理页面
  toQiyeguanli() {
    wx.navigateTo({
      url: '../qiyeguanli/qiyeguanli',
    })
  },

  // 跳转到企业荣誉页面
  toQiyerongyu() {
    wx.navigateTo({
      url: '../qiyerongyu/qiyerongyu',
    })
  },

  // 跳转到关于我们页面
  toAbout() {
    wx.navigateTo({
      url: '../about/about',
    })
  },

  // 跳转到联系我们页面
  toContact() {
    wx.navigateTo({
      url: '../contact/contact',
    })
  },

  // 跳转到帮助页面
  toHelp() {
    wx.navigateTo({
      url: '../help/help',
    })
  },
  // 跳转页面--------------------------------------------------------------

  // 页面显示判断用户登录状态
  islogin() {
    if (this.data.token) {
      // 如果数据中有access_token说明用户已登录
      return
    } else {
      // 数据中没有access_token说明用户未登录
      //  调用登录接口
      this.login()
    }
  },

  // 登录功能-用户已经注册过
  login() {
    wx.login({
      success: (res) => {
        if (res.code) {
          // 显示登录加载中
          wx.showLoading({
            title: '登录中'
          })
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
              console.log(res)
              const openId = res.data.openId
              //将openid和sessionkey存入本地缓存
              wx.setStorageSync('openId', res.data.openId)
              // 通过userId来判断用户是否注册过
              if (res.data.userId) {
                // 有userId, 说明用户已经注册过,直接发送登录请求
                // 发送登录请求
                wx.request({
                  url: 'https://api.yngy.cloud/wechat/ma/wxa9b14525f3c10f15/login/' + openId,
                  method: 'POST',
                  header: {
                    'content-type': 'application/x-www-form-urlencoded' // 修改请求
                  },
                  success: (res) => {
                    // 发送登录请求成功后，将返回的access_token存储到本地
                    this.setData({
                      token: res.data.access_token
                    })
                    wx.setStorageSync('token', res.data.access_token)
                    // 请求后台获取用户信息回写
                    // 关闭登录中弹窗
                    wx.hideLoading()
                    // 提示用户登录成功
                    wx.showToast({
                      title: '登录成功'
                    })
                  },
                  fail(res) {
                    // 登录失败
                    wx.showToast({
                      title: '登录失败，请稍后重试!',
                    })
                  }
                })
              } else {
                // 用户未注册，提示用户点击登录注册
                // 关闭登录中弹窗
                wx.hideLoading({
                  success: (res) => {
                    wx.showModal({
                      showCancel: false,
                      content: '首次登录请点击上方注册/登录按钮进行登录',
                      confirmColor: '#e2292f'
                    })
                  },
                })
              }
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },

  // 登录功能-用户未注册过
  getPhoneNumber(e) {
    if (e.detail.errMsg == 'getPhoneNumber:ok') {
      wx.showLoading({
        title: '登录中',
      })
      // 获取CODE
      wx.login({
        success: (res) => {
          if (res.code) {
            // 发送网络请求换取sessionkey
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
                // 将openid缓存到本地
                const openId = res.data.openId
                const sessionkey = res.data.sessionKey
                // 拿到sessionkey后发送请求获取手机号
                wx.request({
                  url: 'https://api.yngy.cloud/wechat/ma/wxa9b14525f3c10f15/user/phone',
                  header: {
                    'content-type': 'application/x-www-form-urlencoded' // 修改请求
                  },
                  method: 'POST',
                  data: {
                    sessionKey: sessionkey,
                    encryptedData: e.detail.encryptedData,
                    iv: e.detail.iv
                  },
                  success: (res) => {
                    // 拿到用户手机号后发送到后台绑定并登录
                    // 发送登录请求
                    wx.request({
                      url: 'https://api.yngy.cloud/wechat/ma/wxa9b14525f3c10f15/login/' + openId,
                      method: 'POST',
                      header: {
                        'content-type': 'application/x-www-form-urlencoded' // 修改请求
                      },
                      data: {
                        phone: res.data.data.phoneNumber
                      },
                      success: (res) => {
                        // 将access_token存储到本地
                        this.setData({
                          token: res.data.access_token
                        })
                        wx.setStorageSync('token', res.data.access_token)
                        wx.hideLoading()
                        wx.showToast({
                          title: '登录成功！',
                        })
                      },
                      fail() {
                        console.log('登录失败')
                      }
                    })
                  }
                })
              }
            })
          }
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 页面一加载时从本地获取token存入data中
    let token = wx.getStorageSync('token')
    if (token) {
      this.setData({
        token: token
      })
    }
    return
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.islogin()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})