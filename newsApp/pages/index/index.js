Page({
  data:{
    newsType:[
      {
        text: '国内',
        type: 'gn',
        select: 'selected',
        selectLine: 'selected-line'
      }, 
      {
        text: '国际',
        type: 'gj',
        select: '',
        selectLine: ''
      },
      {
        text: '财经',
        type: 'cj',
        select: '',
        selectLine: ''
      },
      {
        text: '娱乐',
        type: 'yl',
        select: '',
        selectLine: ''
      },
      {
        text: '军事',
        type: 'js',
        select: '',
        selectLine: ''
      },
      {
        text: '体育',
        type: 'ty',
        select: '',
        selectLine: ''
      },
      {
        text: '其他',
        type: 'other',
        select: '',
        selectLine: ''
      }
    ],
    newTypePicURL: '/images/gn-pic.jpg'
  },

  onNewsTypeTap: event => {

  },


})
