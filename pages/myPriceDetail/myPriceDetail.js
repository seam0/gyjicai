// pages/ProjectDetail/ProjectDetail.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 进度条相关配置
    active:0,
    active1:0,
    steps: [
      {
        text: '审核中',
        desc: '',
      },
      {
        text: '审核完成',
        desc: '',
      },
      {
        text: '已中标',
        desc: '',
      },
    ],
    steps1: [
      {
        text: '审核中',
        desc: '',
      },
      {
        text: '审核完成',
        desc: '',
      },
      {
        text: '未中标',
        desc: '',
      },
    ],
  },
   ceshi(){
    this.setData({
     active:2,
     active1:2
    })
   },
  // 点击提交报价执行的函数
 async submitPrice(){
  Toast({
    type:'success',
    message:'报价成功',
    onClose:()=>{
      wx.navigateBack({
        delta: 1,
      })
    }
  })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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