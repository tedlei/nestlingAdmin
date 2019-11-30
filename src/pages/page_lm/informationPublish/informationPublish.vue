<template>
  <div class="tepu-app fx" ref="tepu_app">
    <div class="tepu_d1">
      <!-- <router-link to="/index/teacherPublish?id=3" v-if="urlList.length>0">资讯发布</router-link>
      <span v-else>资讯发布</span>
      <template v-for="(item,i) of urlList">
        <span :key="i">>
          <router-link :to="item.url+'?id=3'" v-if="item.url">{{item.name}}</router-link>
          <span v-else>{{item.name}}</span>
        </span>
      </template> -->
      <template v-for="(item,i) of topTitleList">
        <span :key="i" class="tepu_d1_span" :class="item.src?'cur':''" @click="topBack(item.src)">
          {{item.title}}
        </span>
        <i :key="i+'1'" v-if="item.src" class="el-icon-arrow-right"></i>
      </template>
      <el-button v-if="topTitleList.length>1" class="tepu_btn tepu_d1_btn" type="primary" @click="topBack('curriculumManage')">返回</el-button>
    </div>

    <router-view class="tepu_view"></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      topTitleList:[{title:'学校教师审核'}],    //顶部抬头显示
      urlList:[],
    };
  },
 created(){
    this.getId(this.$route);
  },

  methods: {
     //是否显示按钮
    getId(obj){
      let str = obj.path;
      console.log(str)
      // let num = obj.query.num;
      // if(num)
      //   this.topTitleList=[{title:'学校课程审核',src:'curriculumManage'},{title:'学校设置详情'}]
      // else
      //   this.topTitleList=[{title:'学校课程审核'}]
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

<style lang='less' scoped>
.tepu-app{
  padding:20px 20px;
  width: 100%;
  height: 100%;
  background-color: white;
  flex-direction: column;
  .tepu_d1{
    width: 100%;
    padding-bottom: 20px;
    border-bottom: 1px solid #E6E6E6;
    font-size: 18px;
    color:rgba(51,51,51,1);
  }
  .tepu_view{
    width: 100%;
    flex: 1;
    overflow-y: auto;
  }
}
</style>