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
                      url: '/'
                  },
                  {
                      iconfont: 'iconshezhi-tianchong',
                      context: '后台数据',
                      optionData: [
                          {
                              text: '用户数据',
                              optionUrl: ''
                          },
                          {
                              text: '预约数据',
                              optionUrl: ''
                          }],
                      url: ''
                  },
                  {
                      iconfont: 'iconkecheng',
                      context: '学校管理',
                      url: '',
                      optionData: [
                          {
                              text: '学校资质审核',
                              optionUrl: ''
                          },
                          {
                              text: '学校课程审核',
                              optionUrl: ''
                          },
                          {
                              text: '学校教师审核',
                              optionUrl: ''
                          },
                          {
                              text: '学校资讯审核',
                              optionUrl: ''
                          },
                          {
                              text: '学校相册审核',
                              optionUrl: ''
                          },
                          {
                              text: '基础设置审核',
                              optionUrl: ''
                          }
                      ],
                  },
                  {
                      iconfont: 'iconwo',
                      context: '问题反馈',
                      url: ''
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
                      url: '',
                      optionData: [
                          {
                              text: '保证金',
                              optionUrl: ''
                          },
                          {
                              text: '雏鸟年费VIP',
                              optionUrl: ''
                          },
                      ]
                  },
                  {
                      iconfont: 'iconcustom-service',
                      context: '广告上传',
                      url: '',
                      optionData: [
                          {
                              text: '主题广告位',
                              optionUrl: ''
                          },
                          {
                              text: '首页推荐课程',
                              optionUrl: ''
                          },
                          {
                              text: '热门学校广告位',
                              optionUrl: ''
                          },
                          {
                              text: '热门课程广告位',
                              optionUrl: ''
                          },
                          {
                              text: '个人中心广告位',
                              optionUrl: ''
                          },
                          {
                              text: '底部广告位',
                              optionUrl: ''
                          },
                          {
                              text: '登录背景图广告位',
                              optionUrl: ''
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
