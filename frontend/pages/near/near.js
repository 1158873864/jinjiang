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
    page:0,
    tempcourseList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        // wx.showModal({
        //   title: '当前位置',
        //   content: '经度' + res.longitude + '纬度' + res.latitude,
        // })

        wx.request({
          url: app.globalData.backendUrl + "shop/find/all/wx",
          data: {
            longitude: longitude,
            latitude:latitude
          },
          header: {
            'Authorization': 'Bearer ' + app.getToken(),
            'content-type': 'application/x-www-form-urlencoded'
          },
          method: 'GET',
          success: (res) => {
            /*console.log(res)*/
            var courseList = res.data.data.items
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
  
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})