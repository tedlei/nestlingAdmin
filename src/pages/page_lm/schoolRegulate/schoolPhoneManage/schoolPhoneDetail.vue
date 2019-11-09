<template>
  <div class="spm-app">
    <ul class="spm_ul">
      <li class="spm_li fx">
        <div class="spm_li_left">
          <span>学校全称</span>
        </div>
        <div class="spm_li_right">
          <span class="spm_li_span">重庆龙丰教育学校</span>

          <span class="spm_li_span_j">普通入驻+保证金+学校年费VIP</span>
          <span class="spm_li_span_j">金牌合作</span>
          <span class="spm_li_span_j">诚信保证</span>
        </div>
      </li>
    </ul>
    <ul class="spd_ul fx">
      <li class="spd_li" v-for="(item,i) of phoneList" :key='i'>
        <img class="spd_li_img" :src="item.src" :alt="item.src">
        <template v-if="!auditPass">
          <p class="spd_li_p" v-if="item.btg" @click="topBtg(i,false)">不通过</p>
          <p class="spd_cx" v-else @click="topBtg(i,true)">撤销</p>
        </template>
      </li>
    </ul>
    <div class="spm_btn">
      <el-button v-if="!auditPass" :disabled="isForbiddenBnt" type="primary" @click="topAudit(true)">审核通过</el-button>
      <el-button v-if="!auditPass" :disabled="isForbiddenBnt" class="spm_btn_left" type="primary" @click="topAudit(false)">审核不通过</el-button>
      <div class="spm_tc fx" v-show="isShowTc" @click="topCloseTc">
        <div class="spm_tc_d">
          <p class="spm_tc_p fx">
            <span>不通过原因或理由</span>
            <i class="el-icon-close" @click.stop="topCloseTc"></i>
          </p>
          <div class="spm_tc_input">
            <el-input
              type="textarea"
              :rows="8"
              placeholder="请输入内容"
              v-model="textarea">
            </el-input>
          </div>
          <div class="spm_tc_btn">
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
      phoneList:[
        {id:123,src:'http://abc.2008php.com/2014_Website_appreciate/2014-03-16/20140316035028.jpg',btg:true},
        {id:123,src:'http://abc.2008php.com/2014_Website_appreciate/2014-03-16/20140316035028.jpg',btg:true},
        {id:123,src:'http://abc.2008php.com/2014_Website_appreciate/2014-03-16/20140316035028.jpg',btg:true},
        {id:123,src:'http://abc.2008php.com/2014_Website_appreciate/2014-03-16/20140316035028.jpg',btg:true}
      ]
    };
  },
  methods: {
    //审核
    topAudit(boole){
      this.isForbiddenBnt = true;
      if(!boole) {
        this.isShowTc = true;
        return
      }
      let list = this.phoneList;
      for(let obj of list){
        if(!obj.btg){
          this.isShowTc = true;
          this.isForbiddenBnt = false;
          return 
        }
      }
      this.$message({message:'审核通过',type:'success'});
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
      this.isForbiddenBnt = true;
      this.isShowTc = false;
      this.$message({message:'审核不通过原因:'+textarea,type:'success'});
    },

    //点击不通过时
    topBtg(i,boole){
      this.phoneList[i].btg = boole;
    }
  },
  computed: {
    isDisBtn:function(){
      console.log(this.auditPass)
      return !this.auditPass
    }
  },

}

</script>

<style lang='less'>
.spm-app{
  width: 100%;
  height: 100%;
  overflow-y: auto;
  .spm_ul{
    .spm_li{
      margin-top: 10px;
      height: 40px;
      align-items: center;
      .spm_li_left{
        width: auto;
        // text-align: right;
        font-size: 16px;
        color:rgba(102,102,102,1);
      }
      .spm_li_right{
        margin-left: 40px;
        .spm_li_span{
          font-size: 16px;
          color:rgba(51,51,51,1);
        }
        .spm_li_span_j{
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
      }
    }
  }
  .spd_ul{
    width: 100%;
    min-height: 440px;
    flex-wrap: wrap;
    .spd_li{
      margin-top: 20px;
      margin-left: 20px;
      width:240px;
      height:320px;
      background:rgba(204,204,204,1);
      border:1px solid rgba(230,230,230,1);
      border-radius:5px;
      overflow: hidden;
      position: relative;
      .spd_li_img{
        width: 100%;
        height: 100%;
      }
      .spd_li_p{
        width:100%;
        height:60px;
        background:rgba(0,0,0,0.4);
        border-radius:0px 0px 5px 5px;
        text-align: center;
        line-height: 60px;
        color:rgba(255,255,255,1);
        position:absolute;
        transition: all 0.3s;
        bottom:-60px;
        left: 0;
        z-index: 10001;
        cursor: pointer;
      }
      .spd_cx{
        width:100%;
        height:320px;
        background:rgba(0,0,0,0.6);
        text-align: center;
        line-height: 320px;
        color:rgba(255,255,255,1);
        position:absolute;
        transition: all 0.3s;
        top:0px;
        left: 0;
        z-index: 10001;
        cursor: pointer;
      }
      .spd_li_p:active{
        background:rgba(0,0,0,0.6);
      }
    }
    .spd_li:hover>.spd_li_p{
      bottom: 0;
    }
  }
  .spm_btn{
    margin-top: 30px;
    margin-left: 30px;
    padding-bottom: 20px;
    .spm_btn_left{
      margin-left: 40px;
    }
    .spm_tc{
      position:absolute;
      width: 100%;
      height: 100%;
      background:rgba(0,0,0,0.1);
      justify-content: center;
      align-items: center;
      top: 0;
      left: 0;
      z-index: 10001;
      .spm_tc_d{
        padding:10px;
        width:400px;
        height:260px;
        background: white;
        box-shadow:0px 0px 21px 0px rgba(0, 0, 0, 0.11);
        border-radius:5px;
        .spm_tc_p{
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
        .spm_tc_input{
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
        .spm_tc_btn{
          padding-top: 5px;
          text-align: center;
        }
      }
    }
  }
}
</style>