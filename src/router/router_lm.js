// import引入组件
//首页
import homePage from '../pages/page_lm/homePage/homePage'

//后台数据
import userData from '../pages/page_lm/backstageData/userData'
import subscribeData from '../pages/page_lm/backstageData/subscribeData'

//资讯发布
import informationPublish from '../pages/page_lm/informationPublish/informationPublish'
import informationList from '../pages/page_lm/informationPublish/informationList'
import addInformation from '../pages/page_lm/informationPublish/addInformation'
import informationUndergo from '../pages/page_lm/informationPublish/informationUndergo'

//学校用户管理
import schoolManage from '../pages/page_lm/schoolRegulate/schoolManage/schoolManage'
import schoolList from '../pages/page_lm/schoolRegulate/schoolManage/schoolList'
import schoolAuditDetail from '../pages/page_lm/schoolRegulate/schoolManage/schoolAuditDetail'

//课程审核
import curriculumManage from '../pages/page_lm/schoolRegulate/curriculumManage/curriculumManage'
import curriculumList from '../pages/page_lm/schoolRegulate/curriculumManage/curriculumList'
import curriculumDetail from '../pages/page_lm/schoolRegulate/curriculumManage/curriculumDetail'

//教师审核
import teacherManage from '../pages/page_lm/schoolRegulate/teacherManage/teacherManage'
import teacherList from '../pages/page_lm/schoolRegulate/teacherManage/teacherList'
import teacherDetail from '../pages/page_lm/schoolRegulate/teacherManage/teacherDetail'

//资讯审核
import informationManage from '../pages/page_lm/schoolRegulate/informationManage/informationManage'
import informationListMange from '../pages/page_lm/schoolRegulate/informationManage/informationListMange'
import informationDetail from '../pages/page_lm/schoolRegulate/informationManage/informationDetail'

//学校相册审核
import schoolPhoneManage from '../pages/page_lm/schoolRegulate/schoolPhoneManage/schoolPhoneManage'
import schoolPhoneList from '../pages/page_lm/schoolRegulate/schoolPhoneManage/schoolPhoneList'
import schoolPhoneDetail from '../pages/page_lm/schoolRegulate/schoolPhoneManage/schoolPhoneDetail'

//基础设置审核
import basisSettingManage from '../pages/page_lm/schoolRegulate/basisSettingManage/basisSettingManage'
import basisSettingList from '../pages/page_lm/schoolRegulate/basisSettingManage/basisSettingList'
import basisSettingDetail from '../pages/page_lm/schoolRegulate/basisSettingManage/basisSettingDetail'


//基础设置审核
import coupleBack from '../pages/page_lm/coupleBack/coupleBack'
import coupleBackList from '../pages/page_lm/coupleBack/coupleBackList'
import coupleBackDetail from '../pages/page_lm/coupleBack/coupleBackDetail'

//保证金
import pledgeMoney from '../pages/page_lm/pledgeMoney/pledgeMoney'
import pledgeVIP from '../pages/page_lm/pledgeMoney/pledgeVIP'

//主题广告位
import slideshow from '../pages/page_lm/advertising/slideshow'

//首页推荐课程
import recommend from '../pages/page_lm/advertising/recommend/recommend'
import recommendList from '../pages/page_lm/advertising/recommend/list'
import selectSchool from '../pages/page_lm/advertising/recommend/selectSchool'

//个人中心广告位
import personageCenter from '../pages/page_lm/advertising/personageCenter'

//底部广告位
import BottomImg from '../pages/page_lm/advertising/BottomImg'

//登陆背景广告位
import loginBgImg from '../pages/page_lm/advertising/loginBgImg'

//app登陆广告位
import appBgImg from '../pages/page_lm/advertising/appBgImg'


export default [
  {path:'',name:'homePage',component:homePage},

  //后台数据
  {path:'userData',name:'userData',component:userData},
  {path:'subscribeData',name:'subscribeData',component:subscribeData},

  //资讯发布
  {path:'informationPublish',component:informationPublish,children:[
    {path:'',name:'informationList',component:informationList},
    {path:'addInformation',name:'addInformation',component:addInformation},
    {path:'informationUndergo',name:'informationUndergo',component:informationUndergo},
  ]},

  //学校用户管理
  {path:'schoolManage',component:schoolManage,children:[
    {path:'',name:'schoolList',component:schoolList},
    {path:'schoolAuditDetail',name:'schoolAuditDetail',component:schoolAuditDetail}
  ]},

  //课程审核
  {path:'curriculumManage',component:curriculumManage,children:[
    {path:'',name:'curriculumList',component:curriculumList},
    {path:'curriculumDetail',name:'curriculumDetail',component:curriculumDetail}
  ]},

  //教师审核
  {path:'teacherManage',component:teacherManage,children:[
    {path:'',name:'teacherList',component:teacherList},
    {path:'teacherDetail',name:'teacherDetail',component:teacherDetail}
  ]},

  //资讯审核
  {path:'informationManage',component:informationManage,children:[
    {path:'',name:'informationListMange',component:informationListMange},
    {path:'informationDetail',name:'informationDetail',component:informationDetail}
  ]},

  //学校相册审核
  {path:'schoolPhoneManage',component:schoolPhoneManage,children:[
    {path:'',name:'schoolPhoneList',component:schoolPhoneList},
    {path:'schoolPhoneDetail',name:'schoolPhoneDetail',component:schoolPhoneDetail}
  ]},

  //基础设置审核
  {path:'basisSettingManage',component:basisSettingManage,children:[
    {path:'',name:'basisSettingList',component:basisSettingList},
    {path:'basisSettingDetail',name:'basisSettingDetail',component:basisSettingDetail}
  ]},

  //问题反馈
  {path:'coupleBack',component:coupleBack,children:[
    {path:'',name:'coupleBackList',component:coupleBackList},
    {path:'coupleBackDetail',name:'coupleBackDetail',component:coupleBackDetail}
  ]},

  //问题反馈
  {path:'pledgeMoney',name:'pledgeMoney',component:pledgeMoney},
  {path:'pledgeVIP',name:'pledgeVIP',component:pledgeVIP},
  
  //主题广告位
  {path:'slideshow',name:'slideshow',component:slideshow},
  
  //首页推荐课程
  {path:'recommend',component:recommend,children:[
    {path:'',name:'recommendList',component:recommendList},
    {path:'selectSchool',name:'selectSchool',component:selectSchool},
    {path:'curriculumDetail',component:curriculumDetail},
    {path:'schoolAuditDetail',component:schoolAuditDetail},
  ]},


  //个人中心广告位
  {path:'personageCenter',name:'personageCenter',component:personageCenter},

  //底部广告位
  {path:'BottomImg',name:'BottomImg',component:BottomImg},

  //登陆背景广告位
  {path:'loginBgImg',name:'loginBgImg',component:loginBgImg},

  //app登陆广告位
  {path:'appBgImg',name:'appBgImg',component:appBgImg},
]