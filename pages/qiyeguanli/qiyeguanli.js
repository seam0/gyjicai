// pages/qiyeguanli/qiyeguanli.js
import WxValidate from '../../utils/WxValidate.js'
import Notify from "../../miniprogram_npm/@vant/weapp/notify/notify"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: '',
    enterpriseId: '',
    businessLicensePicture:'', // 营业执照
    status: '', // 用户审核状态
    enterpriseName: '', //企业名称
    orgCode: '', // 企业信用代码
    legalPersonName: '', //法人
    contactName: '', //联系人
    contactPhone: '', //联系电话
    enterpriseAddress: '', //企业地址
    error: [] // 存储错误信息
  },
  //验证函数
  initValidate() {
    const rules = {
      enterpriseName: {
        required: true,
        minlength: 5
      },
      orgCode: {
        required: true,
        minlength: 18,
        maxlength: 18
      },
      contactName: {
        maxlength: 5,
        required: true
      },
      contactPhone: {
        tel: true,
        required: true
      },
      contactPhone: {
        tel: true,
        required: true
      },
      enterpriseAddress: {
        required: true
      }
    }
    const messages = {
      enterpriseName: {
        required: '请填写企业名称',
        minlength: '企业名称不能小于5个字符'
      },
      orgCode: {
        required: '请填写企业信用代码',
        minlength: '企业信用代码格式不正确',
      },
      contactName: {
        required: '请填写联系人',
        maxlength: '联系人不能超5个字符'
      },
      contactPhone: {
        tel: '请输入正确的电话号码',
        required: '请输入电话号码'
      },
      enterpriseAddress: {
        required: '请输入企业地址'
      }
    }
    this.WxValidate = new WxValidate(rules, messages)
  },

  // 点击上传图片要触发的功能
  uplodeImage() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      maxDuration: 30,
      camera: 'back',
      success:(res)=> {
        console.log(res.tempFiles[0].tempFilePath)
        wx.uploadFile({
          url: 'https://api.yngy.cloud/account/source/file', 
          filePath: res.tempFiles[0].tempFilePath,
          header: {
            "content-type": 'application/json',
            "authorization": "Bearer" + " " + this.data.token
          },
          authFile:res.tempFiles[0].tempFilePath,
          name: 'authFile',
          method:'POST',
          success :(res)=>{
            this.setData({
              businessLicensePicture:JSON.parse(res.data).imgUrl
            })
          }
        })
      }
    })
  },
  // 提交表单
  formSubmit: function (e) {
    console.log('表单数据：', e.detail.value)

    const params = e.detail.value;
     params.businessLicensePicture = this.data.businessLicensePicture
     console.log(params)
    //校验表单
    if (!this.WxValidate.checkForm(params)) {
      // 表单检验不通过
      const error = this.WxValidate.errorList;
      let err = {}
      error.forEach(v => {
        err[v.param] = v
      })
      this.setData({
        error: err
      })
      return false;
    } else {
      // 表单检验通过，执行request请求
      wx.request({
        url: 'https://api.yngy.cloud/account/source/enterprise',
        method: 'POST',
        data: params,
        header: {
          "content-type": 'application/json',
          "authorization": "Bearer" + " " + this.data.token
        },
        success: (res) => {
          let enterpriseId = res.data.data.enterpriseId
          if (res.data.code === 200) {
            wx.request({
              method: 'GET',
              url: 'https://api.yngy.cloud/account/source/enterprise/approve/' + enterpriseId,
              header: {
                "content-type": 'application/json',
                "authorization": "Bearer" + " " + this.data.token
              },
              success: (res) => {
                // 说明提交资料成功,更新状态
                wx.request({
                  url: 'https://api.yngy.cloud/account/source/enterprise/' + enterpriseId,
                  header: {
                    "content-type": 'application/json',
                    "authorization": "Bearer" + " " + this.data.token
                  },
                  method: 'GET',
                  success: (res) => {
                    console.log(res, '5555555555')
                    this.setData({
                      status: res.data.data.approveStatus,
                      enterpriseName: res.data.data.enterpriseName, //企业名称
                      orgCode: res.data.data.orgCode, // 企业信用代码
                      legalPersonName: res.data.data.legalPersonName, //法人
                      contactName: res.data.data.contactName, //联系人
                      contactPhone: res.data.data.contactPhone, //联系电话
                      enterpriseAddress: res.data.data.enterpriseAddress, //企业地址
                    })
                    wx.showToast({
                      title: '提交资料成功',
                    })
                  }
                })
              }
            })
          } else {
            Notify({
              type: 'danger',
              message: '企业名称已存在'
            });
          }

        }
      })
    }

  },

  // 撤销提交
  cancelSubmit() {
    wx.request({
      url: 'https://api.yngy.cloud/account/source/enterprise/cancel/' + this.data.enterpriseId + '?',
      header: {
        "content-type": 'application/json',
        "authorization": "Bearer" + " " + this.data.token
      },
      success: (res) => {
        if(res.data.code === 200){
            // 撤销提交成功后更新状态
        // 说明提交资料成功,更新状态
        wx.request({
          url: 'https://api.yngy.cloud/account/source/enterprise/' + this.data.enterpriseId,
          header: {
            "content-type": 'application/json',
            "authorization": "Bearer" + " " + this.data.token
          },
          method: 'GET',
          success: (res) => {
            this.setData({
              status: res.data.data.approveStatus,
              enterpriseName: '', //企业名称
              orgCode: '', // 企业信用代码
              legalPersonName: '', //法人
              contactName: '', //联系人
              contactPhone: '', //联系电话
              enterpriseAddress: '', //企业地址
              businessLicensePicture:res.data.data.businessLicensePicture // 营业执照
            })
          }
        })
        }else{
          wx.showToast({
            title: res.data.msg,
            icon:'none',
            duration:2000
          })
        }
      }
    })
  },

  isLogin() {
    // 页面一加载从缓存中拿到token
    const token = wx.getStorageSync('token')
    if (token) {
      this.setData({
        token: token,
      })
    }
  },

  // 查询用户状态
  status() {
    wx.request({
      url: 'https://api.yngy.cloud/account/user/getInfo',
      method: 'GET',
      header: {
        "content-type": 'application/json',
        "authorization": "Bearer" + " " + this.data.token
      },
      success: (res) => {
        console.log(res ,'查询用户状态及信息')
        this.setData({
          status: res.data.enterpriseStatus,
          enterpriseId: res.data.users.enterpriseId
        })
        // 查询用户注册的企业信息
        wx.request({
          url: 'https://api.yngy.cloud/account/source/enterprise/' + this.data.enterpriseId,
          header: {
            "content-type": 'application/json',
            "authorization": "Bearer" + " " + this.data.token
          },
          method: 'GET',
          success: (res) => {
            console.log(res,'dksjkfjksj')
            this.setData({
              status: res.data.data.approveStatus,
            })
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.initValidate();
    this.isLogin()
    this.status()
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