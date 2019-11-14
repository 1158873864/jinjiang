// pages/projects/project.js
const app = getApp();
var api = require('../../util/api.js')
import articleItem from '../../template/articleItem/articleItem'
Page({
  data: {
    complain:{}
  },
  onLoad: function() {
    

  },
  onPullDownRefresh: function() {

  },
  onShow: function(){
    wx.request({
      url: app.globalData.backendUrl + "complain/find/all",
      data: {
        page: 0,
        size: 1000
      },
      header: {
        'Authorization': 'Bearer ' + app.getToken(),
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'GET',
      success: (res) => {
        /*console.log(res)*/
        var complain = res.data.data.items.content

        this.setData({
          complain: res.data.data.items.content
        })
      }
    })
  }
})