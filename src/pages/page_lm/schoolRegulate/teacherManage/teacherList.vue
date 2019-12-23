<template>
  <div class="acli-app fx">
    <ul class="tm_ul">
      <li class="tm_li fx">
        <div class="tm_left_span">
          <span>授课类容</span>
        </div>
        <div class="tm_right_select">
          <el-select v-model="stl" filterable placeholder="请选择">
            <el-option
              v-for="item in selectTeachingList"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </div>
      </li>
      <li class="tm_li fx">
        <div class="tm_left_span">
          <span>搜索教师姓名</span>
        </div>
        <div class="tm_right_input">
          <el-input v-model="searchTeacher" placeholder="请输入教师姓名"></el-input>
        </div>
        <el-button class="tm_btn" type="primary" @click="topSearch">搜索</el-button>
      </li>
    </ul>
    <div class="tm_table">
      <table class="layui-table">
        <thead>
          <tr>
            <th>学校名称</th>
            <th>教师名称</th>
            <!-- <th>审核状态</th> -->
            <th>内容详情</th>
            <th>提交时间</th>
          </tr> 
        </thead>
        <tbody>
          <tr v-for="(item,i) of teacherList" :key="i">
            <td>{{item.organization_name}}</td>
            <td>{{item.teacher_name}}</td>
            <!-- <td>{{item.shneghe===1?'已上架':'已下架'}}</td> -->
            <td class="tm_td_ck" @click="topLookOver(item.id)">查看</td>
            <td>{{item.create_time}}</td>
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
import data from './data.js'
export default {
  props:['auditPass'],
  data () {
    return {
      // provinceList: [],   //省列表
      // cityList: [],  //市列表
      // province:'',    //省
      // city:'',    //市
      searchTeacher:'',

      selectTeachingList:data,   //获取授课内容列表
      stl:'',

      teacherList:[],   //获取课程数据

      allDataNum:0,   //获取数据总条数
      atPresentNum:1,    //当前页数
      pageData:20,    //每页的数据条数
    };
  },

  created(){
    this.topSearch();
    // this.getprovinceList();
  },

  methods: {
    //查看详情
    topLookOver(id){
      
      this.push({path:'teacherManage/teacherDetail',query:{num:id,id:this.$route.query.id}})
    },
    //获取省列表
    // getprovinceList(){
    //   this.provinceList = chinaCityList['0'];
      
    // },
    //获取市列表
    // getCityList(val){
    //   let list = chinaCityList['0'];
    //   let num = list.indexOf(val);
    //   this.cityList = chinaCityList['0_'+num]
    // },

    //获取教师列表
    topSearch(){
      let url = '/school/searchTeacherVerify.do';
      let data = {
        teacherAdept:this.stl,
        teacherName:this.searchTeacher,
        page:''+this.atPresentNum,
        limit:''+this.pageData
      }
      this.fetch({url,data,method:'post'},6).then(res=>{
        let {rows,total} = res.data;
        this.allDataNum = total;
        this.teacherList = rows;
      })
    },
     //获取分页数
    topClick(num){
      this.atPresentNum = num;
      this.topSearch();
    }
  },
  watch:{
    'auditPass':function(){
      this.topSearch()
    },
    // 'province':function(val){
    //   if(!val)return
    //   this.getCityList(val);
    //   this.topSearch();
    // },
    // "city":function(){
    //   this.topSearch();
    // }
  }

}

</script>

<style lang='less'>
.acli-app{
  width: 100%;
  flex-direction: column;
  .tm_ul{
    .tm_li{
      margin-top: 10px;
      align-items: center;
      .tm_left_span{
        width: 100px;
        text-align: right;
        font-size: 16px;
        color:rgba(102,102,102,1);
      }
      .tm_right_select{
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
      .tm_right_input{
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
      // .tm_right_input{
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