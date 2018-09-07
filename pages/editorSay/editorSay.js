// pages/editorSay/editorSay.js
import api from '../../api/api.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0, // 保存首页小编说点击item传过来的id
    loading: false, //限制滑到底部时会请求多次
    editorSayList: [], //小编说数据list
    nextPage: 1, //小编说的list下一页
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(opt) {
    this.setData({
      id: opt.id
    })
    this.getEditorSayList()
  },

  // 获取数据
  getEditorSayList() {
    this.setData({
      loading: false
    })
    api.getEditorSayList({
      data: {
        id: this.data.id,
        page: this.data.nextPage
      },
      success: (res) => {
        let nextPage = res.data.result.pagination.current_page + 1 > res.data.result.pagination.page_count ? false : res.data.result.pagination.current_page + 1;
        this.setData({
          editorSayList: this.data.editorSayList.concat(res.data.result.articals),
          nextPage: nextPage,
          loading: true
        })
      }
    })
  },


  // 滑动到底部加载更多数据
  scrolltolower() {
    if (this.data.loading && this.data.nextPage) {
      this.getEditorSayList();
    }
  },

  // 小编说图片点击， 打开预览或者跳转详情页
  itemClick(opt) {
    let typeTid = opt.currentTarget.dataset;
    if (typeTid.data.type == 'g') {
      wx.navigateTo({
        url: `/pages/detail/detail?id=${typeTid.data.tid}`,
      })
    } else if (typeTid.data.type == 'i') {
      let picArr = typeTid.imgbox.map(item=>item.pic)
      wx.previewImage({
        current: typeTid.data.pic, // 当前显示图片的http链接
        urls: picArr // 需要预览的图片http链接列表
      })
    }
  }
})