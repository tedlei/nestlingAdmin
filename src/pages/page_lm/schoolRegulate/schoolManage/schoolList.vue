<template>
  <div class="acli-app fx">
    <ul class="sm_ul">
      <li class="sm_li fx">
        <div class="sm_left_span">
          <span>地区选择</span>
        </div>
        <div class="sm_right_select">
          <el-select v-model="province" placeholder="请选择">
            <el-option key="请选择" label="请选择" value=""></el-option>
            <el-option
              v-for="item in provinceList"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
          <el-select v-model="city" v-if="cityList.length>0" placeholder="请选择">
            <el-option key="请选择" label="请选择" value=""></el-option>
            <el-option
              v-for="item in cityList"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </div>
      </li>
      <li class="sm_li fx">
        <div class="sm_left_span">
          <span>地区选择</span>
        </div>
        <div class="sm_right_input">
          <el-input v-model="searchTeacher" placeholder="请输入内容"></el-input>
        </div>
        <el-button class="sm_btn" type="primary" @click="topSearch">搜索</el-button>
      </li>
    </ul>
    <div class="sm_table">
      <table class="layui-table">
        <thead>
          <tr>
            <th>学校名称</th>
            <!-- <th>学校权限</th> -->
            <th>审核状态</th>
            <th>内容详情</th>
            <template v-if="!isAptitudeAudit">
              <th v-if="btnNum!==3">{{btnNum===1?'违规操作':btnNum===2?'取消禁用操作':''}}</th>
              <th v-if="btnNum!==2">{{btnNum===1?'下架操作':btnNum===3?'删除恢复操作':''}}</th>
            </template>
            <th v-else>提交时间</th>
          </tr> 
        </thead>
        <tbody>
          <tr v-for="(item,i) of schoolList" :key="i">
            <td>{{item.organizationName}}</td>
            <!-- <th>{{jurisdiction(item)}}</th> -->
            <td>{{item.schoolStatus*1===3?'审核通过':'未审核'}}</td>
            <td class="sm_td_ck" @click="topLookOver(item.id)">查看</td>
            <template v-if="!isAptitudeAudit">
              <td v-if="btnNum!==3" class="sm_td_jyAndsc" @click="topForbidden(item.id,btnNum)">{{btnNum===1?'禁用':btnNum===2?'取消禁用':''}}</td>
              <td v-if="btnNum!==2" class="sm_td_jyAndsc" @click='topDelete(item.id)'>{{btnNum===1?'删除':btnNum===3?'删除恢复':''}}</td>
            </template>
            <td v-else>{{item.createTime}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="sm_fy">
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
    <div class="sm_tc_div fx" v-show="schoolId" @click="topCloseTc">
      <div class="sm_tc_div1">
        <p class="sm_tc_p"><i class="el-icon-close" @click.stop="topCloseTc"></i></p>
        <div class="sm_tc_input fx">
          <p>手机号码：</p>
          <el-input v-model="phone" placeholder="请输入内容"></el-input>
        </div>
        <div class="sm_tc_input fx">
          <p>验证码：</p>
          <el-input class="sm_tc_yzm" v-model="authCode" placeholder="请输入内容"></el-input>
          <div class="sm_tc_sxyzm" :class="residueItem>0?'cursor':''" @click="topGetYzm">
           {{!residueItem>0?'获取验证码':residueItem+'秒后再次获取'}}
          </div>
        </div>
        <div class="sm_tc_input fx">
          <p></p>
          <el-button type="primary" @click="topCommit">确认</el-button>
        </div>
      </div>
    </div>

    <div class="iam_tc fx" v-show="isShowTc" @click="closeTc">
        <div class="iam_tc_d">
          <p class="iam_tc_p fx">
            <span>禁用或删除理由</span>
            <i class="el-icon-close" @click.stop="closeTc"></i>
          </p>
          <div class="iam_tc_input">
            <el-input
              type="textarea"
              :rows="8"
              placeholder="请输入内容"
              v-model="textarea">
            </el-input>
          </div>
          <div class="iam_tc_btn">
            <el-button type="primary" @click="topNotarize()">确认</el-button>
          </div>
        </div>
      </div>
  </div>
</template>

<script> 
import chinaCityList from '../../../../../static/js/chinaCityList.js'
import {MessageBox} from 'element-ui'
export default {
  props:['btnNum','isAptitudeAudit'],
  data () {
    return {
      provinceList: [],   //省列表
      cityList: [],  //市列表
      province:'',    //省
      city:'',    //市
      searchTeacher:'',    //搜索学校

      schoolList:[],   //学校列表

      allDataNum:0,   //获取数据总条数
      atPresentNum:1,    //当前页数
      pageData:20,    //每页的数据条数

      phone:'',  //电话号码
      authCode:'',   //验证码
      residueItem:0,   //剩余时间
      schoolId:'',   //学校id

      textarea:'',//禁用或删除理由
      isShowTc:false,
      jySchoolId:'',
      status:'',
    };
  },

  created(){
    this.topSearch();
    this.getprovinceList();
  },

  methods: {
    //点击删除时
    topDelete(id){
      this.schoolId = id;
    },

    //关闭弹窗
    topCloseTc(){
      if(event.target===event.currentTarget){
        this.schoolId = '';
      }
    },


    closeTc(){
      if(event.currentTarget!==event.target)return
      this.isShowTc = false;
      this.schoolId = '';
    },

    //点击验证码时
    topGetYzm(){
      console.log(this.phone)
      if(!/^1[23456789]\d{9}$/.test(this.phone)){
        this.$message({message:'电话号码格式错误或为空！',type:'warning'});
        return
      }
      if(this.residueItem>0)return;
      this.getYzm();
      let num = 60;
      let seti = setInterval(() => {
        this.residueItem = num;
        if(num<=0){
          clearInterval(seti);
        }
        num--;
      }, 1000);
    },

    //获取验证码
    getYzm(){
      let url = '/message/phone.do';
      let data = {phone:this.phone}
      this.fetch({url,data,method:'get'},2).then(res=>{
        this.$message({message:res.data.message,type:'success'});
      }).catch(err=>{
        this.$message({message:'获取验证码失败，请点击从新获取！',type:'warning'});
      })
    },

    //删除
    topCommit(){
      if(!/^\d{6}$/.test(this.authCode)){
        this.$message({message:'输入验证码格式不正确或为空！',type:'warning'});
        return
      }
      this.topForbidden(this.schoolId,3)
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

    //获取学校数据
    topSearch(){
      this.schoolList = [];
      let url = '/school/findByPage.do'
      let data = {
        keywords:this.searchTeacher,
        oneAddress:this.province,
        twoAddress:this.city,
        pageNo:''+this.atPresentNum,
        pageSize:''+this.pageData,
        schoolStatus:'3'
      }
      if(this.btnNum === 2){
        data.schoolStatus = '4';
      }
      if(this.btnNum === 3){
        data.schoolStatus = '6';
      }
      if(this.isAptitudeAudit){
        data.schoolStatus = '1'
      }
      this.fetch({url,data,method:'post'},6).then(res=>{
        this.allDataNum = res.data.total;
        this.schoolList = res.data.rows;
      })
    },

    //查看
    topLookOver(id){
      this.push({path:'schoolManage/schoolAuditDetail',query:{num:id,id:this.$route.query.id}})
    },

    //禁用或删除
    topForbidden(schoolId,btnNum){
      let data = {schoolId,status:'4'};
      let str1 = '是否禁用该用户？该操作会让学校用户信息无法在客户端显示，请谨慎操作！'
      if(btnNum===2){
        str1 = '是否取消对该用户的禁用操作？'
        data.status = '5';
      }
      if(btnNum===3){
        str1 = '是否删除该用户?该操作会让学校用户无法登陆，请谨慎操作！'
        data.status = '6';
      }
      MessageBox.confirm(str1, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if(btnNum===1||btnNum===3){
          this.jySchoolId = schoolId;
          this.status = data.status ;
          this.isShowTc = true;
          return
        }
        this.updateData(data);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '用户取消操作'
        });          
      });
    },

    //输入理由后点击确认
    topNotarize(){
      let message = this.textarea
      let status = this.status
      if(!message.replace(/\s*/g,"")){
        this.$message({message:'请输入原因！',type:'warning'});
        return
      }
      let data = {schoolId:this.jySchoolId,status,message};
      if(status==='6'){
          data.phone = this.phone;
          data.code = this.authCode;
      }

      //  data.schoolId = this.schoolId;
      //   data.status = '6';
      this.updateData(data);
    },

    //修改学校状态
    updateData(data){
      let url = '/school/updateStatus.do';
      this.fetch({url,data,method:'post'},6).then(res=>{
        let {message,success} = res.data
        if(success){
          this.topSearch();
          this.schoolId = '';
        }
        this.isShowTc = false;
        this.jySchoolId = '';
        this.textarea = '';
        this.$message({message,type:success?'success':'warning'});
      })
    },


    //获取分页数
    topClick(num){
      this.atPresentNum = num;
    },

    //显示权限
    // jurisdiction(item){
    //   console.log(item);
    //   return "VIP"
    // }
  },
  watch:{
    'isAptitudeAudit':function(val){
      this.topSearch()
    },
    'btnNum':function(val){
      this.searchTeacher = '';
      this.city = '';
      this.cityList = [];
      this.province = '';
    },
    'province':function(val){
      if(!val){
        this.city = '';
        this.cityList = [];
        return
      }
      this.getCityList(val);
      this.topSearch();
    },
    "city":function(){
      this.topSearch();
    },
    "btnNum":function(){
      this.topSearch();
    },
    'phone':(val)=>{
      console.log(val);
    }
  }

}

