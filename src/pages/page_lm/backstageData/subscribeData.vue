<template>
  <div class="sdDm-app fx">
    <div class="sd_d1">
        <span class="sd_d1_span">预约数据</span>
    </div>
    <div class="sd_d2">
      <ul class="sd_d2_ul">
        <li class="sd_d2_li fx">
          <div class="sd_li_d1 fx">
            <div></div>
            <span>预约课程</span>
          </div>
          <div class="sd_li_d2">
            <p>日预约数</p>
            <div class="sd_li_img" id="sd_pc1"></div>
          </div>
          <div class="sd_li_d2">
            <p>月预约数</p>
            <div class="sd_li_img" id="sd_pc2"></div>
          </div>
          <div class="sd_li_d2">
            <p>季预约数</p>
            <div class="sd_li_img" id="sd_pc3"></div>
          </div>
          <div class="sd_li_d2">
            <p>年预约数</p>
            <div class="sd_li_img" id="sd_pc4"></div>
          </div>
        </li>
      </ul>
      <ul class="sd_d2_ul">
        <li class="sd_d2_li fx">
          <div class="sd_li_d1 fx">
            <div class="sd_li_bg_color"></div>
            <span>预约教师</span>
          </div>
          <div class="sd_li_d2">
            <div class="sd_li_img" id="sd_yd1"></div>
          </div>
          <div class="sd_li_d2">
            <div class="sd_li_img" id="sd_yd2"></div>
          </div>
          <div class="sd_li_d2">
            <div class="sd_li_img" id="sd_yd3"></div>
          </div>
          <div class="sd_li_d2">
            <div class="sd_li_img" id="sd_yd4"></div>
          </div>
        </li>
      </ul>

      <p class="sd_zxt_title">用户预约数据图</p>
      <div class="sd_zxt" id="sd_zxt"></div>

    </div>
  </div>
</template>

<script>
import echarts from "../../../../static/js/echarts.js";
export default {
  data () {
    return {
      currYyData:[],   //课程预约数量
      teacherYyData:[],   //课程预约数量
      userYY:{},   //用户预约数据
    };
  },

  created(){
    this.currYyData = [100,300,1000,3000];
    this.teacherYyData = [200,600,2000,6000];
    this.userYY={
      currYy:[10,50,70,60,34,11,10,50,70,60,34,11],
      teacherYy:[10,50,70,60,34,11,10,50,70,60,34,11]
    }
  },

  mounted(){
    for(let num in this.currYyData){
      let xb = num*1 + 1;
      let circle1 = echarts.init(document.getElementById('sd_pc'+xb));
      let arr = [this.currYyData[num],1000*xb*xb*xb-this.currYyData[num]];
      console.log(arr)
      this.createCircle(circle1,arr,1);
    }
    for(let num in this.teacherYyData){
      let xb = num*1 + 1;
      let circle1 = echarts.init(document.getElementById('sd_yd'+xb));
      let arr = [this.teacherYyData[num],1000*xb*xb-this.teacherYyData[num]];
      this.createCircle(circle1,arr,1);
    }
    this.lineChart(echarts.init(document.getElementById('sd_zxt')));
  },
  methods: {
    createCircle(circle1,rotundityData,num){     //左上饼图
      let option = {
        title : {
          text:rotundityData[0],
          textStyle:{
            fontSize:14         
          },
          x:'center',
          top:30
        },
        series: [
          {
            type: 'pie',
            center: ['50%', '50%'],
            radius: ['85%', '100%'],
            startAngle:90,
            hoverAnimation:false,
            silent :true,
            label: {
              show: false
            },
            data: [
              {
                value:rotundityData[0],
                itemStyle: {
                  color: num===1?'#2AB0EA':'#FF7225'
                }
              },
              {
                value:rotundityData[1],
                itemStyle: {
                  color: '#eee'
                }
              }
            ]
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      circle1.setOption(option)
    },



    lineChart(lcChart){    //折线图
      // 基于准备好的dom，初始化echarts实例
      let option = {
        title: {   //提示文字设置
          text: '单位（人）',
          left:'92%',
          fontWeight:100,
          textStyle:{
            fontSize:14         
          }
        },
        tooltip : {   //鼠标在图形中坐标
          trigger: 'axis',
          axisPointer: {  
            type: 'cross',
            label: {backgroundColor: 'rgba(42,176,234,0.4)'}
          }
        },
        grid: {  //整体图形的位置
          top: '10%',
          left: '1%',
          right: '3%',
          bottom: '0%',
          containLabel: true
        },
        xAxis : [   //折线图底部
          {
            type : 'category',
            boundaryGap : false,
            data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
          }
        ],
        yAxis : [   //y轴
          {
            type : 'value',
            splitLine:{show:false},//隐藏网格线
          }
        ],
        series : [    //折线样式
          {
            name:'浏览量',
            type:'line',
            stack: '总量',
            symbol: "circle",
            symbolSize:10,
            smooth: false,
            itemStyle: {
              normal: {
                  color: "#FF7225",
                  lineStyle: {
                      color: "#FF7225"
                  }
              }
            },
            data:  this.userYY.currYy
          },
          {
            name:'浏览量',
            type:'line',
            stack: '总量',
            symbol: "circle",
            symbolSize:10,
            smooth: false,
            itemStyle: {
              normal: {
                  color: "#2AB0EA",
                  lineStyle: {
                      color: "#2AB0EA"
                  }
              }
            },
            data:  this.userYY.teacherYy
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      lcChart.setOption(option);
    }
  }
}

</script>

<style lang='less'>
.sdDm-app{
  padding:20px;
  padding-top: 20px;
  position: relative;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: white;
  .sd_d1{
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(230,230,230,1);
    position: relative;
    .sd_d1_span{
      font-size: 18px;
      color:rgba(51,51,51,1);
    }
  }
  .sd_d2{
    flex: 1;
    overflow-y: auto;
    .sd_d2_ul{
      width: 100%;
      padding-top:30px;
      .sd_d2_li{
        width: 100%;
        padding:0 60px 0 30px;
        box-sizing: border-box;
        justify-content: space-between;
        align-items: center;
        .sd_li_d1{
          width: 200px;
          padding-left: 30px;
          align-items: center;
          div{
            width:24px;
            height:24px;
            background: #2AB0EA;
            border-radius:50%;
          }
          .sd_li_bg_color{
            background:rgba(255,114,37,1);
          }
          span{
            margin-left: 10px;
            font-size: 30px;
            color:rgba(51,51,51,1);
          }
        }
        .sd_li_d2{
          p{
            text-align: center;
            font-size: 16px;
            color:rgba(51,51,51,1);
          }
          .sd_li_img{
            margin-top: 20px;
            width:82px;
            height:82px;
          }
        }
      }
    }
    .sd_zxt_title{
      margin-top: 30px;
      font-size: 16px;
      color:rgba(51,51,51,1);
    }
    .sd_zxt{
      width: 100%;
      height: 350px;
    }
  }
}
</style>