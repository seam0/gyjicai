// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 首页轮播图数据
    urlList: [],
    active: 0,
  },
  onChange(event) {
    // event.detail 的值为当前选中项的索引
    console.log(event.detail);
    this.setData({
      active: event.detail
    });
    if (this.data.active === 0) {
      wx.switchTab({
        url: '../home/home',
      })
    } else {
      wx.switchTab({
        url: '../my/my',
      })
    }
  },
  // 请求轮播图数据方法
  async getBanner() {
    const {
      data
    } = await wx.p.request({
      url: 'http://www.yngyjt.com/api/siteweb/images/list/carousel?pageSize=8&pageNum=1',
      methods: 'GET'
    })
    this.setData({
      urlList: data.rows
    })
  },
  toProjectDetail() {
    wx.navigateTo({
      url: '../../pages/ProjectDetail/ProjectDetail',
    })
  },
  // 跳转到企业管理页面
  toQiyeguanli() {
    const token = wx.getStorageSync('token')
    if (token) {
      wx.navigateTo({
        url: '../../pages/qiyeguanli/qiyeguanli',
      })
    } else {
      wx.showToast({
        title: '请登录后重试',
        icon: 'none',
        duration: 2000
      })
    }
  },
  // 跳转到项目公示页面
  toPulicity() {
    wx.navigateTo({
      url: '../../pages/publicity/publicity',
    })
  },
  // 跳转到项目管理
  toProject() {
    wx.navigateTo({
      url: '../../pages/project/project',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 在页面加载时调用接口获取轮播图数据
    this.getBanner(),
      // 在页面加载时判断登录状态
      this.loginStatus()
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