</script>

<style lang='less'>
.acli-app{
  width: 100%;
  flex-direction: column;
  .sm_ul{
    .sm_li{
      margin-top: 10px;
      align-items: center;
      .sm_left_span{
        width: 80px;
        font-size: 16px;
        color:rgba(102,102,102,1);
      }
      .sm_right_select{
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
      .sm_right_input{
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
    }
  }
  .sm_table{
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
        .sm_td_ck{
          color:rgba(42,176,234,1);
          cursor: pointer;
        }
        .sm_td_jyAndsc{
          color:rgba(255,0,0,1);
          cursor: pointer;
        }
      }
    }
  }
  .sm_fy{
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
  .sm_tc_div{
    position: absolute;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    top:0;
    left: 0;
    background: rgba(0,0,0,0.1);
    .sm_tc_div1{
      width:500px;
      height: 300px;
      border-radius: 5px;
      background: white;
      .sm_tc_p{
        padding: 10px 10px;
        text-align: right;
        i{
          font-size: 26px;
          cursor: pointer;
        }
      }
      .sm_tc_input{
        margin-top: 20px;
        align-items: center;
        height: 50px;
        font-size: 16px;
        p{
          width: 130px;
          text-align: right;
        }
        .el-input{
          width: 300px;
        }
        .sm_tc_yzm{
          width: 170px;
        }
        .sm_tc_sxyzm{
          margin-left: 10px;
          width: 120px;
          height: 40px;
          border-radius: 5px;
          background: #2ab0ea;
          text-align: center;
          line-height: 40px;
          font-size: 14px;
          color: white;
          cursor: pointer;
          span{
            display:inline-block;
          }
          span+span{
            margin-left: 5px;
          }
        }
        .cursor{
          cursor: no-drop;
          background: #ccc;
        }
      }
    }
  }
  .iam_tc{
      position:absolute;
      width: 100%;
      height: 100%;
      background:rgba(0,0,0,0.1);
      justify-content: center;
      align-items: center;
      top: 0;
      left: 0;
      z-index: 10001;
      .iam_tc_d{
        padding:10px;
        width:400px;
        height:260px;
        background: white;
        box-shadow:0px 0px 21px 0px rgba(0, 0, 0, 0.11);
        border-radius:5px;
        .iam_tc_p{
          padding-bottom: 10px;
          justify-content: space-between;
          span{
            font-size: 16px;
            color:rgba(51,51,51,1);
          }
          i{
            font-size: 24px;
            cursor: pointer;
          }
          i:active{
            color: rgba(191,191,191,1);
          }
        }
        .iam_tc_input{
          width: 100%;
          height: 160px;
          border: 1px solid rgba(151,151,151,1);
          border-radius: 5px;
          overflow: hidden;
          .el-textarea__inner{
            border:0;
            font-size: 16px;
          }
        }
        .iam_tc_btn{
          padding-top: 5px;
          text-align: center;
        }
      }
    }
}
</style>