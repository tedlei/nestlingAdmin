<template>
  <div class="tepu-app fx" ref="tepu_app">
    <div class="tepu_d1">
      <router-link to="/index/teacherPublish?id=3" v-if="urlList.length>0">资讯发布</router-link>
      <span v-else>资讯发布</span>
      <template v-for="(item,i) of urlList">
        <span :key="i">>
          <router-link :to="item.url+'?id=3'" v-if="item.url">{{item.name}}</router-link>
          <span v-else>{{item.name}}</span>
        </span>
      </template>
    </div>

    <router-view class="tepu_view"></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      urlList:[],
    };
  },
  mounted(){
     this.getUrl(this.$route.path)
  },
  methods: {
    getUrl(url){
      this.urlList = [] 
      let arr = url.slice(7).split('/');
      // if(arr.indexOf('addTeacher')!==-1)this.urlList=[{name:'添加教师'}]
      // if(arr.indexOf('teacherUndergo')!==-1)
      //   this.urlList=[
      //     {name:'添加教师',url:'/index/teacherPublish/addTeacher?id=3'},
      //     {name:'教师经历添加'}
      //   ]
      // console.log(this.urlList)
    }
  },

  watch:{
    $route:function(path){
      this.getUrl(path.path);
    }
  }

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