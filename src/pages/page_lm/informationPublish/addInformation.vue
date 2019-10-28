<template>
  <div class="addInfo-app">
    <ul class="addt_u1">
      <li class="addt_l1 fx">
        <div class="addt_d_span">
          <span>资讯分类</span>
        </div>
        <div class="addt_d_select">
          <el-select v-model="getYear" placeholder="请选择年">
            <el-option
              v-for="item in getYearList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </li>
      <li class="addt_l1 fx">
        <div class="addt_d_span span_padding">
          <span>动态资讯</span>
        </div>
        <div class="addt_d_select">
          <el-switch
            v-model="value1">
          </el-switch>
        </div>
      </li>
      <li class="addt_l1 fx">
        <div class="addt_d_span">
          <span>标题</span>
        </div>
        <div class="addt_d_input">
          <input type="text" v-model="tName" placeholder="请输入教师姓名">
        </div>
      </li><li class="addt_l1 fx">
        <div class="addt_d_span">
          <span>作者</span>
        </div>
        <div class="addt_d_input">
          <input type="text" v-model="tName" placeholder="请输入教师姓名">
        </div>
      </li>
      <li class="addt_l1 fx">
        <div class="addt_d_span">
          <span>教师经历</span>
        </div>
        <div class="addt_d_button">
          <el-button type="primary" @click="topAddjl">添加</el-button>
        </div>
      </li>

      <li class="addt_l1 fx">
        <div class="addt_d_span">
          <span></span>
        </div>
        <div class="addt_d_div" v-html="text"></div>
      </li>





    </ul>
    <div class="addt_button">
      <el-button type="primary">立即提交</el-button>
    </div>
  </div>
</template>

<script>
import Vue from "vue"
import {Switch} from 'element-ui'
Vue.use(Switch)
export default {
  data () {
    return {
      getYear:'',
      getYearList:[],
      tName:'',
      text:'',

      value1:true,
    };
  },

  created() {
    this.text = this.getItem('infoText');
  },

  methods: {
    topAddjl(){
      this.push('informationUndergo?id='+this.$route.query.id)
    },
  }

}

</script>

<style lang='less' scoped>
.addInfo-app{
  width: 100%;
  .addt_u1{
    width: 100%;
    .addt_l1{
      margin-top: 20px;
      width: 100%;
      .addt_d_span{
        padding-top: 12px;
        width: 100px;
        text-align: right;
        font-size: 18px;
        color:rgba(102,102,102,1);
      }
      .span_padding{
        padding-top: 0;
      }
      .addt_d_select{
        margin-left: 20px;
        .el-select{
          width:150px;
          height:50px;
          border-radius:5px;
          .el-input>.el-input__inner{
            height: 50px;
            font-size: 16px;
            color:rgba(51,51,51,1);
          }
        }
        .el-select+.el-select{
          margin-left: 20px;
        }
      }
      .addt_d_input{
        margin-left: 20px;
        width:500px;
        height:50px;
        border:1px solid rgba(230,230,230,1);
        border-radius:5px;
        overflow: hidden;
        input{
          padding-left: 10px;
          width: 100%;
          height: 100%;
          font-size: 16px;
          color:rgba(51,51,51,1);
        }
      }
      .addt_d_button{
        margin-left: 20px;
        .el-button{
          width:120px;
          height:40px;
          background:rgba(42,176,234,1);
          border-radius:5px;
        }
      }
      .addt_d_div{
        flex: 1;
        margin-left: 20px;
        min-height: 30px;
      }
    }
  }
  .addt_button{
    margin-top: 30px;
    text-align: center;
    .el-button{
      width:150px;
      height:40px;
      background:rgba(42,176,234,1);
      border-radius:5px;
    }
  }
}
</style>