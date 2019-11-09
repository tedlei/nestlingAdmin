<template>
  <div class="acli-app fx">
    <div class="ssh_d1">
      <template v-for="(item,i) of topTitleList">
        <span :key="i" class="ssh_d1_span">
          {{item.title}}
        </span>
      </template>
    </div>
    <div class="sels_input">
      <el-input v-model="input" placeholder="请输入内容"></el-input>
      <el-button type="primary">主要按钮</el-button>
    </div>
    <div class="tm_table">
      <table class="layui-table">
        <thead>
          <tr>
            <th>学校名称</th>
            <th>课程名称</th>
            <th>内容详情</th>
            <th>设置</th>
          </tr> 
        </thead>
        <tbody>
          <tr v-for="(item,i) of schoolList" :key="i">
            <td>{{item.schoolName}}</td>
            <td>{{item.currName}}</td>
            <td class="tm_td_ck" @click="topLookOver(item.id)">查看</td>
            <td class="tm_td_ck" >设置</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="tm_fy">
      <el-pagination
        background
        layout="prev, pager, next"
        prev-text="上一页"
        next-text="下一页"
        :total="1000">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      topTitleList:[{title:'首页广告设置'}],    //顶部抬头显示
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',

      schoolList:[
        {id:100001,schoolName:'重庆大学',currName:'小学课程',shneghe:1,date:'2019-9-2 10:14:14'},
        {id:100001,schoolName:'重庆大学',currName:'小学课程',shneghe:1,date:'2019-9-2 10:14:14'},
        {id:100001,schoolName:'重庆大学',currName:'小学课程',shneghe:1,date:'2019-9-2 10:14:14'},
        {id:100001,schoolName:'重庆大学',currName:'小学课程',shneghe:1,date:'2019-9-2 10:14:14'},
        {id:100001,schoolName:'重庆大学',currName:'小学课程',shneghe:1,date:'2019-9-2 10:14:14'},
        {id:100001,schoolName:'重庆大学',currName:'小学课程',shneghe:1,date:'2019-9-2 10:14:14'},
        {id:100001,schoolName:'重庆大学',currName:'小学课程',shneghe:1,date:'2019-9-2 10:14:14'},
        {id:100001,schoolName:'重庆大学',currName:'小学课程',shneghe:1,date:'2019-9-2 10:14:14'},
        {id:100001,schoolName:'重庆大学',currName:'小学课程',shneghe:1,date:'2019-9-2 10:14:14'},
        {id:100001,schoolName:'重庆大学',currName:'小学课程',shneghe:1,date:'2019-9-2 10:14:14'},
        {id:100001,schoolName:'重庆大学',currName:'小学课程',shneghe:1,date:'2019-9-2 10:14:14'},
        {id:100001,schoolName:'重庆大学',currName:'小学课程',shneghe:1,date:'2019-9-2 10:14:14'},
        {id:100001,schoolName:'重庆大学',currName:'小学课程',shneghe:1,date:'2019-9-2 10:14:14'},
        {id:100001,schoolName:'重庆大学',currName:'小学课程',shneghe:1,date:'2019-9-2 10:14:14'},
        {id:100001,schoolName:'重庆大学',currName:'小学课程',shneghe:1,date:'2019-9-2 10:14:14'},
        {id:100001,schoolName:'重庆大学',currName:'小学课程',shneghe:1,date:'2019-9-2 10:14:14'},
        {id:100001,schoolName:'重庆大学',currName:'小学课程',shneghe:1,date:'2019-9-2 10:14:14'},
        {id:100001,schoolName:'重庆大学',currName:'小学课程',shneghe:1,date:'2019-9-2 10:14:14'},
        {id:100001,schoolName:'重庆大学',currName:'小学课程',shneghe:1,date:'2019-9-2 10:14:14'},
      ]
    };
  },
  created(){
    console.log(this.$route.query)
  },
  methods: {
    //查看
    topLookOver(id){
      this.push({path:'teacherManage/teacherDetail',query:{num:id,id:this.$route.query.id}})
    },
  }

}

</script>

<style lang='less'>
.acli-app{
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
  .sels_input{
    padding-top: 20px;
    .el-input{
      width: 300px;
    }
    .el-button{
      margin-left: 20px;
    }
  }
  .tm_table{
    margin-top: 30px;
    flex: 1;
    border-top: 1px solid rgba(230,230,230,1);
    border-bottom: 1px solid rgba(230,230,230,1);
    overflow-y: auto;
    .layui-table{
      margin: 0;
      thead>tr>th{
        text-align: center;
      }
      tbody>tr{
        td{
          text-align: center;
        }
        .tm_td_ck{
          color:rgba(42,176,234,1);
          cursor: pointer;
        }
        .tm_td_jyAndsc{
          color:rgba(255,0,0,1);
          cursor: pointer;
        }
      }
    }
  }
  .tm_fy{
    margin-top: 20px;
    text-align: center;
    .number{
      background-color:transparent;
    }
    .btn-prev,.btn-next{
      padding-left: 10px;
      padding-right: 10px;
    }
    .btn-prev:active,.btn-next:active{
      background:rgba(42,176,234,1);
      color: #FFFFFF;
    }
  }
}
</style>