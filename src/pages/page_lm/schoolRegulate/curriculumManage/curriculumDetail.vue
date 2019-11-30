<template>
  <div class="cum-app">
    <ul class="cum_ul">
      <li class="cum_li fx">
        <div class="cum_li_left">
          <span>学校全称</span>
        </div>
        <div class="cum_li_right">
          <span class="cum_li_span">{{currObj.organizationName}}</span>
          <template v-if="currObj.schoolCooperation">
            <span 
              class="cum_li_span_j" 
              v-for="(str,i) of currObj.schoolCooperation.split(',')"
              :key="i">{{str}}</span>
          </template>
        </div>
      </li>
      <li class="cum_li fx">
        <div class="cum_li_left">
          <span>课程名称</span>
        </div>
        <div class="cum_li_right">
          <span class="cum_li_span">{{currObj.courseName}}</span>
        </div>
      </li>
      <li class="cum_li li_width fx">
        <div class="cum_li_left">
          <span>课程封面</span>
        </div>
        <div class="cum_li_right">
          <div class="cum_li_img">
            <img :src="currObj.courseImage" alt="正在加载……">
          </div>
        </div>
      </li>
      <li class="cum_li fx">
        <div class="cum_li_left">
          <span>课程价格</span>
        </div>
        <div class="cum_li_right">
          <span class="cum_li_span">{{currObj.coursePrice}}元</span>
          <el-radio class="elRadio" :disabled="auditPass" v-model="currObj.courseHidePrice" label="0">直接展示</el-radio>
          <el-radio :disabled="auditPass" v-model="currObj.courseHidePrice" label="1">预约后展示</el-radio>
        </div>
      </li>
      <li class="cum_li fx">
        <div class="cum_li_left">
          <span>上课时间</span>
        </div>
        <div class="cum_li_right">
          <span class="cum_li_span">{{currObj.courseTime}}</span>
        </div>
      </li>
      <li class="cum_li fx">
        <div class="cum_li_left">
          <span>上课地点</span>
        </div>
        <div class="cum_li_right">
          <span class="cum_li_span">{{currObj.courseAddress}}</span>
        </div>
      </li>
      <li class="cum_li fx">
        <div class="cum_li_left">
          <span>学习周期</span>
        </div>
        <div class="cum_li_right">
          <span class="cum_li_span">{{currObj.coursePeriod}}</span>
        </div>
      </li>
      <li class="cum_li fx">
        <div class="cum_li_left">
          <span>课程等级</span>
        </div>
        <div class="cum_li_right">
          <span class="cum_li_span">{{currObj.courseGrade}}</span>
        </div>
      </li>

      <li class="cum_li li_width fx">
        <div class="cum_li_left">
          <span>教学目标</span>
        </div>
        <div class="cum_li_right minHeight">
          <div class="cum_li_text" v-html="currObj.courseTarget"></div>
        </div>
      </li>
      <li class="cum_li li_width fx">
        <div class="cum_li_left">
          <span>学校资质</span>
        </div>
        <div class="cum_li_right minHeight">
          <div class="cum_li_text" v-html="currObj.courseContent"></div>
        </div>
      </li>
    </ul>
    <div class="cum_btn">
      <el-button v-if="!auditPass" :disabled="isForbiddenBnt" type="primary" @click="topAudit(true)">审核通过</el-button>
      <el-button v-if="!auditPass" :disabled="isForbiddenBnt" class="cum_btn_left" type="primary" @click="topAudit(false)">审核不通过</el-button>
      <div class="cum_tc fx" v-show="isShowTc" @click="topCloseTc">
        <div class="cum_tc_d">
          <p class="cum_tc_p fx">
            <span>不通过原因或理由</span>
            <i class="el-icon-close" @click.stop="topCloseTc"></i>
          </p>
          <div class="cum_tc_input">
            <el-input
              type="textarea"
              :rows="8"
              placeholder="请输入内容"
              v-model="textarea">
            </el-input>
          </div>
          <div class="cum_tc_btn">
            <el-button type="primary" @click="topNotarize()">确认</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import {Radio} from 'element-ui'
Vue.use(Radio)
export default {
  props:['auditPass'],
  data () {
    return {
      isForbiddenBnt:false,   //是否禁用按钮
      isShowTc:false,   //是否显示弹窗
      textarea:'',
      currObj:{},    //课程详情
    };
  },
  created() {
    this.getCurr(this.$route.query.num);
  },
  methods: {
    //获取课程详情
    getCurr(id){
      let url = '/curri/findById.do';
      let data = {id,sourceType:'2'};
      this.fetch({url,data,method:'get'},1).then(res=>{
        console.log(res.data[0])
        this.currObj = res.data[0]
      })
    },

    //审核
    topAudit(boole){
      this.isForbiddenBnt = true;
      if(boole){
        this.$message({message:'审核通过',type:'success'});
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
      this.$message({message:'审核不通过原因:'+textarea,type:'success'});
    },
  }

}

</script>

<style lang='less'>
.cum-app{
  width: 100%;
  height: 100%;
  overflow-y: auto;
  .cum_ul{
    .cum_li{
      margin-top: 10px;
      height: 40px;
      align-items: center;
      .cum_li_left{
        width: 100px;
        text-align: right;
        font-size: 16px;
        color:rgba(102,102,102,1);
      }
      .cum_li_right{
        margin-left: 40px;
        .cum_li_span{
          font-size: 16px;
          color:rgba(51,51,51,1);
        }
        .elRadio{
          margin-left: 40px;
        }
        .cum_li_span_j{
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
        .cum_li_span_z{
          font-size: 16px;
          margin-left: 30px;
        }
        .cum_li_text{
          padding-right: 0;
          width: 100%;
          height: 100%;
          img{
            display:block;
            margin: auto;
          }
        }
        .cum_li_img{
          width:220px;
          height:280px;
          background:rgba(217,217,217,1);
          border:1px solid rgba(230,230,230,1);
          border-radius:5px;
          img{
            height: 100%;
            height: 100%;
          }
        }
      }
      .minHeight{
        flex: 1;
        min-height: 100px;
      }
    }
    .li_width{
      margin-top: 15px;
      height: auto;
      align-items: stretch;
    }
  }
  .cum_btn{
    margin-top: 30px;
    margin-left: 30px;
    padding-bottom: 20px;
    .cum_btn_left{
      margin-left: 40px;
    }
    .cum_tc{
      position:absolute;
      width: 100%;
      height: 100%;
      background:rgba(0,0,0,0.1);
      justify-content: center;
      align-items: center;
      top: 0;
      left: 0;
      z-index: 10001;
      .cum_tc_d{
        padding:10px;
        width:400px;
        height:260px;
        background: white;
        box-shadow:0px 0px 21px 0px rgba(0, 0, 0, 0.11);
        border-radius:5px;
        .cum_tc_p{
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
        .cum_tc_input{
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
        .cum_tc_btn{
          padding-top: 5px;
          text-align: center;
        }
      }
    }
  }
}
</style>