// pages/qiyeguanli/qiyeguanli.js
import WxValidate from '../../utils/WxValidate.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token:'',
    show:0,
    //   form:{
    //   enterpriseName:'',//企业名称
    //   orgCode:'', // 企业信用代码
    //   legalPersonName:'', //法人
    //   contactName:'', //联系人
    //   contactPhone:'',//联系电话
    //   enterpriseAddress:'', //企业地址
    // }
    error:[] // 存储错误信息
  },
  //验证函数
  initValidate() {
    const rules = {
      enterpriseName: {
        required: true,
        minlength:5
      },
      orgCode:{
        required: true,
        minlength:18,
        maxlength:18
      },
      contactName:{
        maxlength:5,
        required: true
      },
      contactPhone:{
        tel:true,
        required: true
      },
       contactPhone:{
        tel:true,
        required: true
      },
      enterpriseAddress:{
        required:true
      }
    }
    const messages = {
      enterpriseName: {
        required: '请填写企业名称',
        minlength:'企业名称不能小于5个字符'
      },
      orgCode:{
        required:'请填写企业信用代码',
        minlength:'企业信用代码格式不正确',
      },
      contactName:{
        required:'请填写联系人',
        maxlength:'联系人不能超5个字符'
      },
      contactPhone:{
        tel:'请输入正确的电话号码',
        required:'请输入电话号码'
      },
      enterpriseAddress:{
        required:'请输入企业地址'
      }
    }
    this.WxValidate = new WxValidate(rules, messages)
  },

   // 提交表单
  formSubmit: function (e) {
    console.log('表单数据：', e.detail.value)
    const params = e.detail.value;
    //校验表单
    if (!this.WxValidate.checkForm(params)) {
      // 表单检验不通过
      const error = this.WxValidate.errorList;
      let err = {}
      error.forEach(v => {
        err[v.param] = v
      })
      this.setData({
        error:err
      })
      return false;
    } else {
      // 表单检验通过，执行request请求
     wx.request({
       url: 'https://jc.yngyjt.com/api/account/source/enterprise',
       method:'POST',
       data:params,
       header: {
        "content-type": 'application/json',
        "authorization": "Bearer" + " " + this.data.token
      },
      success(res){
       console.log(res,'提交资料成功')
      }
     })
    }
    
  },


  isLogin(){
    // 页面一加载从缓存中拿到token
    const token = wx.getStorageSync('token')
    if(token){
      this.setData({
        token:token
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.initValidate();
    this.isLogin()
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