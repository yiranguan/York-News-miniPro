Page({
  data: {
    newsId:0,
    newsType:'',
    detailData:{},
    newsIdList:[],
  },
  // 页面读取时，获得新闻ID和所属归类数据
  onLoad(option){
    this.setData({
      newsId:option.id,
      newsType:option.type
    })
    this.getDetail()
  },
  // onLoad（）加载完成后，获取该新闻分类内每条新闻的ID，发送到this.data.newsIdList
  onReady(){
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: { 'type': this.data.newsType },
      success: res => {
        let result = res.data.result
        let newsIdList = []
        let len = result.length
        for(let i=0; i<len; i++){
          newsIdList.push(result[i].id)
        }
        this.setData({
          newsIdList:newsIdList
        })
      },
      fail: res => {
        wx.showToast({
          title: '尴尬了，页面加载失败',
        })
      }
    })
  },
  // 获取新闻详情数据
  getDetail(callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: { 'id': this.data.newsId },
      success: res => {
        let result = res.data.result
        result.date = result.date.slice(0, 10) + ' ' + result.date.slice(11, 16)
        
        this.setData({
          detailData:result
        })
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