<template>
  <div class="acli-app fx">
    <div class="sels_input">
      <el-input v-model="input" placeholder="请输入内容"></el-input>
      <el-button type="primary" @click="getcurrList">主要按钮</el-button>
    </div>
    <div class="tm_table">
      <table class="layui-table">
        <thead>
          <tr>
            <th>学校名称</th>
            <th>{{query.place*1===1?"课程数量":"课程名称"}}</th>
            <th>内容详情</th>
            <th>设置</th>
          </tr> 
        </thead>
        <tbody>
          <tr v-for="(item,i) of schoolList" :key="i">
            <template v-if="item.id!==query.url">
              <td>{{item.organizationName}}</td>
              <td>{{query.place*1===1?item.subjectNum:item.courseName}}</td>
              <td class="tm_td_ck" @click="topLookOver(item.id)">查看</td>
              <td class="tm_td_ck" @click="settingGG(item)">设置</td>
            </template>
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
        @current-change = "topUpdate"
        :page-size="pageSize"
        :current-page="pageNo"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      topTitleList:[{title:'首页广告设置'}],    //顶部抬头显示
      input: '',   //搜索

      schoolList:[],    //课程或学校列表

      pageNo:1,   //当前页
      pageSize:20,   //页条数
      total:0,   //总条数

      query:{},   //上一个页面参数
    };
  },
  created(){
    this.getParam(this.$route.query)
  },
  methods: {
    //查看
    topLookOver(id){
      this.push({
        path:'/index/recommend/'+this.query.place*1===1?'schoolAuditDetail':'curriculumDetail',
        query:this.query
      })
    },

    //或上一个页面参数
    getParam(query){
      this.query = query;
      this.getcurrList();
    },

    getcurrList(){
      let title = '';
      let url = '/curri/findByName.do';
      let data = {pageNo:''+this.pageNo,pageSize:''+this.pageSize,keywords:this.input};
      let urlNum = 1;
      this.schoolList = [];
      if(this.query.place*1 === 0){
        switch(this.query.num*1){
          case 0 : title = '小学';
            break
          case 1 : title = '中学';
            break
          case 2 : title = '艺术';
            break
          case 3 : title = '学历';
            break
          case 4 : title = '职业';
            break
          case 5 : title = '其他';
            break
        }
        data.name = title;
        // data = {name:title,pageNo:''+this.pageNo,pageSize:''+this.pageSize,keywords:this.input};
      }
      if(this.query.place*1 === 1){
        urlNum = 6;
        data.schoolStatus = '3';
        url = '/school/findByPage.do';
      }
      // if(this.query.place*1 === 2){
      //   data = {pageNo:''+this.pageNo,pageSize:''+this.pageSize,keywords:this.input};
      // }
      this.fetch({url,data,method:'post'},urlNum).then(res=>{
        this.schoolList = res.data.rows;
        this.total = res.data.total
      })
    },

    //切换分页时
    topUpdate(num){
      this.pageNo = num;
      this.getcurrList();
    },

    //设置广告
    settingGG(item){
      let url = '/content/update.do';
      let query = this.query;
      let data = [{
        categoryId:''+(query.place+1), //广告类目id
        title:query.title,      //标题
        url:item.id,        //连接
        sortOrder:''+(query.num+1)   //位置
      }]
      console.log(data)
      this.fetch({url,data,method:'post'},6).then(res=>{
        let {message,success} = res.data;
        if(success){
          this.push({path:'/index/recommend',query:{id:query.id}})
        }
        this.$message({message,type:success?'success':'warning'});
      })
    }
  }

}

</script>

<style lang='less'>
.acli-app{
  height: 100%;
  flex-direction: column;
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