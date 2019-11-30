<template>
  <div class="cbDm-app fx">
    <div class="cb_d1">
      <template v-for="(item,i) of topTitleList">
        <span :key="i" class="cb_d1_span" :class="item.src?'cur':''" @click="topBack(item.src)">
          {{item.title}}
        </span>
        <i :key="i+'1'" v-if="item.src" class="el-icon-arrow-right"></i>
      </template>
      <el-button v-if="topTitleList.length>1" class="bsm_btn cd_d1_btn" type="primary" @click="topBack('curriculumManage')">返回</el-button>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import {Button,Select,Option,Input,MessageBox,Pagination} from 'element-ui'
import Vue from 'vue';
Vue.use(Button);
Vue.use(Select);
Vue.use(Option);
Vue.use(Input);
Vue.use(Pagination);
export default {
  data () {
    return {
      topTitleList:[{title:'问题反馈'}],    //顶部抬头显示
    };
  },

  created(){
    this.getId(this.$route);
  },

  methods: {
    //是否显示按钮
    getId(obj){
      let num = obj.query.num;
      if(num)
        this.topTitleList=[{title:'问题反馈',src:'coupleBackDetail'},{title:'问题反馈详情'}]
      else
        this.topTitleList=[{title:'问题反馈'}]
    },
    //点击返回
    topBack(src){
      if(!src) return
      this.$router.go(-1);
    },
  },
  watch: {
    $route:function(val){
      this.getId(val);
    }
  },
}

</script>

<style lang='less'>
.cbDm-app{
  padding:20px;
  padding-top: 20px;
  position: relative;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: white;
  .cb_d1{
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(230,230,230,1);
    position: relative;
    .cb_d1_span{
      font-size: 18px;
      color:rgba(51,51,51,1);
    }
    .cur{
      cursor: pointer;
    }
    .cur:active{
      color:rgb(191,191,191);
    }
    .cd_d1_btn{
      position:absolute;
      top: -7px;
      right: 20px;
    }
  }
}
</style>