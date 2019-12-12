<template>
  <div class="iam-app">
    <ul class="iam_ul">
      <!-- <li class="iam_li fx">
        <div class="iam_li_left">
          <span>学校全称</span>
        </div>
        <div class="iam_li_right">
          <span class="iam_li_span">重庆龙丰教育学校</span>

          <span class="iam_li_span_j">普通入驻+保证金+学校年费VIP</span>
          <span class="iam_li_span_j">金牌合作</span>
          <span class="iam_li_span_j">诚信保证</span>
        </div>
      </li> -->
      <li class="iam_li fx">
        <div class="iam_li_left">
          <span>标题</span>
        </div>
        <div class="iam_li_right">
          <span class="iam_li_span">{{infoObj.schoolTopic}}</span>
        </div>
      </li>
      <li class="iam_li fx">
        <div class="iam_li_left">
          <span>资讯分类</span>
        </div>
        <div class="iam_li_right">
          <span class="iam_li_span">{{infoObj.schoolMessage}}</span>
        </div>
      </li>
      <li class="iam_li fx">
        <div class="iam_li_left">
          <span>作者</span>
        </div>
        <div class="iam_li_right">
          <span class="iam_li_span">{{infoObj.schoolAuthor}}</span>
        </div>
      </li>
      
      <li class="iam_li li_width fx">
        <div class="iam_li_left">
          <span>资讯内容</span>
        </div>
        <div class="iam_li_right minHeight">
          <div class="iam_li_text" v-html="infoObj.schoolContent"></div>
        </div>
      </li>
    </ul>
    <div class="iam_btn" v-if="!auditPass">
      <!-- <el-button :disabled="isForbiddenBnt" type="primary" @click="topAudit(true)">审核通过</el-button> -->
      <el-button :disabled="isForbiddenBnt" class="iam_btn_left" type="primary" @click="topAudit(true)">下架</el-button>
      <div class="iam_tc fx" v-show="isShowTc" @click="topCloseTc">
        <div class="iam_tc_d">
          <p class="iam_tc_p fx">
            <span>不通过原因或理由</span>
            <i class="el-icon-close" @click.stop="topCloseTc"></i>
          </p>
          <div class="iam_tc_input">
            <el-input
              type="textarea"
              :rows="8"
              placeholder="请输入内容"
              v-model="textarea">
            </el-input>
          </div>
          <div class="iam_tc_btn">
            <el-button type="primary" @click="topNotarize()">确认</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:['auditPass'],
  data () {
    return {
      isForbiddenBnt:false,   //是否禁用按钮
      isShowTc:false,   //是否显示弹窗
      textarea:'',
      infoObj:{},
    };
  },
  created() {
    let {num} = this.$route.query;
    this.getInfoObj(num);
  },
  methods: {
    //查询资讯详细
    getInfoObj(id){
      let url = '/getMessage/byId.do';
      let data = {id};
      this.fetch({url,data,method:'post'},6).then(res=>{
        this.infoObj = res.data;
      })
    },
    
    //下架
    topAudit(boole){
      this.isShowTc = boole
    },

    //关闭弹窗
    topCloseTc(){
      if(event.currentTarget!==event.target)return
      this.isShowTc = false;
      this.isForbiddenBnt = false;
    },

    //点击弹窗确认时
    topNotarize(){
      let url = '/getMessage/update.do';
      let message = this.textarea
      if(!message.replace(/\s*/g,"")){
        this.$message({message:'请输入原因！',type:'warning'});
        return
      }
      let data = {
        id:this.infoObj.id,
        schoolId:this.infoObj.schoolId,
        message
      };
      // console.log(data);
      // return 
      this.fetch({url,data,method:'post'},6).then(res=>{
        let {message,success} = res.data;
        if(success){
          this.push({path:'/index/informationManage',query:{id:this.$route.query.id}})
        }
        this.$message({message,type:success?'success':'warning'});
        this.isShowTc = false;
      })
    },
  }
}

</script>

<style lang='less'>
.iam-app{
  width: 100%;
  height: 100%;
  overflow-y: auto;
  .iam_ul{
    .iam_li{
      margin-top: 10px;
      height: 40px;
      align-items: center;
      .iam_li_left{
        width: 100px;
        text-align: right;
        font-size: 16px;
        color:rgba(102,102,102,1);
      }
      .iam_li_right{
        flex: 1;
        margin-left: 40px;
        .iam_li_span{
          font-size: 16px;
          color:rgba(51,51,51,1);
        }
        .iam_li_span_j{
          margin-left: 20px;
          display:inline-block;
          height:26px;
          background:rgba(255,228,214,1);
          text-align: center;
          line-height: 26px;
          font-size: 14px;
          color:rgba(255,114,37,1);
          border-radius:3px;
        }
        .iam_li_text{
          padding-right: 10px;
          width: 100%;
          height: 100%;
          overflow: hidden;
          img{
            display: block;
            // display: none;
            // margin: auto;
            // max-width: 100%;

          }
        }
      }
      .minHeight{
        flex: 1;
        min-height: 295px;
      }
    }
    .li_width{
      margin-top: 15px;
      height: auto;
      align-items: stretch;
    }
  }
  .iam_btn{
    margin-top: 30px;
    margin-left: 30px;
    padding-bottom: 20px;
    .iam_btn_left{
      margin-left: 40px;
    }
    .iam_tc{
      position:absolute;
      width: 100%;
      height: 100%;
      background:rgba(0,0,0,0.1);
      justify-content: center;
      align-items: center;
      top: 0;
      left: 0;
      z-index: 10001;
      .iam_tc_d{
        padding:10px;
        width:400px;
        height:260px;
        background: white;
        box-shadow:0px 0px 21px 0px rgba(0, 0, 0, 0.11);
        border-radius:5px;
        .iam_tc_p{
          padding-bottom: 10px;
          justify-content: space-between;
          span{
            font-size: 16px;
            color:rgba(51,51,51,1);
          }
          i{
            font-size: 24px;
            cursor: pointer;
          }
          i:active{
            color: rgba(191,191,191,1);
          }
        }
        .iam_tc_input{
          width: 100%;
          height: 160px;
          border: 1px solid rgba(151,151,151,1);
          border-radius: 5px;
          overflow: hidden;
          .el-textarea__inner{
            border:0;
            font-size: 16px;
          }
        }
        .iam_tc_btn{
          padding-top: 5px;
          text-align: center;
        }
      }
    }
  }
}
</style>