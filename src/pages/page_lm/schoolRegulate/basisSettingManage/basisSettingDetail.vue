<template>
  <div class="bsm-app">
    <ul class="bsm_ul">
      <li class="bsm_li fx">
        <div class="bsm_li_left">
          <span>学校全称</span>
        </div>
        <div class="bsm_li_right">
          <span class="bsm_li_span">{{settingObj.schoolName}}</span>

          <span class="bsm_li_span_j">普通入驻+保证金+学校年费VIP</span>
          <span class="bsm_li_span_j">金牌合作</span>
          <span class="bsm_li_span_j">诚信保证</span>
        </div>
      </li>
      <li class="bsm_li fx">
        <div class="bsm_li_left">
          <span>学校地址</span>
        </div>
        <div class="bsm_li_right">
          <span class="bsm_li_span">{{settingObj.schoolLocalhost}}</span>
        </div>
      </li>
      <li class="bsm_li fx">
        <div class="bsm_li_left">
          <span>学校电话</span>
        </div>
        <div class="bsm_li_right">
          <span class="bsm_li_span">{{settingObj.schoolFixPhone}}</span>
        </div>
      </li>
      <li class="bsm_li li_width fx">
        <div class="bsm_li_left">
          <span>学校封面</span>
        </div>
        <div class="bsm_li_right">
          <div class="bsm_li_img xxfm">
            <img :src="settingObj.schoolCover" alt="正在加载……">
            <p class="bsm_li_p" v-if="auditNO.indexOf(settingObj.schoolCover)<0" @click="topcsPhone(settingObj.schoolCover,false)">不通过</p>
            <p class="bsm_li_cx fx" v-else @click="topcsPhone(settingObj.schoolCover,true)">撤销</p>
          </div>
        </div>
      </li>

      <li class="bsm_li li_width fx">
        <div class="bsm_li_left">
          <span>logo</span>
        </div>
        <div class="bsm_li_right">
          <div class="bsm_li_img logo">
            <img :src="settingObj.schoolLogo" alt="正在加载……">
            <p class="bsm_li_p" 
            v-if="auditNO.indexOf(settingObj.schoolLogo)<0" 
            @click="topcsPhone(settingObj.schoolLogo,false)">不通过</p>
            <p class="bsm_li_cx fx" v-else @click="topcsPhone(settingObj.schoolLogo,true)">撤销</p>
          </div>
        </div>
      </li>
      <li class="bsm_li li_width fx">
        <div class="bsm_li_left">
          <span>公众号二维码</span>
        </div>
        <div class="bsm_li_right">
          <div class="bsm_li_img gzh">
            <img :src="settingObj.schoolQRcode" alt="正在加载……">
            <p class="bsm_li_p" v-if="auditNO.indexOf(settingObj.schoolQRcode)<0" @click="topcsPhone(settingObj.schoolQRcode,false)">不通过</p>
            <p class="bsm_li_cx fx" v-else @click="topcsPhone(settingObj.schoolQRcode,true)">撤销</p>
          </div>
        </div>
      </li>

      <li class="bsm_li li_width fx">
        <div class="bsm_li_left">
          <span>位置图</span>
        </div>
        <div class="bsm_li_right">
          <div class="bsm_li_img wzt">
            <img :src="settingObj.schoolLocalhostPhone" alt="正在加载……">
            <p class="bsm_li_p" v-if="auditNO.indexOf(settingObj.schoolLocalhostPhone)<0" @click="topcsPhone(settingObj.schoolLocalhostPhone,false)">不通过</p>
            <p class="bsm_li_cx fx" v-else @click="topcsPhone(settingObj.schoolLocalhostPhone,true)">撤销</p>
          </div>
        </div>
      </li>

      <li class="bsm_li li_width fx">
        <div class="bsm_li_left">
          <span>广告图1</span>
        </div>
        <div class="bsm_li_right">
          <div class="bsm_li_img">
            <img :src="settingObj.schoolAdvertisingPhone1" alt="正在加载……">
            <p class="bsm_li_p" v-if="auditNO.indexOf(settingObj.schoolAdvertisingPhone1)<0" @click="topcsPhone(settingObj.schoolAdvertisingPhone1,false)">不通过</p>
            <p class="bsm_li_cx fx" v-else @click="topcsPhone(settingObj.schoolAdvertisingPhone1,true)">撤销</p>
          </div>
        </div>
      </li>
      <li class="bsm_li li_width fx">
        <div class="bsm_li_left">
          <span>广告图2</span>
        </div>
        <div class="bsm_li_right">
          <div class="bsm_li_img">
            <img :src="settingObj.schoolAdvertisingPhone2" alt="正在加载……">
            <p class="bsm_li_p" v-if="auditNO.indexOf(settingObj.schoolAdvertisingPhone2)<0" @click="topcsPhone(settingObj.schoolAdvertisingPhone2,false)">不通过</p>
            <p class="bsm_li_cx fx" v-else @click="topcsPhone(settingObj.schoolAdvertisingPhone2,true)">撤销</p>
          </div>
        </div>
      </li>
      <li class="bsm_li li_width fx">
        <div class="bsm_li_left">
          <span>广告图3</span>
        </div>
        <div class="bsm_li_right">
          <div class="bsm_li_img">
            <img :src="settingObj.schoolAdvertisingPhone3" alt="正在加载……">
            <p class="bsm_li_p" v-if="auditNO.indexOf(settingObj.schoolAdvertisingPhone3)<0" @click="topcsPhone(settingObj.schoolAdvertisingPhone3,false)">不通过</p>
            <p class="bsm_li_cx fx" v-else @click="topcsPhone(settingObj.schoolAdvertisingPhone3,true)">撤销</p>
          </div>
        </div>
      </li>
    </ul>
    <div class="bsm_btn">
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
  data () {
    return {
      isForbiddenBnt:false,   //是否禁用按钮
      isShowTc:false,   //是否显示弹窗
      textarea:'',

      settingObj:{   //学校设置详情
        schoolName:'重庆龙丰教育学校',     //学校名称
        schoolLocalhost:'重庆市江北区建新南路11号浩博天庭18-2',   //学校地址
        schoolFixPhone:'023-12345678',   //学校固话
        schoolTag:'普通入驻+保证金+学校年费VIP,金牌合作,诚信保证',
        schoolCover:'http://pic1.win4000.com/wallpaper/3/589ac4fd2341d.jpg', //学校封面
        schoolLogo:'http://pic1.win4000.com/wallpaper/3/589ac4fd2341d.jpg',  //学校logo
        schoolQRcode:'http://pic1.win4000.com/wallpaper/3/589ac4fd2341d.jpg',  //学校二维码
        schoolLocalhostPhone:'http://pic1.win4000.com/wallpaper/3/589ac4fd2341d.jpg',   //学校位置图
        schoolAdvertisingPhone1:'http://pic1.win4000.com/wallpaper/3/589ac4fd2341d.jpg', //广告图1
        schoolAdvertisingPhone2:'http://pic1.win4000.com/wallpaper/3/589ac4fd2341d.jpg', //广告图2
        schoolAdvertisingPhone3:'http://pic1.win4000.com/wallpaper/3/589ac4fd2341d.jpg', //广告图3
      },
      
      auditNO:[],   //不通过图片列表
    };
  },
  methods: {
    //审核
    topAudit(boole){
      if(boole){
        if(this.auditNO.length>0){
          this.isForbiddenBnt = true;
          this.isShowTc = true;
        }else{
          this.$message({message:'审核通过',type:'success'});
        }
      }else{
        this.isForbiddenBnt = true;
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
      this.$message({message:'审核不通过原因:'+textarea,type:'success'});
    },

    //审核图片
    topcsPhone(imgSrc,boole){
      if(!boole){
        this.auditNO.push(imgSrc)
      }else{
        let num = this.auditNO.indexOf(imgSrc)
        this.auditNO.splice(num,1)
      }
      console.log(this.auditNO)
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