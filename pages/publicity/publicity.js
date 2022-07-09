// pages/publicity/publicity.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  // 存储项目公示相关数据
  publicityList:[]
  },
  // 获取项目公示
  async getPublicity() {
    const {data} = await wx.p.request({
      url: 'https://jc.yngyjt.com/api/source/supplierproplanweb/list?pageNum=1&pageSize=10&',
      methods: 'GET'
    })
    console.log(data);
    this.setData({
      publicityList:data.rows
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //页面加载时获取项目公示数据
    this.getPublicity()
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