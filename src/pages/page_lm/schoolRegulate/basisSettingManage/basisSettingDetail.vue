<template>
  <div class="bsm-app">
    <ul class="bsm_ul">
      <li class="bsm_li fx">
        <div class="bsm_li_left">
          <span>学校全称</span>
        </div>
        <div class="bsm_li_right">
          <span class="bsm_li_span">{{schoolObj.organizationName}}</span>

          <!-- <span class="bsm_li_span_j">普通入驻+保证金+学校年费VIP</span>
          <span class="bsm_li_span_j">金牌合作</span>
          <span class="bsm_li_span_j">诚信保证</span> -->
        </div>
      </li>
      <li class="bsm_li fx">
        <div class="bsm_li_left">
          <span>学校地址</span>
        </div>
        <div class="bsm_li_right">
          <span class="bsm_li_span">{{schoolObj.schoolAddress}}</span>
        </div>
      </li>
      <li class="bsm_li fx">
        <div class="bsm_li_left">
          <span>学校电话</span>
        </div>
        <div class="bsm_li_right">
          <span class="bsm_li_span">{{schoolObj.schoolPhone}}</span>
        </div>
      </li>
      <li class="bsm_li li_width fx">
        <div class="bsm_li_left">
          <span>学校封面</span>
        </div>
        <div class="bsm_li_right">
          <div class="bsm_li_img xxfm">
            <img :src="schoolObj.schoolImage" alt="正在加载……">
            <template v-if="!auditPass">
              <p class="bsm_li_p" v-if="!auditNOimg.schoolImage" @click="topcsPhone('schoolImage',false)">不通过</p>
              <p class="bsm_li_cx fx" v-else @click="topcsPhone('schoolImage',true)">撤销</p>
            </template>
          </div>
        </div>
      </li>

      <!-- <li class="bsm_li li_width fx">
        <div class="bsm_li_left">
          <span>logo</span>
        </div>
        <div class="bsm_li_right">
          <div class="bsm_li_img logo">
            <img :src="schoolObj.schoolLogo" alt="正在加载……">
            <template v-if="!auditPass">
              <p class="bsm_li_p" 
              v-if="!auditNOimg.schoolLogo" 
              @click="topcsPhone('schoolLogo',false)">不通过</p>
              <p class="bsm_li_cx fx" v-else @click="topcsPhone('schoolLogo',true)">撤销</p>
            </template>
          </div>
        </div>
      </li> -->
      <li class="bsm_li li_width fx">
        <div class="bsm_li_left">
          <span>公众号二维码</span>
        </div>
        <div class="bsm_li_right">
          <div class="bsm_li_img gzh">
            <img :src="schoolObj.schoolPublicCode" alt="正在加载……">
            <template v-if="!auditPass">
              <p class="bsm_li_p" v-if="!auditNOimg.schoolPublicCode" @click="topcsPhone('schoolPublicCode',false)">不通过</p>
              <p class="bsm_li_cx fx" v-else @click="topcsPhone('schoolPublicCode',true)">撤销</p>
            </template>
          </div>
        </div>
      </li>

      <li class="bsm_li li_width fx">
        <div class="bsm_li_left">
          <span>位置图</span>
        </div>
        <div class="bsm_li_right">
          <div class="bsm_li_img wzt">
            <img :src="schoolObj.schoolMapImage" alt="正在加载……">
            <template v-if="!auditPass">
              <p class="bsm_li_p" v-if="!auditNOimg.schoolMapImage" @click="topcsPhone('schoolMapImage',false)">不通过</p>
              <p class="bsm_li_cx fx" v-else @click="topcsPhone('schoolMapImage',true)">撤销</p>
            </template>
          </div>
        </div>
      </li>

      <li class="bsm_li li_width fx">
        <div class="bsm_li_left">
          <span>广告图1</span>
        </div>
        <div class="bsm_li_right">
          <div class="bsm_li_img ggHeight">
            <img :src="schoolObj.schoolAdvertOne" alt="正在加载……">
            <template v-if="!auditPass">
              <p class="bsm_li_p" v-if="!auditNOimg.schoolAdvertOne" @click="topcsPhone('schoolAdvertOne',false)">不通过</p>
              <p class="bsm_li_cx fx" v-else @click="topcsPhone('schoolAdvertOne',true)">撤销</p>
            </template>
          </div>
        </div>
      </li>
      <li class="bsm_li li_width fx">
        <div class="bsm_li_left">
          <span>广告图2</span>
        </div>
        <div class="bsm_li_right">
          <div class="bsm_li_img ggHeight">
            <img :src="schoolObj.schoolAdvertTwo" alt="正在加载……">
            <template v-if="!auditPass">
              <p class="bsm_li_p" v-if="!auditNOimg.schoolAdvertTwo" @click="topcsPhone('schoolAdvertTwo',false)">不通过</p>
              <p class="bsm_li_cx fx" v-else @click="topcsPhone('schoolAdvertTwo',true)">撤销</p>
            </template>
          </div>
        </div>
      </li>
      <li class="bsm_li li_width fx">
        <div class="bsm_li_left">
          <span>广告图3</span>
        </div>
        <div class="bsm_li_right">
          <div class="bsm_li_img ggHeight">
            <img :src="schoolObj.schoolAdvertThree" alt="正在加载……">
            <template v-if="!auditPass">
              <p class="bsm_li_p" v-if="!auditNOimg.schoolAdvertThree" @click="topcsPhone('schoolAdvertThree',false)">不通过</p>
              <p class="bsm_li_cx fx" v-else @click="topcsPhone('schoolAdvertThree',true)">撤销</p>
            </template>
          </div>
        </div>
      </li>
    </ul>
    <div class="bsm_btn" v-if="!auditPass">
      <el-button :disabled="isForbiddenBnt" type="primary" @click="topAudit(true)">审核通过</el-button>
      <el-button :disabled="isForbiddenBnt" type="primary" @click="topAudit(false)">审核不通过</el-button>
      <div class="bsm_tc fx" v-show="isShowTc" @click="topCloseTc">
        <div class="bsm_tc_d">
          <p class="bsm_tc_p fx">
            <span>不通过原因或理由</span>
            <i class="el-icon-close" @click.stop="topCloseTc"></i>
          </p>
          <div class="bsm_tc_input">
            <el-input
              type="textarea"
              :rows="8"
              placeholder="请输入内容"
              v-model="textarea">
            </el-input>
          </div>
          <div class="bsm_tc_btn">
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

      schoolObj:{},  //学校详情
      
      auditNOimg:{},   //不通过图片列表
    };
  },

  created(){
    let {num} = this.$route.query;
    this.getSchoolDetail(num);
  },
  methods: {
    //获取学校数据
    getSchoolDetail(num){
      let url = "/schooluser/getSh.do";
      this.fetch({url,data:{userid:num},method:'post'},1).then((res)=>{
        this.schoolObj = res.data;
      })
    },


    //审核
    topAudit(boole){
      let ani = this.auditNOimg;
      let schoolObj = this.schoolObj;
      let message = '';
      if(boole){
        if(ani.schoolImage){
          schoolObj.schoolImage = '';
          message += '学校封面图片不规范或不符合，';
        }
        // if(ani.schoolLogo){
        //   schoolObj.schoolLogo = '';
        //   message += '学校LOGO图片不规范或不符合，';
        // }
        if(ani.schoolPublicCode){
          schoolObj.schoolPublicCode = '';
          message += '二维码图片不规范或不符合，';
        }
        if(ani.schoolMapImage){
          schoolObj.schoolMapImage = '';
          message += '位置图片不规范或不符合，';
        }
        if(ani.schoolAdvertOne){
          schoolObj.schoolAdvertOne = '';
          message += '广告图片1不规范或不符合，';
        }
        if(ani.schoolAdvertTwo){
          schoolObj.schoolAdvertTwo = '';
          message += '广告图片2不规范或不符合，';
        }
        if(ani.schoolAdvertThree){
          schoolObj.schoolAdvertThree = '';
          message += '广告图片3不规范或不符合，';
        }
        this.jcSettingAydit(message,true);
      }else{
        this.isForbiddenBnt = true;
        this.isShowTc = true;//不通过
      }
    },

    jcSettingAydit(message,boole){
      let url = '/school/updateBasicsStatus.do'
      let data = {schoolUser:{
        basicsStatus:'1',
        id:this.schoolObj.id
      }}
      if(message){
        data.schoolUser = this.schoolObj;
        data.schoolUser.basicsStatus = '1';
        data.message = message;
      }
      if(!boole){
        delete data.schoolUser;
        data.schoolUser = {basicsStatus:'2',id:this.schoolObj.id}
      }
      this.fetch({url,data,method:'post'},6).then(res=>{
        let {message,success} = res.data;
        if(success){
          this.$router.go(-1);
        }
        this.$message({message,type:success?'success':'warning'})
      })
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
      // this.$message({message:'审核不通过原因:'+textarea,type:'success'});
      this.jcSettingAydit(textarea,false);
    },

    //审核图片
    topcsPhone(imgSrc,boole){
      let so = this.schoolObj;
      let ani = this.auditNOimg;
      let img = so[imgSrc];
      if(boole){
        so[imgSrc] = ani[imgSrc];
        delete ani[imgSrc];
      }else{
        ani[imgSrc] = so[imgSrc]
        so[imgSrc] = '';
      }
    }
  }

}

