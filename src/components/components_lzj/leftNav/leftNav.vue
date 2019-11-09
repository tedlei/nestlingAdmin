<template>
    <div class="nav fx" ref="nav">
        <sideBar :listData="listData"></sideBar>
    </div>
</template>

<script>
    import sideBar  from './sideBar'
    export default {
        components: {sideBar},
        data(){
          return {
              listData: [
                  {
                      iconfont: 'iconshouyex',
                      context: '首页',
                      url: ''
                  },
                  {
                      iconfont: 'iconshezhi-tianchong',
                      context: '后台数据',
                      url:'userData',
                      optionData: [
                        {
                            text: '用户数据',
                            optionUrl: 'userData'
                        },
                        {
                            text: '预约数据',
                            optionUrl: 'subscribeData'
                        }],
                  },
                  {
                      iconfont: 'iconkecheng',
                      context: '学校管理',
                      url: 'schoolManage',
                      optionData: [
                          {
                              text: '学校增删管理',
                              optionUrl: 'schoolManage'
                          },
                          {
                              text: '学校资质审核',
                              optionUrl: 'schoolManage'
                          },
                          {
                              text: '学校课程审核',
                              optionUrl: 'curriculumManage'
                          },
                          {
                              text: '学校教师审核',
                              optionUrl: 'teacherManage'
                          },
                          {
                              text: '学校资讯审核',
                              optionUrl: 'informationManage'
                          },
                          {
                              text: '学校相册审核',
                              optionUrl: 'schoolPhoneManage'
                          },
                          {
                              text: '基础设置审核',
                              optionUrl: 'basisSettingManage'
                          }
                      ],
                  },
                  {
                      iconfont: 'iconwo',
                      context: '问题反馈',
                      url: 'coupleBack'
                  },
                  {
                      iconfont: 'iconzixuntianchong',
                      context: '资讯发布',
                      url: 'informationPublish'
                  },
                  {
                      iconfont: 'iconxiangce',
                      context: '优惠劵',
                      url: 'coupon'
                  },
                  {
                      iconfont: 'iconliuyan-fill',
                      context: '雏鸟账单',
                      url: 'pledgeMoney',
                      optionData: [
                          {
                              text: '保证金',
                              optionUrl: 'pledgeMoney'
                          },
                          {
                              text: '雏鸟年费VIP',
                              optionUrl: 'pledgeVIP'
                          },
                      ]
                  },
                  {
                      iconfont: 'iconcustom-service',
                      context: '广告上传',
                      url: 'slideshow',
                      optionData: [
                          {
                              text: '主题广告位',
                              optionUrl: 'slideshow'
                          },
                          {
                              text: '首页广告位',
                              optionUrl: 'recommend'
                          },
                        //   {
                        //       text: '热门学校广告位',
                        //       optionUrl: ''
                        //   },
                        //   {
                        //       text: '热门课程广告位',
                        //       optionUrl: ''
                        //   },
                          {
                              text: '个人中心广告位',
                              optionUrl: 'personageCenter'
                          },
                          {
                              text: '底部广告位',
                              optionUrl: 'BottomImg'
                          },
                          {
                              text: '登录背景图广告位',
                              optionUrl: 'loginBgImg'
                          }
                      ]
                  }
              ]
          }
        },
        mounted() {
            let htm = document.querySelector('html'),
                w = htm.getBoundingClientRect().width;
            w = Math.max(1440, w);

            this.$refs.nav.style.width = 300 / 1920 * w + 'px';
        }
    }
</script>

<style lang="less" scoped>
    .nav{
        overflow-y: auto;
        width: 300px;
        background-color: #47525E;
    }
    .nav::-webkit-scrollbar{
        width: 0;
    }
</style>
