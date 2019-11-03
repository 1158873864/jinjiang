// pages/me/me.js
const app = getApp();
var api = require('../../util/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    identity: 'manager',
    list: [0,0,0,0]
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    var that = this
    //获取个人信息
    api.getMyInfo.call(this, app.getOpenid())
  },

  

})