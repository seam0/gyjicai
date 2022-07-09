// pages/about/about.js
Page({
  /*
   * 页面方法
   * 
   */

  // 请求关于我们相关数据
  async getaboutOur(){
   const {data} =  await wx.p.request({
    url: 'https://www.yngyjt.com/api/siteweb/article/1505332509880967170',
    methods:'GET'
  })
  this.setData({
    aboutText:data.data,
  })
  },

  /**
   * 页面的初始数据
   */
  data: {
    aboutText:[],
    honor:[]
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getaboutOur()
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