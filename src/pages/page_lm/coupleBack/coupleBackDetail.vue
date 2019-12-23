<template>
  <div class="cb-app fx">
    <ul class="cb_ul fx">
      <li class="cb_li fx">
        <div class="cb_li_left">
          <span>用户电话</span>
        </div>
        <div class="cb_li_right">
          <span class="cb_li_span">{{couple.problemPhone}}</span>
        </div>
      </li>
      <!-- <li class="cb_li fx">
        <div class="cb_li_left">
          <span>用户名</span>
        </div>
        <div class="cb_li_right">
          <span class="cb_li_span">隔壁老王他妈</span>
        </div>
      </li> -->
      <li class="cb_li fx">
        <div class="cb_li_left">
          <span>反馈标题</span>
        </div>
        <div class="cb_li_right">
          <span class="cb_li_span">{{couple.problemTitle}}</span>
        </div>
      </li>
      <li class="cb_li li_width fx">
        <div class="cb_li_left">
          <span>反馈内容</span>
        </div>
        <div class="cb_li_right minHeight">
          <div class="cb_li_text">
            {{couple.problemContent}}
          </div>
        </div>
      </li>
    </ul>
    <div class="cb_btn">
      <el-button type="primary" :disabled="!up" @click="topAudit(up)">{{up?'上一条':'没有上一条'}}</el-button>
      <el-button class="cb_btn_left" :disabled="!dl" type="primary" @click="topAudit(dl)">{{dl?'下一条':'没有下一条'}}</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      couple:{},
      up:'',
      dl:'',
    };
  },
  created() {
    let num = this.$route.query.num;
    if(num){
      this.getCouple(num);
    }
  },
  methods: {
    topAudit(num){
     if(num){
       this.getCouple(num);
     }
    },

    getCouple(num){
      let url = 'problem/selectProblemById.do'
      let data = {id:''+num}
      this.fetch({url,data,method:'post'},6).then(res=>{
        let {object,up,dl} = res.data;
        this.couple = res.data.object;
        this.up = up?up.id:'';
        this.dl = dl?dl.id:'';
      })
    },

   
    //点击弹窗确认时
    topNotarize(num){
      consoe.log(num)
    },
  }

}

</script>

<style lang='less'>
.cb-app{
  width: 100%;
  height: 100%;
  flex-direction: column;
  overflow-y: auto;
  .cb_ul{
    flex: 1;
    flex-direction: column;
    .cb_li{
      margin-top: 10px;
      padding-right: 20px;
      height: 40px;
      align-items: center;
      .cb_li_left{
        width: 100px;
        text-align: right;
        font-size: 16px;
        color:rgba(102,102,102,1);
      }
      .cb_li_right{
        margin-left: 40px;
        .cb_li_span{
          font-size: 16px;
          color:rgba(51,51,51,1);
        }
        .cb_li_text{
          width: 100%;
          height: 100%;
        }
      }
      .minHeight{
        flex: 1;
        min-height: 100px;
      }
    }
    .li_width{
      flex: 1;
      margin-top: 15px;
      height: auto;
      align-items: stretch;
    }
  }
  .cb_btn{
    margin-top: 30px;
    margin-left: 30px;
    padding-bottom: 20px;
    .cb_btn_left{
      margin-left: 40px;
    }
    .el-button{
      width:150px;
      height:40px;
      border-color: rgba(102,102,102,1);
      background: transparent;
      color:rgba(102,102,102,1);
    }
    .el-button:active{
      background-color: rgba(0,0,0,0.1)
    }
  }
}
</style>