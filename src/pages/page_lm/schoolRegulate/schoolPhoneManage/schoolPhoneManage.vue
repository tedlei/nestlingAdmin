<template>
  <div class="spmDm-app fx">
    <div class="spm_d1">
      <template v-for="(item,i) of topTitleList">
        <span :key="i" class="spm_d1_span" :class="item.src?'cur':''" @click="topBack(item.src)">
          {{item.title}}
        </span>
        <i :key="i+'1'" v-if="item.src" class="el-icon-arrow-right"></i>
      </template>
      <span class="spm_d1_btn" v-show="isShowBtn">
        <el-button class="spm_btn" type="primary" @click="topAudit">{{auditPass?'未审核':'审核通过列表'}}</el-button>
      </span>
      <el-button v-if="topTitleList.length>1" class="spm_btn spm_d1_btn" type="primary" @click="topBack('curriculumManage')">返回</el-button>
    </div>
    <router-view :auditPass="auditPass"></router-view>
  </div>
</template>

<script>
// import {Button,Select,Option,Input,MessageBox,Pagination} from 'element-ui'
// import Vue from 'vue';
// Vue.use(Button);
// Vue.use(Select);
// Vue.use(Option);
// Vue.use(Input);
// Vue.use(Pagination);
export default {
  data () {
    return {
      topTitleList:[{title:'学校教师审核'}],    //顶部抬头显示
      auditPass:false,   //true:  审核通过    false：未审核
      isShowBtn:true,   //是否显示按钮
    };
  },

  created(){
    this.getId(this.$route);
  },

  methods: {
    //是否显示按钮
    getId(obj){
      let num = obj.query.num;
      this.isShowBtn = num?false:true;
      if(num)
        this.topTitleList=[{title:'学校资讯审核',src:'informationManage'},{title:'学校相册'}]
      else
        this.topTitleList=[{title:'学校资讯审核'}]
    },
    //点击返回
    topBack(src){
      if(!src) return
      this.$router.go(-1);
    },
    //切换列表
    topAudit(){
      this.auditPass = !this.auditPass;
    }
  },
  watch: {
    $route:function(val){
      this.getId(val);
    }
  },
}

</script>

<style lang='less'>
.spmDm-app{
  padding:20px;
  padding-top: 20px;
  position: relative;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: white;
  .spm_d1{
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(230,230,230,1);
    position: relative;
    .spm_d1_span{
      font-size: 18px;
      color:rgba(51,51,51,1);
    }
    .cur{
      cursor: pointer;
    }
    .cur:active{
      color:rgb(191,191,191);
    }
    .spm_d1_btn{
      position:absolute;
      top: -7px;
      right: 20px;
    }
  }
}
</style>