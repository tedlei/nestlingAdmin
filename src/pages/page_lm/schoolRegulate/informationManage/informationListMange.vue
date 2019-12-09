<template>
  <div class="acli-app fx">
    <ul class="iam_ul">
      <li class="iam_li fx">
        <div class="iam_left_span">
          <span>分类选择</span>
        </div>
        <div class="iam_right_select">
          <el-select v-model="infoClass">
            <el-option key='' label="请选择" value=""></el-option>
            <el-option
              v-for="item in infoClassList"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </div>
      </li>
      <li class="iam_li fx">
        <div class="iam_left_span">
          <span>搜索</span>
        </div>
        <div class="iam_right_input">
          <el-input v-model="searchInfo" placeholder="请输入内容"></el-input>
        </div>
        <el-button class="iam_btn" type="primary" @click="topSearch">搜索</el-button>
      </li>
    </ul>
    <div class="iam_table">
      <table class="layui-table">
        <thead>
          <tr>
            <th>资讯名称</th>
            <th>审核状态</th>
            <th>内容详情</th>
            <th>提交时间</th>
          </tr> 
        </thead>
        <tbody>
          <tr v-for="(item,i) of infoemList" :key="i">
            <td>{{item.schoolTopic}}</td>
            <td>{{item.schoolStatus*1===1?'已上架':'已下架'}}</td>
            <td class="iam_td_ck" @click="topLookOver(item.id)">查看</td>
            <td>{{item.schoolTime}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="iam_fy">
      <el-pagination
        background
        layout="prev, pager, next"
        prev-text="上一页"
        next-text="下一页"
        :total="allDataNum"
        :page-size='pageData'
        :current-page = 'atPresentNum'
        @current-change = 'topClick'>
      </el-pagination>
    </div>
  </div>
</template>

<script>
import chinaCityList from '../../../../../static/js/chinaCityList.js'
export default {
  props:['auditPass'],
  data () {
    return {
      infoClassList:['学前资讯','小学资讯','中学资讯','艺术培训','学历提升','职业培训','资格证书','其他资讯'],  //资讯分类
      infoClass:'',  

      searchInfo:'',
      infoemList:[],   //获取资讯数据

      allDataNum:0,   //获取数据总条数
      atPresentNum:1,    //当前页数
      pageData:20,    //每页的数据条数
    };
  },
  created(){
    this.topSearch();
  },
  methods: {
    //查看
    topLookOver(id){
      this.push({path:'informationManage/informationDetail',query:{num:id,id:this.$route.query.id}})
    },

    //获取资讯列表
    topSearch(){
      let url = 'getMessage/message.do';
      let data = {
        type:this.infoClass,
        status:'1',
        pageSize:''+this.pageData,
        pageNum:''+this.atPresentNum,
        topic:this.searchInfo

      };
      if(this.auditPass){
        data.status = '2'
      }
      this.fetch({url,data,method:'post'},'http://192.168.3.63:9106').then(res=>{
        this.infoemList = res.data.rows;
        this.allDataNum = res.data.total;
      })
    },
     //获取分页数
    topClick(num){
      this.atPresentNum = num;
    }
  },
  watch:{
    'auditPass':function(){
      this.topSearch()
    },
    'infoClass':function(){
      this.topSearch()
    }
  }
}
</script>

<style lang='less'>
.acli-app{
  width: 100%;
  flex-direction: column;
  .iam_ul{
    .iam_li{
      margin-top: 10px;
      align-items: center;
      .iam_left_span{
        width: 80px;
        font-size: 16px;
        color:rgba(102,102,102,1);
      }
      .iam_right_input{
        margin-left:10px;
        width:376px;
        height:50px;
        background:rgba(255,255,255,1);
        border:1px solid rgba(230,230,230,1);
        border-radius:5px;
        .el-input{
          height: 100%;
          .el-input__inner{
            height: 100%;
            border:0;
            font-size: 16px;
          }
        }
      }
      .el-button{
        width: 90px;
        height: 50px;
        margin-left: 20px;
      }
      .iam_right_select{
        margin-left:10px;
        height: 50px;
        .el-select{
          height: 100%;
          border-radius:5px;
          .el-input{
            height: 100%;
            .el-input__inner{
              height: 100%;
              font-size: 16px;
            }
          }
        }
        .el-select+.el-select{
          margin-left: 20px;
        }
      }
      // .iam_right_input{
      //   margin-left:10px;
      //   width:376px;
      //   height:50px;
      //   background:rgba(255,255,255,1);
      //   border:1px solid rgba(230,230,230,1);
      //   border-radius:5px;
      //   .el-input{
      //     height: 100%;
      //     .el-input__inner{
      //       height: 100%;
      //       border:0;
      //       font-size: 16px;
      //     }
      //   }
      // }
    }
  }
  .iam_table{
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
        .iam_td_ck{
          color:rgba(42,176,234,1);
          cursor: pointer;
        }
        .iam_td_jyAndsc{
          color:rgba(255,0,0,1);
          cursor: pointer;
        }
      }
    }
  }
  .iam_fy{
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