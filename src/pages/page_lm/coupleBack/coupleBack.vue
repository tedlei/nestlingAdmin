<template>
  <div class="cbDm-app fx">
    <div class="cb_d1">
      <template v-for="(item,i) of topTitleList">
        <span :key="i" class="cb_d1_span">
          {{item.title}}
        </span>
      </template>
      <!-- <span class="cb_d1_btn" v-show="isShowBtn">
        <el-button class="cb_btn" type="primary" @click="topAudit">{{auditPass?'未审核':'审核通过列表'}}</el-button>
      </span> -->
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
      auditPass:false,   //true:  审核通过    false：未审核
      // isShowBtn:true,   //是否显示按钮
    };
  },

  created(){
    this.getId(this.$route);
  },

  methods: {
    //是否显示按钮
    getId(obj){
      let num = obj.query.num;
      // console.log(num)
      // this.isShowBtn = num?false:true;
    },

    //切换列表
    // topAudit(){
    //   this.auditPass = !this.auditPass;
    // }
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
    // .cb_d1_btn{
    //   position:absolute;
    //   top: -7px;
    //   right: 20px;
    // }
  }
}
</style>