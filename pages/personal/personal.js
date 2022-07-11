// pages/personal/personal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },
  toQiyeguanli() {
    wx.navigateTo({
      url: '../qiyeguanli/qiyeguanli',
    })
  },
  // 更改头像昵称方法
  nickName() {
    wx.showModal({
      title: '修改昵称',
      editable: true,
      placeholderText: '请输入您要修改的昵称',
      confirmColor: '#e2292f',
      success: (res) => {
        let newCount = res.content
        if (res.confirm) {
          wx.request({
            url: 'https://api.yngy.cloud/account/user/profile',
            method: 'PUT',
            header: {
              "content-type": 'application/json',
              "authorization": "Bearer" + " " + this.data.token
            },
            data: {
              nickName: newCount
            },
            success: (res) => {
              if (res.data.code === 200) {
                // 从缓存中取出昵称
                let userInfo = wx.getStorageSync('userInfo')
                //将用户输入的值覆盖原来的值
                userInfo.nickName = newCount
                // 更新本地存储的值
                wx.setStorageSync('userInfo', userInfo)
                // 更新页面数据
                this.updateData()
                // 弹框提示用户更新成功
                wx.showToast({
                  title: '更新成功',
                })
              }else{
                console.log(res.data.msg)
              }

            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  // 更新用户数据
  updateData() {
    // 页面加载时，从缓存中加载用户信息
    let userInfo = wx.getStorageSync('userInfo')
    let token = wx.getStorageSync('token')
    this.setData({
      userInfo: userInfo,
      token: token
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 页面一加载，就从本地存储取值渲染到页面上
    this.updateData()
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