</script>

<style lang='less'>
.bsm-app{
  width: 100%;
  height: 100%;
  overflow-y: auto;
  .bsm_ul{
    .bsm_li{
      margin-top: 10px;
      height: 40px;
      align-items: center;
      .bsm_li_left{
        width: 100px;
        text-align: right;
        font-size: 16px;
        color:rgba(102,102,102,1);
      }
      .bsm_li_right{
        flex: 1;
        margin-left: 40px;
        padding-right: 10px;
        .bsm_li_span{
          font-size: 16px;
          color:rgba(51,51,51,1);
        }
        .bsm_li_span_j{
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
        .bsm_li_text{
          width: 100%;
          height: 100%;
        }
        .bsm_li_img{
          width:100%;
          max-width: 1200px;
          height:auto;
          // min-height:400px; 
          background:rgba(217,217,217,1);
          border:1px solid rgba(230,230,230,1);
          border-radius:5px;
          position: relative;
          overflow: hidden;
          img{
            width:100%;
            max-width: 1200px;
            height:auto;
          }
          .bsm_li_p{
            width: 100%;
            height: 60px;
            background: rgba(0,0,0,0.4);
            text-align: center;
            line-height: 60px;
            font-size: 16px;
            color: white;
            position:absolute;
            bottom: -60px;
            left: 0;
            cursor: pointer;
            transition: all 0.3s;
          }
          .bsm_li_p:active{
            background: rgba(0,0,0,0.6);
          }
          .bsm_li_cx{
            width: 100%;
            height: 100%;
            justify-content: center;
            align-items: center;
            background: rgba(0,0,0,0.4);
            font-size: 16px;
            color: white;
            position:absolute;
            top: 0px;
            left: 0;
            cursor: pointer;
          }
        }
        .ggHeight{
          min-height: 400px;
        }
        .bsm_li_img:hover>.bsm_li_p{
          bottom: 0;
        }
        .xxfm{
          width:340px;
          height:240px;
        }
        .logo{
          width:300px;
          height:100px;
        }
        .gzh{
          width:200px;
          height:200px;
        }
        .wzt{
          width:600px;
          height:400px;
        }
      }
    }
    .li_width{
      margin-top: 15px;
      height: auto;
      align-items: stretch;
    }
  }
  .bsm_btn{
    margin-top: 30px;
    margin-left: 30px;
    padding-bottom: 20px;
    .bsm_btn_left{
      margin-left: 40px;
    }
    .bsm_tc{
      position:absolute;
      width: 100%;
      height: 100%;
      background:rgba(0,0,0,0.1);
      justify-content: center;
      align-items: center;
      top: 0;
      left: 0;
      z-index: 10001;
      .bsm_tc_d{
        padding:10px;
        width:400px;
        height:260px;
        background: white;
        box-shadow:0px 0px 21px 0px rgba(0, 0, 0, 0.11);
        border-radius:5px;
        .bsm_tc_p{
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
        .bsm_tc_input{
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
        .bsm_tc_btn{
          padding-top: 5px;
          text-align: center;
        }
      }
    }
  }
}
</style>