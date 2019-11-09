<template>
  <div class="acli-app fx">
    <div class="cb_table">
      <table class="layui-table">
        <thead>
          <tr>
            <th>手机号码</th>
            <th>昵称</th>
            <th>状态</th>
            <th>内容详情</th>
            <th>反馈时间</th>
          </tr> 
        </thead>
        <tbody>
          <tr v-for="(item,i) of schoolList" :key="i">
            <td>{{item.phone}}</td>
            <td>{{item.name}}</td>
            <td>{{item.shneghe===1?'已审核':''}}</td>
            <td class="cb_td_ck" @click="topLookOver(item.id)">查看</td>
            <td>{{item.date}}</td>
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
        :total="1000">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
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
        {id:100001,phone:'15178888998',name:'隔壁老王他妈',shneghe:1,date:'2019-9-2 10:14:14'},
        {id:100001,phone:'15178888998',name:'隔壁老王他妈',shneghe:1,date:'2019-9-2 10:14:14'},
        {id:100001,phone:'15178888998',name:'隔壁老王他妈',shneghe:1,date:'2019-9-2 10:14:14'},
        {id:100001,phone:'15178888998',name:'隔壁老王他妈',shneghe:1,date:'2019-9-2 10:14:14'},
        {id:100001,phone:'15178888998',name:'隔壁老王他妈',shneghe:1,date:'2019-9-2 10:14:14'},
        {id:100001,phone:'15178888998',name:'隔壁老王他妈',shneghe:1,date:'2019-9-2 10:14:14'},
        {id:100001,phone:'15178888998',name:'隔壁老王他妈',shneghe:1,date:'2019-9-2 10:14:14'},
        {id:100001,phone:'15178888998',name:'隔壁老王他妈',shneghe:1,date:'2019-9-2 10:14:14'},
        {id:100001,phone:'15178888998',name:'隔壁老王他妈',shneghe:1,date:'2019-9-2 10:14:14'},
        {id:100001,phone:'15178888998',name:'隔壁老王他妈',shneghe:1,date:'2019-9-2 10:14:14'},
        {id:100001,phone:'15178888998',name:'隔壁老王他妈',shneghe:1,date:'2019-9-2 10:14:14'},
        {id:100001,phone:'15178888998',name:'隔壁老王他妈',shneghe:1,date:'2019-9-2 10:14:14'},
        {id:100001,phone:'15178888998',name:'隔壁老王他妈',shneghe:1,date:'2019-9-2 10:14:14'},
        {id:100001,phone:'15178888998',name:'隔壁老王他妈',shneghe:1,date:'2019-9-2 10:14:14'},
      ]
    };
  },

  methods: {
    //查看
    topLookOver(id){
      this.push({path:'coupleBack/coupleBackDetail',query:{num:id,id:this.$route.query.id}})
    },
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