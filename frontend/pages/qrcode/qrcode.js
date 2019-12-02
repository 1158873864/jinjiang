// pages/me/createPost/createPost.js
const app = getApp();
var api = require('../../util/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    faceTempUrl: "", // 用户头像url
    qrcode: "../createPost/img/qrcode.jpg", // 二维码字节流,
    user:{},
    imageTempUrl:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
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

        that.setData({
          user: res.data.data.items
        })

        wx.getImageInfo({
          src: user.faceUrl,
          success: (res) => {
            wx.hideLoading()
            var faceTempUrl = res.path
            api.getWxQrCode2.call(that, (res) => {
              console.log(res.imagePath)
              that.setData({
                faceTempUrl: faceTempUrl,
                qrcode: res.imagePath
              })
              that.drawPost()
            })
          }
        })

        // console.log(user.faceUrl)
        // wx.getImageInfo({
        //   src: user.faceUrl,
        //   success: (res) => {
        //     console.log(100)
        //     wx.hideLoading()
        //     var faceTempUrl = res.path
        //       that.setData({
        //         faceTempUrl: faceTempUrl
        //       })
        //       that.drawPost()
        //   }
        // })
        
      }
    })

  },

  drawPost: function () {
    var that = this
    const ctx = wx.createCanvasContext('shareCanvas') //画布大小为600x900
    console.log(0)
    // 底图
    ctx.drawImage('../createPost/img/banner1.jpg', 0, 0, 600, 600)
    console.log(1)
    //ctx.setFillStyle('#F5F6FD')
    ctx.setFillStyle('#FFF')
    ctx.fillRect(0, 600, 600, 300)

    const leftMargin = 30
    // 作者信息
    ctx.setTextAlign('left')    // 文字靠左
    ctx.setFillStyle('#000')  // 文字颜色：黑色
    ctx.setFontSize(25)
    ctx.fillText("长按识别小程序", leftMargin + 100, 685)
    ctx.fillText(this.data.user.username + "的二维码", leftMargin + 100, 720)
    // ctx.fillText(this.data.myInfo.username + " 为您推荐", leftMargin + 100, 700)
    ctx.drawImage(this.data.faceTempUrl, leftMargin, 650, 80, 80)
    // Title
    console.log(this.data.faceTempUrl)
    ctx.setFontSize(40)         // 文字字号：22px
    ctx.fillText("金酱酒庄名片", leftMargin, 820)
    // 小程序码
    const qrImgSize = 200
    ctx.drawImage(this.data.qrcode, 360, 650, qrImgSize, qrImgSize)
    ctx.stroke()
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(() => {
      ctx.draw(true, () => {
        wx.canvasToTempFilePath({
          canvasId: 'shareCanvas',
          success: (res) => {

            wx.hideLoading()
            const path = res.tempFilePath
            that.setData({
              imageTempUrl: path
            })
            console.log('path '+path)
          }
        })
      })
    }, 100)
    
  },

  onSave: function () {
    wx.saveImageToPhotosAlbum({
      filePath: this.data.imageTempUrl,
    })
    wx.showToast({
      title: '保存成功',
    })
  },

  previewImage: function () {
    wx.previewImage({
      urls: [this.data.imageTempUrl],
    })
  }
})