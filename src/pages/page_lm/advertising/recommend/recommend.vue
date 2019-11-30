<template>
  <div class="cr-add fx">
    <div class="ssh_d1">
      <template v-for="(item,i) of topTitleList">
        <span :key="i"  class="ssh_d1_span" v-if="i<topTitleList.length-1">
          <span class="hover" @click="topTz(item)">
            {{item.title}}
          </span>
          <span class="pading">></span>
        </span>
        <span :key="i" class="ssh_d1_span" v-else>{{item.title}}</span>
      </template>
    </div>
    <router-view :auditPass="true"></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      topTitleList:[{title:'首页广告设置'}],    //顶部抬头显示
    };
  },

  created() {
    this.getId(this.$route);
  },

  methods: {
    //是否显示按钮
    getId(obj){
      let arr = obj.path.slice(7).split('/');
      let query = obj.query;
      let ttl = this.topTitleList = [];
      for(let num in arr){
        let str = arr[num];
        if(str === "recommend"){
          ttl.push({title:'首页广告设置',url:'/index/recommend',query:{id:query.id}})
        }
        if(str === 'selectSchool'){
          ttl.push({
            title:'选择列表',
            url:'/index/recommend/selectSchool',
            query:{id:query.id,url:query.url,num:query.num,place:query.place,title:query.title}
          })
        }
        if(str === 'curriculumDetail'||str === 'schoolAuditDetail'){
          if(query.title){
            ttl.push({
              title:'选择列表',
              url:'/index/recommend/selectSchool',
              query:{id:query.id,url:query.url,num:query.num,place:query.place,title:query.title}
            })
          }
          ttl.push({title:'详情',url:'',query:{}})
        }
      }
      delete ttl[ttl.length-1].url;
      delete ttl[ttl.length-1].query;
      this.topTitleList = ttl;
    },

    //点击跳转时
    topTz(item){
      let {url,query} = item 
      this.push({path:url,query});
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
.cr-add{
  padding:20px;
  padding-top: 20px;
  position: relative;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: white;
  .ssh_d1{
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(230,230,230,1);
    position: relative;
    .ssh_d1_span{
      font-size: 18px;
      color:rgba(51,51,51,1);
      .pading{
        padding:0 10px;
      }
    }
    .hover:hover{
      color: #2ab0ea;
      cursor: pointer;
    }
  }
}
</style>