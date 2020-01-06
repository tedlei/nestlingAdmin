<template>
  <div class="acli-app fx">
    <div class="cb_table">
      <table class="layui-table">
        <thead>
          <tr>
            <th>手机号码</th>
            <th>标题</th>
            <th>状态</th>
            <th>内容详情</th>
            <th>反馈时间</th>
          </tr> 
        </thead>
        <tbody>
          <tr v-for="(item,i) of schoolList" :key="i">
            <td>{{item.problemPhone}}</td>
            <td>{{item.problemTitle}}</td>
            <td>{{item.problemStatus*1===1?'未查看':'已查看'}}</td>
            <td class="cb_td_ck" @click="topLookOver(item.id)">查看</td>
            <td>{{item.problemTime}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="cb_fy">
      <el-pagination
        background
        layout="prev, pager, next"
        prev-text="上一页"
        next-text="下一页"
        :page-size='pageSize'
        :current-page='pageNum'
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      schoolList:[],
      pageNum:1,
      pageSize:20,
      total:0,
    };
  },
  created() {
    this.getCoupleList()
  },
  methods: {
    //查看
    topLookOver(id){
      this.push({path:'coupleBack/coupleBackDetail',query:{num:id,id:this.$route.query.id}})
    },

    //获取问题反馈列表
    getCoupleList(){
      let url = 'problem/getProblemList.do'
      let data={
        pageNum:''+this.pageNum,
        pageSize:''+this.pageSize
      }
      this.fetch({url,data,method:'post'},6).then(res=>{
        this.schoolList = res.data.rows;
        this.total = res.data.total;
        console.log(this.schoolList)
      })
    }
  }

}

</script>

<style lang='less'>
.acli-app{
  width: 100%;
  flex-direction: column;
  .cb_table{
    margin-top: 10px;
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
        .cb_td_ck{
          color:rgba(42,176,234,1);
          cursor: pointer;
        }
        .cb_td_jyAndsc{
          color:rgba(255,0,0,1);
          cursor: pointer;
        }
      }
    }
  }
  .cb_fy{
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