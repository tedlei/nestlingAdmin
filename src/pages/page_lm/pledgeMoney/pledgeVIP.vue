<template>
  <div class="pmDm-app fx">
    <div class="pm_d1">
      <template v-for="(item,i) of topTitleList">
        <span :key="i" class="pm_d1_span">
          {{item.title}}
        </span>
      </template>
      <span class="pm_d1_btn" v-show="isShowBtn">
        <el-button class="pm_btn" type="primary" v-if="auditPass===1" @click="topAudit(2)">要到期用户列表</el-button>
        <el-button class="pm_btn" type="primary" v-else @click="topAudit(1)">返回</el-button>
      </span>
    </div>
    <div class="pm_input">
      <el-input v-model="input" placeholder="请输入内容"></el-input>
      <el-button class="pm_btn" type="primary">搜索</el-button>
    </div>
    <div class="pm_table">
      <table class="layui-table">
        <thead>
          <tr>
            <th>学校名称</th>
            <th>VIP金额</th>
            <th>开通时间</th>
            <th>到期时间</th>
            <th v-show="auditPass===2">提醒续费</th>
          </tr> 
        </thead>
        <tbody>
          <tr v-for="(item,i) of schoolList" :key="i">
            <td>{{item.name}}</td>
            <td>{{item.money}}</td>
            <td>{{item.ktTime}}</td>
            <td>{{item.dqTime}}</td>
            <td v-if="auditPass===2" class="pm_td_ck" :class="item.tz?'pm_td_color':''">{{item.tz?'已通知':'通知'}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="pm_fy">
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
import {Button,Select,Option,Input,MessageBox,Pagination} from 'element-ui'
import Vue from 'vue';
Vue.use(Button);
Vue.use(Select);
Vue.use(Option);
Vue.use(Input);
Vue.use(Pagination);
export default {
  data () {
    return {
      topTitleList:[{title:'雏鸟VIP'}],    //顶部抬头显示
      auditPass:1,   //1:查看列表   2:退还列表   3：  已退还列表 
      isShowBtn:true,   //是否显示按钮

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
      schoolList:[]
    };
  },

  created(){
    this.getId(this.$route);
    this.getDataList(this.auditPass);
  },

  methods: {
    //是否显示按钮
    getId(obj){
      let num = obj.query.num;
      console.log(num)
      this.isShowBtn = num?false:true;
    },

    //切换列表
    topAudit(num){
      this.auditPass = num;
      this.getDataList(num);
    },

    //获取数据
    getDataList(num){
      if(num===1){
        this.schoolList=[
          {id:100001,name:'重庆达内教育学校',money:'588',ktTime:'2019-1-1',dqTime:'2019-1-1',tz:false},
          {id:100001,name:'重庆达内教育学校',money:'588',ktTime:'2019-1-1',dqTime:'2019-1-1',tz:false},
          {id:100001,name:'重庆达内教育学校',money:'588',ktTime:'2019-1-1',dqTime:'2019-1-1',tz:false},
          {id:100001,name:'重庆达内教育学校',money:'588',ktTime:'2019-1-1',dqTime:'2019-1-1',tz:false},
          {id:100001,name:'重庆达内教育学校',money:'588',ktTime:'2019-1-1',dqTime:'2019-1-1',tz:false},
          {id:100001,name:'重庆达内教育学校',money:'588',ktTime:'2019-1-1',dqTime:'2019-1-1',tz:false},
          {id:100001,name:'重庆达内教育学校',money:'588',ktTime:'2019-1-1',dqTime:'2019-1-1',tz:false},
          {id:100001,name:'重庆达内教育学校',money:'588',ktTime:'2019-1-1',dqTime:'2019-1-1',tz:false},
          {id:100001,name:'重庆达内教育学校',money:'588',ktTime:'2019-1-1',dqTime:'2019-1-1',tz:false},
          {id:100001,name:'重庆达内教育学校',money:'588',ktTime:'2019-1-1',dqTime:'2019-1-1',tz:false},
          {id:100001,name:'重庆达内教育学校',money:'588',ktTime:'2019-1-1',dqTime:'2019-1-1',tz:false},
          {id:100001,name:'重庆达内教育学校',money:'588',ktTime:'2019-1-1',dqTime:'2019-1-1',tz:false},
          {id:100001,name:'重庆达内教育学校',money:'588',ktTime:'2019-1-1',dqTime:'2019-1-1',tz:false},
          {id:100001,name:'重庆达内教育学校',money:'588',ktTime:'2019-1-1',dqTime:'2019-1-1',tz:false},
          {id:100001,name:'重庆达内教育学校',money:'588',ktTime:'2019-1-1',dqTime:'2019-1-1',tz:false},
          {id:100001,name:'重庆达内教育学校',money:'588',ktTime:'2019-1-1',dqTime:'2019-1-1',tz:false},
          {id:100001,name:'重庆达内教育学校',money:'588',ktTime:'2019-1-1',dqTime:'2019-1-1',tz:false},
          {id:100001,name:'重庆达内教育学校',money:'588',ktTime:'2019-1-1',dqTime:'2019-1-1',tz:false}
        ]
      }else{
        this.schoolList=[
          {id:100001,name:'重庆达内教育学校',money:'588',ktTime:'2019-1-1',dqTime:'2019-1-1',tz:false},
          {id:100001,name:'重庆达内教育学校',money:'588',ktTime:'2019-1-1',dqTime:'2019-1-1',tz:false},
          {id:100001,name:'重庆达内教育学校',money:'588',ktTime:'2019-1-1',dqTime:'2019-1-1',tz:false},
          {id:100001,name:'重庆达内教育学校',money:'588',ktTime:'2019-1-1',dqTime:'2019-1-1',tz:false},
          {id:100001,name:'重庆达内教育学校',money:'588',ktTime:'2019-1-1',dqTime:'2019-1-1',tz:false},
          {id:100001,name:'重庆达内教育学校',money:'588',ktTime:'2019-1-1',dqTime:'2019-1-1',tz:false},
          {id:100001,name:'重庆达内教育学校',money:'588',ktTime:'2019-1-1',dqTime:'2019-1-1',tz:false},
          {id:100001,name:'重庆达内教育学校',money:'588',ktTime:'2019-1-1',dqTime:'2019-1-1',tz:false},
          {id:100001,name:'重庆达内教育学校',money:'588',ktTime:'2019-1-1',dqTime:'2019-1-1',tz:false},
          {id:100001,name:'重庆达内教育学校',money:'588',ktTime:'2019-1-1',dqTime:'2019-1-1',tz:false},
          {id:100001,name:'重庆达内教育学校',money:'588',ktTime:'2019-1-1',dqTime:'2019-1-1',tz:false},
          {id:100001,name:'重庆达内教育学校',money:'588',ktTime:'2019-1-1',dqTime:'2019-1-1',tz:false},
          {id:100001,name:'重庆达内教育学校',money:'588',ktTime:'2019-1-1',dqTime:'2019-1-1',tz:true},
          {id:100001,name:'重庆达内教育学校',money:'588',ktTime:'2019-1-1',dqTime:'2019-1-1',tz:true},
          {id:100001,name:'重庆达内教育学校',money:'588',ktTime:'2019-1-1',dqTime:'2019-1-1',tz:true},
          {id:100001,name:'重庆达内教育学校',money:'588',ktTime:'2019-1-1',dqTime:'2019-1-1',tz:true},
          {id:100001,name:'重庆达内教育学校',money:'588',ktTime:'2019-1-1',dqTime:'2019-1-1',tz:true},
          {id:100001,name:'重庆达内教育学校',money:'588',ktTime:'2019-1-1',dqTime:'2019-1-1',tz:true},
          {id:100001,name:'重庆达内教育学校',money:'588',ktTime:'2019-1-1',dqTime:'2019-1-1',tz:true},
          {id:100001,name:'重庆达内教育学校',money:'588',ktTime:'2019-1-1',dqTime:'2019-1-1',tz:true},
          {id:100001,name:'重庆达内教育学校',money:'588',ktTime:'2019-1-1',dqTime:'2019-1-1',tz:true},
          {id:100001,name:'重庆达内教育学校',money:'588',ktTime:'2019-1-1',dqTime:'2019-1-1',tz:true},
          {id:100001,name:'重庆达内教育学校',money:'588',ktTime:'2019-1-1',dqTime:'2019-1-1',tz:true},
          {id:100001,name:'重庆达内教育学校',money:'588',ktTime:'2019-1-1',dqTime:'2019-1-1',tz:true},
          {id:100001,name:'重庆达内教育学校',money:'588',ktTime:'2019-1-1',dqTime:'2019-1-1',tz:true},
          {id:100001,name:'重庆达内教育学校',money:'588',ktTime:'2019-1-1',dqTime:'2019-1-1',tz:true},
          {id:100001,name:'重庆达内教育学校',money:'588',ktTime:'2019-1-1',dqTime:'2019-1-1',tz:true},
          {id:100001,name:'重庆达内教育学校',money:'588',ktTime:'2019-1-1',dqTime:'2019-1-1',tz:true},
          {id:100001,name:'重庆达内教育学校',money:'588',ktTime:'2019-1-1',dqTime:'2019-1-1',tz:true}
        ]
      }
    },

    //退还保证金
    topSendBack(){}
  },
  watch: {
    $route:function(val){
      this.getId(val);
    }
  },
}

</script>

<style lang='less'>
.pmDm-app{
  padding:20px;
  padding-top: 20px;
  position: relative;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: white;
  .pm_d1{
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(230,230,230,1);
    position: relative;
    .pm_d1_span{
      font-size: 18px;
      color:rgba(51,51,51,1);
    }
    .pm_d1_btn{
      position:absolute;
      top: -7px;
      right: 20px;
    }
  }
  .pm_input{
    margin-top:10px; 
    width: 100%;
    .el-input{
      width: 300px;
    }
  }
  .pm_table{
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
        .pm_td_ck{
          color:rgba(42,176,234,1);
          cursor: pointer;
        }
        .pm_td_color{
          color:rgba(153,153,153,1);
        }
        .pm_td_jyAndsc{
          color:rgba(255,0,0,1);
          cursor: pointer;
        }
      }
    }
  }
  .pm_fy{
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