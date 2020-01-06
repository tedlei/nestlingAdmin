<template>
  <div class="acli-app fx">
    <ul class="cum_ul">
      <li class="cum_li fx">
        <div class="cum_left_span">
          <span>分类选择</span>
        </div>
        <div class="cum_right_select">
          <el-select v-model="currClass">
            <el-option key="请选择" label="请选择课程分类" value=""></el-option>
            <el-option
              v-for="item in currListClass"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>

          <el-select v-model="gradeClass" v-if="gradeClassList.length>0">
            <el-option key="请选择" label="请选择年级分类" value=""></el-option>
            <el-option
              v-for="item in gradeClassList"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>

          <el-select v-model="subjectClass" v-if="subjectClassList.length>0">
            <el-option key="请选择" label="请选择科目分类" value=""></el-option>
            <el-option
              v-for="item in subjectClassList"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </div>
      </li>
      <li class="cum_li fx">
        <div class="cum_left_span">
          <span>搜索</span>
        </div>
        <div class="cum_right_input">
          <el-input v-model="currSeach" placeholder="请输入内容"></el-input>
        </div>
        <el-button class="cum_btn" type="primary" @click="topSearch">搜索</el-button>
      </li>
    </ul>
    <div class="cum_table">
      <table class="layui-table">
        <thead>
          <tr>
            <th>课程名称</th>
            <th>学校名称</th>
            <th>审核状态</th>
            <th>内容详情</th>
            <th>提交时间</th>
          </tr> 
        </thead>
        <tbody>
          <tr v-for="(item,i) of currList" :key="i">
            <td>{{item.courseName}}</td>
            <td>{{item.organizationName}}</td>
            <td>{{item.courseStatus*1===0?'已上架':'已下架'}}</td>
            <td class="cum_td_ck" @click="topLookOver(item.id)">查看</td>
            <td>{{item.createTime}}</td>
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
import data from './data'
export default {
  props:['auditPass'],
  data () {
    return {
      currListClass: [],   //课程分类列表
      gradeClassList:[],   //年级分类列表
      subjectClassList:[],//科目分类列表
      currClass:'',    //课程分类
      gradeClass:'',    //年级分类
      subjectClass:'',//科目分类

      currSeach:'',   //搜索

      currList:[],   //获取课程数据

      allDataNum:100,   //获取数据总条数
      atPresentNum:1,    //当前页数
      pageData:20,    //每页的数据条数

    };
  },

  created(){
    this.topSearch();
    this.getCurrClass()
  },

  methods: {
    //查看
    topLookOver(id){
      this.push({path:'curriculumManage/curriculumDetail',query:{num:id,id:this.$route.query.id}})
    },
    
    //获取课程分类
    getCurrClass(){
      let list = data.condList[0].type;
      let num = list.indexOf('不限');
      if(num!==-1)list.splice(num,1)
      this.currListClass = list
    },

    //获取年级分类
    getGradeClass(num){
      this.gradeClassList = [];
      this.subjectClassList =[];
      this.subjectClass = '';
      this.gradeClass = '';
      if(num===0||num===3||num===7){
        this.getSubjectClass(num,0,false);
      }else{
        let gl = data.gradeList;
        if(num===1||num===2) num--;
        else num -= 2;
        this.gradeClassList = gl[num];
      }
    },

    //获取科目分类
    getSubjectClass(num,num1,type){
      this.subjectClassList =[];
      this.subjectClass = '';
      let sj = data.subject;
      if(type){
        if(num===1||num===2){
          num1 = this.gradeClassList[num-1].length-1===num1?1:0;
        }
        this.subjectClassList = sj[num][num1];
      }else{
        this.subjectClassList = sj[num];
      }
    },

    //获取课程列表
    topSearch(){
      this.currList = [];
      let url = '/curri/findByName.do';
      let data = {
        keywords:this.currSeach,
        pageNo:''+this.atPresentNum,
        pageSize:''+this.pageData,
        name:this.currClass,
        schoolOne:this.subjectClass,
        schoolTwo:this.gradeClass,
        courseStatus:'0',
      }
      if(this.auditPass){
        data.courseStatus = '1';
      }
      this.fetch({url,data,method:'post'},1).then(res=>{
        this.currList = res.data.rows;
        this.allDataNum = res.data.total;
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

    'currClass':function(val){
      if(!val) {
        this.topSearch();
        return
      }
      let list = data.condList[0].type;
      let num = list.indexOf(val);
      this.getGradeClass(num);
      this.topSearch();
    },
    
    'gradeClass':function(val){
      if(!val) {
        this.topSearch();
        return
      }
      let num = this.currListClass.indexOf(this.currClass);
      let num1 = this.gradeClassList.indexOf(val);
      this.getSubjectClass(num,num1,true);
      this.topSearch();
    },
    'subjectClass':function(){
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
      .cum_right_input{
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
      .cum_btn{
        margin-left: 10px;
        width: 100px;
        height:50px;
        font-size: 16px;
      }
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