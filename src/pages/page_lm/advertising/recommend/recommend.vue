<template>
  <div class="cr-add fx">
    <div class="ssh_d1">
      <template v-for="(item,i) of topTitleList">
        <span :key="i" class="ssh_d1_span">
          {{item.title}}
        </span>
      </template>
    </div>
    <div class="cr_d1">
      <p class="cr_d1_p">推荐广告</p>
      <table class="layui-table">
        <thead>
          <tr>
            <th>位置</th>
            <th>学校名称</th>
            <th>课程名称</th>
            <th>内容详情</th>
            <th>操作</th>
          </tr> 
        </thead>
        <tbody>
          <tr v-for="(item,i) of list1" :key="i">
            <td>{{item.typeName}}</td>
            <td>{{item.currObj.schooleName}}</td>
            <td>{{item.currObj.currName}}</td>
            <td class="cr_td_color">查看</td>
            <td class="cr_td_color" @click="topGoToList(i,1,item.type)">修改</td>
          </tr>
        </tbody>
      </table>
      <p class="cr_d1_p">热门学校广告</p>
      <table class="layui-table">
        <thead>
          <tr>
            <th>位置</th>
            <th>学校名称</th>
            <th>课程数量</th>
            <th>内容详情</th>
            <th>操作</th>
          </tr> 
        </thead>
        <tbody>
          <tr v-for="(item,i) of list2" :key="i">
            <td>{{item.typeName}}</td>
            <td>{{item.currObj.schooleName}}</td>
            <td>{{item.currObj.currNum}}</td>
            <td class="cr_td_color">查看</td>
            <td class="cr_td_color" @click="topGoToList(i,2)">修改</td>
          </tr>
        </tbody>
      </table>
      <p class="cr_d1_p">热门课程广告</p>
      <table class="layui-table">
        <thead>
          <tr>
            <th>位置</th>
            <th>学校名称</th>
            <th>课程名称</th>
            <th>内容详情</th>
            <th>操作</th>
          </tr> 
        </thead>
        <tbody>
          <tr v-for="(item,i) of list3" :key="i">
            <td>{{item.typeName}}</td>
            <td>{{item.currObj.schooleName}}</td>
            <td>{{item.currObj.currName}}</td>
            <td class="cr_td_color">查看</td>
            <td class="cr_td_color" @click="topGoToList(i,3)">修改</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      topTitleList:[{title:'首页广告设置'}],    //顶部抬头显示
      list1:[
        {
          typeName:'小学推荐课程广告位',
          type:'小学',
          currObj:{
            schooleName:'重庆大学',
            currName:'小学语文',
          }
        },
        {
          typeName:'中学推荐课程广告位',
          type:'中学',
          currObj:{
            schooleName:'重庆大学',
            currName:'小学语文',
          }
        },
        {
          typeName:'艺术推荐课程广告位',
          type:'艺术',
          currObj:{
            schooleName:'重庆大学',
            currName:'小学语文',
          }
        },
        {
          typeName:'学历推荐课程广告位',
          type:'学历',
          currObj:{
            schooleName:'重庆大学',
            currName:'小学语文',
          }
        },
        {
          typeName:'职业推荐课程广告位',
          type:'职业',
          currObj:{
            schooleName:'重庆大学',
            currName:'小学语文',
          }
        },
        {
          typeName:'其他推荐课程广告位',
          type:'其他',
          currObj:{
            schooleName:'重庆大学',
            currName:'小学语文',
          }
        },
      ],
      list2:[
        {
          typeName:'热门学校广告位1',
          currObj:{
            schooleName:'重庆大学',
            currNum:'100',
          }
        },
        {
          typeName:'热门学校广告位2',
          currObj:{
            schooleName:'重庆大学',
            currNum:'100',
          }
        },
        {
          typeName:'热门学校广告位3',
          currObj:{
            schooleName:'重庆大学',
            currNum:'100',
          }
        },
        {
          typeName:'热门学校广告位4',
          currObj:{
            schooleName:'重庆大学',
            currNum:'100',
          }
        },
        {
          typeName:'热门学校广告位5',
          currObj:{
            schooleName:'重庆大学',
            currNum:'100',
          }
        },
        {
          typeName:'热门学校广告位6',
          currObj:{
            schooleName:'重庆大学',
            currNum:'100',
          }
        },
      ],
      list3:[
        {
          typeName:'热门课程广告位1',
          currObj:{
            schooleName:'重庆大学',
            currName:'小学语文',
          }
        },
        {
          typeName:'热门课程广告位2',
          currObj:{
            schooleName:'重庆大学',
            currName:'小学语文',
          }
        },
        {
          typeName:'热门课程广告位3',
          currObj:{
            schooleName:'重庆大学',
            currName:'小学语文',
          }
        },
        {
          typeName:'热门课程广告位4',
          currObj:{
            schooleName:'重庆大学',
            currName:'小学语文',
          }
        },
        {
          typeName:'热门课程广告位5',
          currObj:{
            schooleName:'重庆大学',
            currName:'小学语文',
          }
        },
        {
          typeName:'热门课程广告位6',
          currObj:{
            schooleName:'重庆大学',
            currName:'小学语文',
          }
        },
      ],
    };
  },

  methods: {
    topGoToList(num,typeNum,type=''){
      let obj = {id:this.$route.query.id,num,typeNum}
      if(type) obj.type = type;
      this.push(
        {
          path:'selectSchool',
          query:obj
        }  
      )
    }
  }

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
  overflow-y: auto;
  background: white;
  .ssh_d1{
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(230,230,230,1);
    position: relative;
    .ssh_d1_span{
      font-size: 18px;
      color:rgba(51,51,51,1);
    }
  }
  .cr_d1{
    width: 100%;
    height: auto;
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
}
</style>