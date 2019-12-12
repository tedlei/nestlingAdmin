<template>
  <div class="sm-app">
    <ul class="sm_ul">
      <li class="sm_li fx">
        <div class="sm_li_left">
          <span>学校全称</span>
        </div>
        <div class="sm_li_right">
          <span class="sm_li_span">{{schoolObj.organizationName}}</span>
          <!-- <span class="sm_li_span_j">普通入驻+保证金+学校年费VIP</span>
          <span class="sm_li_span_j">金牌合作</span>
          <span class="sm_li_span_j">诚信保证</span> -->
        </div>
      </li>
      <li class="sm_li fx">
        <div class="sm_li_left">
          <span>特邀入驻</span>
        </div>
        <div class="sm_li_right">
          <el-radio :disabled="!isShowBtn" v-model="radio" label="0">否</el-radio>
          <el-radio :disabled="!isShowBtn" v-model="radio" label="1">是</el-radio>
        </div>
      </li>
      <li class="sm_li fx">
        <div class="sm_li_left">
          <span>学校固话</span>
        </div>
        <div class="sm_li_right">
          <span class="sm_li_span">{{schoolObj.schoolPhone}}</span>
        </div>
      </li>
      <li class="sm_li fx">
        <div class="sm_li_left">
          <span>学校网址</span>
        </div>
        <div class="sm_li_right">
          <span class="sm_li_span">{{schoolObj.schoolUrl}}</span>
        </div>
      </li>
      <li class="sm_li fx">
        <div class="sm_li_left">
          <span>主营行业</span>
        </div>
        <div class="sm_li_right" v-if="schoolObj.schoolTrade">
          <span class="sm_li_span sm_tow" v-for="(str,i) of JSON.parse(schoolObj.schoolTrade)" :key="i">{{str}}</span>
        </div>
      </li>
      <li class="sm_li fx">
        <div class="sm_li_left">
          <span>详细地址</span>
        </div>
        <div class="sm_li_right">
          <span class="sm_li_span">{{schoolObj.schoolAddress}}</span>
        </div>
      </li>

      <li class="sm_li li_width fx">
        <div class="sm_li_left">
          <span>学校资质</span>
        </div>
        <div class="sm_li_right">
          <div class="sm_li_img">
            <img :src="schoolObj.schoolAptitude" alt="正在加载……">
          </div>
        </div>
      </li>
      <li class="sm_li li_width fx">
        <div class="sm_li_left">
          <span>学校LOGO</span>
        </div>
        <div class="sm_li_right">
          <div class="sm_li_img">
            <img :src="schoolObj.schoolLogo" alt="正在加载……">
          </div>
        </div>
      </li>
      <li class="sm_li li_width fx">
        <div class="sm_li_left">
          <span>品牌资质</span>
        </div>
        <div class="sm_li_right">
          <div class="sm_li_img">
            <img :src="schoolObj.schoolCertificate" alt="正在加载……">
          </div>
        </div>
      </li>
    </ul>
    <div class="sm_btn" v-if="isShowBtn">
      <el-button :disabled="isForbiddenBnt" type="primary" @click="topAudit(true)">审核通过</el-button>
      <el-button :disabled="isForbiddenBnt" class="sm_btn_left" type="primary" @click="topAudit(false)">审核不通过</el-button>
      <div class="sm_tc fx" v-show="isShowTc" @click="topCloseTc">
        <div class="sm_tc_d">
          <p class="sm_tc_p fx">
            <span>不通过原因或理由</span>
            <i class="el-icon-close" @click.stop="topCloseTc"></i>
          </p>
          <div class="sm_tc_input">
            <el-input
              type="textarea"
              :rows="8"
              placeholder="请输入内容"
              v-model="textarea">
            </el-input>
          </div>
          <div class="sm_tc_btn">
            <el-button type="primary" @click="topNotarize()">确认</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:['btnNum'],
  data () {
    return {
      schoolObj:{},  //学校资料

      radio:'0',
      textarea:'',     //不通过原因

      isForbiddenBnt:false,   //是否禁用按钮
      isShowTc:false,   //是否显示弹窗
      isShowBtn:false,   //是否显示按钮
    };
  },
  created(){
    let num = this.$route.query.num;
    this.getSchoolDetail(num);
    this.getId(this.$route);
  },
  methods: {
    //获取学校数据
    getSchoolDetail(num){
      let url = "/schooluser/getSh.do";
      this.fetch({url,data:{userid:num},method:'post'},1).then((res)=>{
        this.schoolObj = res.data;
      })
    },

    //判断是管理还是审核
    getId(obj){
      let id = obj.query.id;
      id = (id==='2'?'2-0':id);
      this.topTitleList = [];
      if(id==='2-0'||id==='7-1'){
        this.isShowBtn = false;
        // this.$message({message:'增删管理查看'})
      }else{
        this.isShowBtn = true;
        // this.$message({message:'资质审核查看'})
      }
    },
    //审核
    topAudit(boole){
      this.isForbiddenBnt = true;
      if(boole){
        this.schoolAudit();
      }else{
        this.isShowTc = true;
      }
    },

    //关闭弹窗
    topCloseTc(){
      if(event.currentTarget!==event.target)return
      this.isShowTc = false;
      this.isForbiddenBnt = false;
    },

    //点击弹窗确认时
    topNotarize(){
      let textarea = this.textarea
      if(!textarea.replace(/\s*/g,"")){
        this.$message({message:'请输入原因！',type:'warning'});
        return
      }
      this.isShowTc = false;
      this.schoolAudit(textarea);
    },

    //审核
    schoolAudit(message){
      let url = '/school/updateStatus.do';
      let data = {
        status:'3',
        schoolId:this.$route.query.num,
        invited:this.radio
      }
      if(message){
        data.status='2';
        data.message = message;
      }
      this.fetch({url,data,method:'post'},6).then(res=>{
        let {message,success} = res.data;
        let {id} = this.$route.query;
        this.isForbiddenBnt = false;
        if(success){
          this.push({path:'/index/schoolManage',query:{id}})
        }
        this.$message({message,type:success?'success':'warning'});
      })
    }
  }
}

