<template>
  <div class="smDm-app fx">
    <div class="sm_d1">
      <template v-for="(item,i) of topTitleList">
        <span :key="i" class="sm_d1_span" :class="item.src?'cur':''" @click="topBack(item.src)">
          {{item.title}}
        </span>
        <i :key="i+'1'" v-if="item.src" class="el-icon-arrow-right"></i>
      </template>
      <span v-if="isShowBtn" class="sm_d1_btn">
        <el-button class="sm_btn" v-if="btnNum===1" type="primary" @click="topBtnNum(2)">取消禁用</el-button>
        <!-- <el-button class="sm_btn" v-if="btnNum===1" type="primary" @click="topBtnNum(3)">删除恢复</el-button> -->
        <el-button class="sm_btn" v-else type="primary" @click="topBtnNum(1)">返回</el-button>
      </span>
      <el-button v-if="(!isShowBtn)&&topTitleList.length>1" class="sm_btn sm_d1_btn" type="primary" @click="topBack('schoolManage')">返回</el-button>
    </div>
    <router-view :btnNum="btnNum" :isAptitudeAudit="isAptitudeAudit"></router-view>
    
  </div>
</template>

<script>
import {Button,Select,Option,Input,Pagination,Radio} from 'element-ui'
import Vue from 'vue';
Vue.use(Button);
Vue.use(Select);
Vue.use(Option);
Vue.use(Input);
Vue.use(Pagination);
Vue.use(Radio);
export default {
  data () {
    return {
      btnNum:1,  
      isShowBtn:true,    //是否显示按钮
      topTitleList:[],    //顶部抬头显示
      isAptitudeAudit:false,  //false:增删管理    true：资质审核
    };
  },

  created(){
    this.getId(this.$route);
  },

  methods: {
    //判断是管理还是审核
    getId(obj){
      let id = obj.query.id;
      let num = obj.query.num;
      id = (id==='2'?'2-0':id);
      this.topTitleList = [];
      if(num)this.isShowBtn = false;
      else this.isShowBtn = true;
      if(id==='2-0'){
        this.isAptitudeAudit = false;
        if(obj.name==='schoolAuditDetail')
          this.topTitleList=[{title:'学校增删管理',src:'schoolManage'},{title:'学校详情'}]
        else
          this.topTitleList=[{title:'学校增删管理'}]
      }else{
        this.isAptitudeAudit = true;
        this.isShowBtn = false
        this.btnNum = 1;
        if(obj.name==='schoolAuditDetail')
          this.topTitleList=[{title:'学校资质审核',src:'schoolManage'},{title:'学校资质详情'}]
        else
          this.topTitleList=[{title:'学校资质审核'}]
      }
    },

    //点击按钮时
    topBtnNum(num){
      this.btnNum = num;
    },

    //点击返回
    topBack(src){
      if(!src) return
      this.$router.go(-1);
    },
  },
  watch:{
    $route:function(val){
      this.getId(val);
    }
  }
}

</script>

<style lang='less'>
.smDm-app{
  padding:20px;
  padding-top: 20px;
  position: relative;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: white;
  .sm_d1{
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(230,230,230,1);
    position: relative;
    .sm_d1_span{
      font-size: 18px;
      color:rgba(51,51,51,1);
    }
    .cur{
      cursor: pointer;
    }
    .cur:active{
      color:rgb(191,191,191);
    }
    .sm_d1_btn{
      position:absolute;
      top: -7px;
      right: 20px;
    }
  }
}
</style>