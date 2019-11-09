<template>
  <div class="acli-app fx">
    <ul class="cum_ul">
      <li class="cum_li fx">
        <div class="cum_left_span">
          <span>地区选择</span>
        </div>
        <div class="cum_right_select">
          <el-select v-model="province" placeholder="请选择">
            <el-option
              v-for="item in provinceList"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
          <el-select v-model="city" placeholder="请选择">
            <el-option
              v-for="item in cityList"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </div>
      </li>
    </ul>
    <div class="cum_table">
      <table class="layui-table">
        <thead>
          <tr>
            <th>课程名称</th>
            <th>审核状态</th>
            <th>内容详情</th>
            <th>提交时间</th>
          </tr> 
        </thead>
        <tbody>
          <tr v-for="(item,i) of currList" :key="i">
            <td>{{item.name}}</td>
            <td>{{item.shneghe===1?'未审核':'已审核'}}</td>
            <td class="cum_td_ck" @click="topLookOver(item.id)">查看</td>
            <td>{{item.date}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="cum_fy">
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
      provinceList: [],   //省列表
      cityList: [],  //市列表
      province:'',    //省
      city:'',    //市

      currList:[],   //获取课程数据

      allDataNum:100,   //获取数据总条数
      atPresentNum:1,    //当前页数
      pageData:20,    //每页的数据条数

    };
  },

  created(){
    this.topSearch();
    this.getprovinceList();
  },

  methods: {
    //查看
    topLookOver(id){
      this.push({path:'curriculumManage/curriculumDetail',query:{num:id,id:this.$route.query.id}})
    },

    //获取省列表
    getprovinceList(){
      this.provinceList = chinaCityList['0'];
      
    },
    //获取市列表
    getCityList(val){
      let list = chinaCityList['0'];
      let num = list.indexOf(val);
      this.cityList = chinaCityList['0_'+num]
    },

    topSearch(){
      this.currList = [];
      let obj = {auditPass:this.auditPass,atPresentNum:this.atPresentNum,pageData:this.pageData};
      if(this.province) obj.province = this.province;
      if(this.city) obj.city = this.city;
      if(!this.auditPass){
        this.currList = [
          {id:100001,name:'小学数学一对一辅导',shneghe:1,date:'2019-9-2 10:14:14'},
          {id:100001,name:'小学数学一对一辅导',shneghe:1,date:'2019-9-2 10:14:14'},
          {id:100001,name:'小学数学一对一辅导',shneghe:1,date:'2019-9-2 10:14:14'},
          {id:100001,name:'小学数学一对一辅导',shneghe:1,date:'2019-9-2 10:14:14'}
        ]
      }else{
        this.currList = [
          {id:100001,name:'小学数学一对一辅导',shneghe:2,date:'2019-9-2 10:14:14'},
          {id:100001,name:'小学数学一对一辅导',shneghe:2,date:'2019-9-2 10:14:14'},
          {id:100001,name:'小学数学一对一辅导',shneghe:2,date:'2019-9-2 10:14:14'},
          {id:100001,name:'小学数学一对一辅导',shneghe:2,date:'2019-9-2 10:14:14'}
        ]
      }
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
    'province':function(val){
      if(!val)return
      this.getCityList(val);
      this.topSearch();
    },
    "city":function(){
      this.topSearch();
    }
  }

}

</script>

<style lang='less'>
.acli-app{
  width: 100%;
  flex-direction: column;
  .cum_ul{
    .cum_li{
      margin-top: 10px;
      align-items: center;
      .cum_left_span{
        width: 80px;
        font-size: 16px;
        color:rgba(102,102,102,1);
      }
      .cum_right_select{
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
      // .cum_right_input{
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
  .cum_table{
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
        .cum_td_ck{
          color:rgba(42,176,234,1);
          cursor: pointer;
        }
        .cum_td_jyAndsc{
          color:rgba(255,0,0,1);
          cursor: pointer;
        }
      }
    }
  }
  .cum_fy{
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