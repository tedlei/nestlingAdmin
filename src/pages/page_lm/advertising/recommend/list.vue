<template>
  <div class="cr_d1">
    <template v-for="(item,i) of listObj">
      <p :key="i+'p'" class="cr_d1_p">{{item.title}}</p>
      <table :key="i+'table'" class="layui-table">
        <thead>
          <tr>
            <th>位置</th>
            <th>学校名称</th>
            <th>{{i===1?'课程数量':'课程名称'}}</th>
            <th>内容详情</th>
            <th>操作</th>
          </tr> 
        </thead>
        <tbody>
          <tr v-for="(obj,j) of item.list" :key="j+'tr'">
            <td>{{obj.title}}</td>
            <td>{{obj.organizationName}}</td>
            <td>{{i===1?obj.subjectNum:obj.courseName}}</td>
            <td class="cr_td_color" @click="topCheck(obj.url,i)">查看</td>
            <td class="cr_td_color" @click="topGoToList(obj.url,j,i,obj.title)">修改</td>
          </tr>
        </tbody>
      </table>
    </template>
  </div>
</template>

<script>
export default {
  data () {
    return {
      topTitleList:[{title:'首页广告设置'}],    //顶部抬头显示
      listObj:[
        {
          title:'推荐广告',
          list:[
            {url:'',title:'小学推荐课程广告位',organizationName:'',courseName:''},
            {url:'',title:'中学推荐课程广告位',organizationName:'',courseName:''},
            {url:'',title:'艺术推荐课程广告位',organizationName:'',courseName:''},
            {url:'',title:'学历推荐课程广告位',organizationName:'',courseName:''},
            {url:'',title:'职业推荐课程广告位',organizationName:'',courseName:''},
            {url:'',title:'其他推荐课程广告位',organizationName:'',courseName:''},
          ]
        },
        {
          title:'热门学校广告',
          list:[
            {url:'',title:'热门学校广告位1',organizationName:'',subjectNum:0},
            {url:'',title:'热门学校广告位2',organizationName:'',subjectNum:0},
            {url:'',title:'热门学校广告位3',organizationName:'',subjectNum:0},
            {url:'',title:'热门学校广告位4',organizationName:'',subjectNum:0},
            {url:'',title:'热门学校广告位5',organizationName:'',subjectNum:0},
            {url:'',title:'热门学校广告位6',organizationName:'',subjectNum:0},
          ]
        },
        {
          title:'热门课程广告',
          list:[
            {url:'',title:'热门课程广告位1',organizationName:'',courseName:''},
            {url:'',title:'热门课程广告位2',organizationName:'',courseName:''},
            {url:'',title:'热门课程广告位3',organizationName:'',courseName:''},
            {url:'',title:'热门课程广告位4',organizationName:'',courseName:''},
            {url:'',title:'热门课程广告位5',organizationName:'',courseName:''},
            {url:'',title:'热门课程广告位6',organizationName:'',courseName:''},
          ]
        },
      ],
    };
  },

  created() {
    this.getList(1)
    this.getList(2)
    this.getList(3)
  },

  methods: {
    topGoToList(url,num,place,title){
      let query = {id:this.$route.query.id,url,num,place,title}
      this.push({path:"/index/recommend/selectSchool",query})
    },

    //获取数据
    getList(categoryId){
      let url = '/content/cateId.do';
      let data = {categoryId};
      let ull = this.uploadList;
      this.fetch({url,data,method:'get'},2).then(res=>{
       this.setList(categoryId,res.data);
      })
    },

    //渲染数据
    setList(num,list){
      let curr = this.listObj[num-1].list;
      for(let n in curr){
        if(list[n]){
          for(let name in curr[n]){
            if(name!=='title'&&name!=='url'){
              curr[n][name] = list[n][name];
            }  
            if(name === 'url'){
              curr[n]['url'] = list[n]['id'];
            }
          }
        }
      }
    },

    //点击查看课程
    topCheck(id,i){
      this.push({
        path:'/index/recommend/'+(i===1?'schoolAuditDetail':'curriculumDetail'),
        query:{id:this.$route.query.id,num:id}
      })
    }
  }
}

</script>

<style lang='less' scoped>
.cr_d1{
  width: 100%;
  flex: 1;
  overflow-y: auto;
  .cr_d1_p{
    padding:10px 0;
  }
  tr{
    th,td{
      text-align: center;
    }
    .cr_td_color{
      color: #2AB0EA;
      cursor: pointer;
    }
  }
}
</style>