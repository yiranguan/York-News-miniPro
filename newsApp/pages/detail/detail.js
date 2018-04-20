let TOUCHDOT = 0  // 滑动触摸开始位置
let INTERVAL = '' // 滑动行为持续的时间
let NOWIDINDEX = 0 // 实时记录现在的ID在this.data.newsIdList中的位置

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
  // 页面显示时，计时器清零
  onShow() {
    clearInterval(INTERVAL);
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
      },
      complete: res => {
        this.getNewsIdIndex()
      }
    })
  },
  // 开始触摸屏幕
  contentTouchStart(event) {
    TOUCHDOT = event.touches[0].pageX // 获取触摸时的原点
    // 使用js计时器记录时间    
    INTERVAL = setInterval(() => { }, 100)
  },
  // 结束触摸屏幕
  contentTouchEnd(event) {
    let touchMove = event.changedTouches[0].pageX
    let len = this.data.newsIdList.length
    // 向左滑动   
    if (touchMove - TOUCHDOT <= -100) {
      if (NOWIDINDEX<len-1) {
        let newsId = this.data.newsIdList[NOWIDINDEX + 1]
        NOWIDINDEX += 1
        this.setData({
          newsId: newsId
        })
        this.getDetail()
      }

    }
    // 向右滑动   
    if (touchMove - TOUCHDOT >= 100) {
      if (NOWIDINDEX>0) {
        let newsId = this.data.newsIdList[NOWIDINDEX - 1]
        NOWIDINDEX -= 1
        this.setData({
          newsId: newsId
        })
        this.getDetail()
      }
    }
    clearInterval(INTERVAL); // 清除setInterval
  },
  // 下拉刷新
  onPullDownRefresh() {
    this.getDetail(() => {
      wx.stopPullDownRefresh()
    })
  },
  // 点击“返回”键后退
  onBackButtonTap(){
    wx.navigateBack({
      delta: 1
    })
  },
  // 获得现页面ID在this.data.newsIdList这个list里面的index
  getNewsIdIndex(){
    let id = this.data.newsId
    this.data.newsIdList.forEach((val, index, arr) => {
      if (id == val){
        NOWIDINDEX = index
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