</script>

<style lang='less'>
.sm-app{
  width: 100%;
  height: 100%;
  overflow-y: auto;
  .sm_ul{
    .sm_li{
      margin-top: 10px;
      height: 40px;
      align-items: center;
      .sm_li_left{
        width: 100px;
        text-align: right;
        font-size: 16px;
        color:rgba(102,102,102,1);
      }
      .sm_li_right{
        margin-left: 40px;
        .el-radio{
          margin-top: 4px;
        }
        .sm_li_span{
          font-size: 16px;
          color:rgba(51,51,51,1);
        }
        .sm_tow+.sm_tow{
          margin-left: 20px;
        }
        .sm_li_span_j{
          margin-left: 20px;
          padding:0 10px;
          display:inline-block;
          height:26px;
          background:rgba(255,228,214,1);
          text-align: center;
          line-height: 26px;
          font-size: 14px;
          color:rgba(255,114,37,1);
          border-radius:3px;
        }
        .sm_li_img{
          width:180px;
          height:120px;
          background:rgba(217,217,217,1);
          border:1px solid rgba(230,230,230,1);
          border-radius:5px;
          img{
            height: 100%;
            height: 100%;
          }
        }
      }
    }
    .li_width{
      margin-top: 25px;
      height: auto;
      align-items: stretch;
      .sm_li_left{
        padding-top: 10px;
      }
    }
  }
  .sm_btn{
    margin-top: 30px;
    margin-left: 30px;
    padding-bottom: 20px;
    
    .sm_btn_left{
      margin-left: 40px;
    }
    .sm_tc{
      position:absolute;
      width: 100%;
      height: 100%;
      background:rgba(0,0,0,0.1);
      justify-content: center;
      align-items: center;
      top: 0;
      left: 0;
      z-index: 10001;
      .sm_tc_d{
        padding:10px;
        width:400px;
        height:260px;
        background: white;
        box-shadow:0px 0px 21px 0px rgba(0, 0, 0, 0.11);
        border-radius:5px;
        .sm_tc_p{
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
        .sm_tc_input{
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
        .sm_tc_btn{
          padding-top: 5px;
          text-align: center;
        }
      }
    }
  }
}
</style>