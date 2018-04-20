Page({
  data: {
    newsId:0,
    newsType:'',
  },
  // 页面读取时，获得新闻ID和所属归类数据
  onLoad(option){
    this.setData({
      newsId:option.id,
      newsType:option.type
    })
    this.getDetail()
  },

  getDetail(callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: { 'id': this.data.newsId },
      success: res => {
        let result = res.data.result
        console.log('The detail API data is: ', result)
      },
      fail: res => {
        wx.showToast({
          title: '尴尬了，页面加载失败',
        })
      },
      complete: () => {
        callback && callback()
      }
    })
  },
})