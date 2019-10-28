<template>
  <div class="teli-app">
    <div class="teli_d1">
      <span>资讯添加</span>
      <button type="button" @click="topGoToAdd(false)" class="teli_btn">添加</button>
    </div>

    <table class="layui-table teli_table">
      <thead>
        <tr>
          <th>序号</th>
          <th>标题</th>
          <th>作者</th>
          <th>发布时间</th>
          <th>资讯操作</th>
        </tr> 
      </thead>
      <tbody>
        <tr v-for="(item,i) of teacherList" :key="i">
          <td>{{i+1}}</td>
          <td>{{item.topic}}</td>
          <td>{{item.writer}}</td>
          <td>{{item.fbDate}}</td>
          <td>
            <span @click="topGoToAdd(1)">编辑</span>
            <span @click="topDelete(i)">删除</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      teacherList:[
        {topic:'这是标题',writer:'这是作者',fbDate:'2019-10-10 12:12:12'}
      ]
    };
  },


  methods: {
    //点击修改时
    topDelete(num){
      this.teacherList.splice(num,1);
    },

    //点击跳转
    topGoToAdd(num){
      let src = 'informationPublish/addInformation?id='+this.$route.query.id
      if(num) src += '&num='+num
      this.push(src)
    }
  }

}

</script>

<style lang='less' scoped>
.teli-app{
  width: 100%;
  .teli_d1{
    padding-top: 30px;
    span{
      font-size: 18px;
      color:rgba(51,51,51,1);
    }
    .teli_btn{
      margin-left: 30px;
      width:120px;
      height:50px;
      background:rgba(42,176,234,1);
      border-radius:5px;
      font-size: 18px;
      color:rgba(255,255,255,1);
      cursor: pointer;
    }
  }
  .teli_table{
    margin-top: 30px;
    thead>tr{
      background:rgba(250,250,250,1);
      th{
        text-align: center;
        color:rgba(51,51,51,1);
      }
    }
    tbody>tr{
      td{
        text-align: center;
        color:rgba(102,102,102,1);
        span{
          cursor: pointer;
        }
        span:first-child{
          color:rgba(42,176,234,1);
        }
        span:last-child{
          color:rgba(153,153,153,1);
        }
        span+span{
          margin-left: 20px;
        }
      }
    }
  }
}
</style>