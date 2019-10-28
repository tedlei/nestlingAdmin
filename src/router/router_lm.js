// import引入组件
//首页
import homePage from '@/pages/page_lm/homePage/homePage'

//资讯发布
import informationPublish from '@/pages/page_lm/informationPublish/informationPublish'
import informationList from '@/pages/page_lm/informationPublish/informationList'
import addInformation from '@/pages/page_lm/informationPublish/addInformation'
import informationUndergo from '@/pages/page_lm/informationPublish/informationUndergo'

export default [
  {path:'',name:'homePage',component:homePage},

  {path:'informationPublish',component:informationPublish,children:[
      {path:'',name:'informationList',component:informationList},
      {path:'addInformation',name:'addInformation',component:addInformation},
      {path:'informationUndergo',name:'informationUndergo',component:informationUndergo},
    ]},
]