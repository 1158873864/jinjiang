// pages/modifyMyCard/modifyMyCard.js
const app = getApp()
var api = require('../../util/api.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    
  },

  updateName: function(e) {
    this.data.newMyInfo.username = e.detail.value;
    console.log(this.data.newMyInfo)
  },

  updatePhone: function(e) {
    this.data.newMyInfo.phone = e.detail.value;
  },

  updateEmail: function(e) {
    this.data.newMyInfo.email = e.detail.value;
  },

  updateCity: function(e) {
    this.data.newMyInfo.city = e.detail.value;
  },

  updateCompany: function(e) {
    this.data.newMyInfo.company = e.detail.value;
  },

  updateDepartment: function(e) {
    this.data.newMyInfo.department = e.detail.value;
  },

  updatePosition: function(e) {
    this.data.newMyInfo.position = e.detail.value;
  },

  updateIntro: function(e) {
    this.data.newMyInfo.intro = e.detail.value;
  },

  updateCard: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePath = res.tempFilePaths[0]
        console.log(tempFilePath)
        that.data.myInfo.card = tempFilePath
        that.data.newMyInfo.card = tempFilePath
        that.data.cardDisplay='block'
        that.data.uploadOrModifyCard='修改名片'
        that.setData(that.data)
        
        api.modifyMyCard.call(this)
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   
  },

  onSave: function() {
    /* 检查输入合法性 */
    if (!(this.data.newMyInfo.phone === "" || /^1[34578]\d{9}$/.test(this.data.newMyInfo.phone))) {
      wx.showToast({
        title: '手机号码有误，请重填',
        icon: 'none'
      })
      return
    }
    if (!(this.data.newMyInfo.email === "" || /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/.test(this.data.newMyInfo.email))) {
      wx.showToast({
        title: '邮箱地址有误，请重填',
        icon: 'none'
      })
      return
    }
    console.log(this.data.newMyInfo)
    api.modifyMyInfo.call(this)
  }
})