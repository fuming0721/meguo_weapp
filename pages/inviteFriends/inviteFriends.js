// pages/inviteFriends/inviteFriends.js
import api from '../../api/api.js'
const sysInfo = getApp().globalData.sysInfo
console.log(sysInfo)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgArr: [],
    currentIndex: 0,
    animationData: {}, //弹窗动画
    shareHeight: `${sysInfo.screenHeight}px`,
    disableShareBtn: true,
    currentShareImg: null  //当前选中要分享的图片
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '生成中',
    })
    this.getInvitationImg()
  },

  // 获取数据
  getInvitationImg() {
    api.getInvitationImg({
      success: res => {
        this.setData({
          imgArr: res.data.imgUrl,
          disableShareBtn: false
        })
        wx.hideLoading()
      }
    })
  },

  // 轮播检测
  imgChange(e) {
    this.setData({
      currentIndex: e.detail.current
    })
  },

  // 复制邀请码
  cpoyCode(){
    wx.setClipboardData({
      data: getApp().globalData.userInfo.invitation_code,
    })
  },

  // 打开图片弹窗
  showTaokouling() {
    this.animation.translate(0, -sysInfo.screenHeight).step({
      duration: 200
    })
    this.setData({
      animationData: this.animation.export(),
      currentShareImg: this.data.imgArr[this.data.currentIndex]
    })
  },

// 关闭弹窗
  closeShare(){
    this.animation.translate(0, 0).step({
      duration: 200
    })
    this.setData({
      animationData: this.animation.export()
    })
  },

  saveImg(){
    wx.getSetting({
      success: res=> {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success:()=> {
              this.downLoadShareImg()
            },
            fail:()=>{
              wx.showModal({
                title: '温馨提示',
                content: '不授权将不能获取到图片，请在设置里打开授权！',
                showCancel: false,
                confirmColor: '#f35'
              })
            }
          })
        }else{
          this.downLoadShareImg()
        }
      }
    })
  },

  downLoadShareImg(){
    let that = this
    wx.downloadFile({
      url: this.data.imgArr[this.data.currentIndex],
      success: res => {
        // 图片保存到本地
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(data){
            that.closeShare()
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000
            })
          }
        })
      }
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
    var animation = wx.createAnimation({
      timingFunction: 'ease-in',
    })
    this.animation = animation
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