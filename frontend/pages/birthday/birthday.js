//index.js
// 获取应用实例
const app = getApp()
var api = require('../../util/api.js')
const {
  bg1
} = require('../../util/data.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseList: [],
    user:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.request({
      url: app.globalData.backendUrl + "user/find/openid",
      data: {
        openid: app.getOpenid()
      },
      header: {
        'Authorization': 'Bearer ' + app.getToken(),
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'GET',
      success: (res) => {
        /*console.log(res)*/
        var user = res.data.data.items

        this.setData({
          user: res.data.data.items
        })
        wx.request({
          url: app.globalData.backendUrl + "user/find/shopId",
          data: {
            shopId: user.shopId,
            page:0,
            size:100
          },
          header: {
            'Authorization': 'Bearer ' + app.getToken(),
            'content-type': 'application/x-www-form-urlencoded'
          },
          method: 'GET',
          success: (res) => {
            /*console.log(res)*/
            var list = res.data.data.items.content
            var courseList=[]
            for(var i=0;i<list.length;i++){
              if(list[i].identity=='member'){
                courseList.push(list[i])
              }
            }
            this.setData({
              courseList: courseList
            })
          }
        })

      }
    })

  },
  //展示文章详情
  onTouchThisArticle: function(e) {
    var id = e.currentTarget.dataset.id //获取当前文章id
    wx.navigateTo({
      url: '../nearDetail/nearDetail?id=' + id
    })
  },
  /** 
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})