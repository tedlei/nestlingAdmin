<template>
  <div class="udDm-app fx">
    <div class="ud_d1">
        <span class="ud_d1_span">用户数据</span>
    </div>
    <div class="ud_d2">
      <ul class="ud_d2_ul">
        <li class="ud_d2_li fx">
          <div class="ud_li_d1 fx">
            <div></div>
            <span>pc端</span>
          </div>
          <div class="ud_li_d2">
            <p>日活跃度</p>
            <div class="ud_li_img">
              <img src="../../../../static/images/组4.png" alt="">
              <p class="ud_li_div_p">{{pcData[0]}}人</p>
            </div>
          </div>
          <div class="ud_li_d2">
            <p>月活跃度</p>
            <div class="ud_li_img">
              <img src="../../../../static/images/组3.png" alt="">
              <p class="ud_li_div_p">{{pcData[1]}}人</p>
            </div>
          </div>
          <div class="ud_li_d2">
            <p>季活跃度</p>
            <div class="ud_li_img">
              <img src="../../../../static/images/组2.png" alt="">
              <p class="ud_li_div_p">{{pcData[2]}}人</p>
            </div>
          </div>
        </li>
      </ul>
      <ul class="ud_d2_ul">
        <li class="ud_d2_li fx">
          <div class="ud_li_d1 fx">
            <div class="ud_li_bg_color"></div>
            <span>移动端</span>
          </div>
          <div class="ud_li_d2">
            <div class="ud_li_img">
              <img src="../../../../static/images/组4.png" alt="">
              <p class="ud_li_div_p">{{ydData[0]}}人</p>
            </div>
          </div>
          <div class="ud_li_d2">
            <div class="ud_li_img">
              <img src="../../../../static/images/组3.png" alt="">
              <p class="ud_li_div_p">{{ydData[1]}}人</p>
            </div>
          </div>
          <div class="ud_li_d2">
            <div class="ud_li_img">
              <img src="../../../../static/images/组2.png" alt="">
              <p class="ud_li_div_p">{{ydData[2]}}人</p>
            </div>
          </div>
        </li>
      </ul>

      <p class="ud_zxt_title">用户活跃度数据图</p>
      <div class="ud_zxt" id="ud_zxt"></div>

      <p class="ud_zxt_title" style="margin-top:90px;">用户增长数</p>
      <div class="ud_d2">
        <ul class="ud_d2_ul">
          <li class="ud_d2_li fx" style="margin-top:10px;padding:0 90px;">
            <div class="ud_li_d2">
              <p>日增长数</p>
              <div class="ud_li_img">
                <img src="../../../../static/images/组4.png" alt="">
                <p class="ud_li_div_p">{{userZZData[0]}}人</p>
              </div>
            </div>
            <div class="ud_li_d2">
              <p>月增长数</p>
              <div class="ud_li_img">
                <img src="../../../../static/images/组3.png" alt="">
                <p class="ud_li_div_p">{{userZZData[1]}}人</p>
              </div>
            </div>
            <div class="ud_li_d2">
              <p>季增长数</p>
              <div class="ud_li_img">
                <img src="../../../../static/images/组2.png" alt="">
                <p class="ud_li_div_p">{{userZZData[2]}}人</p>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <p class="ud_zxt_title">用户增长数数据图</p>
      <div class="ud_zxt" id="ud_zzt"></div>


    </div>
  </div>
</template>

<script>
import echarts from "../../../../static/js/echarts.js";
export default {
  data () {
    return {
      pcData:[100,200,300],  //PC端活跃数据
      ydData:[300,400,500],  //移动端活跃数据
      userZZData:[300,400,500],  //用户增长数

      userHyData:{},   //用户活跃数据

      userZZDatat:[]//用户增长数数据图

    };
  },

  created(){
    this.userHyData = {
      ydd:[10,50,70,60,34,11,10,50,70,60,34,11],
      pcd:[10,50,70,60,34,11,10,50,70,60,34,11]
    },
    this.userZZDatat = [1,2,3,4,5,6,7,8,9,1,1,2]
  },

  mounted(){
    this.lineChart();
    this.histogram();

  },
  methods: {
    lineChart(){    //折线图
      let lcChart = echarts.init(document.getElementById('ud_zxt'))
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
            data: this.userHyData.ydd
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
            data: this.userHyData.pcd
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      lcChart.setOption(option);
    },

    histogram(){    //柱形图
      // 基于准备好的dom，初始化echarts实例
      let hgChart = echarts.init(document.getElementById('ud_zzt'));
      let option = {
        grid: {  //整体图形的位置
          top: '15%',
          left: '0%',
          right: '0%',
          bottom: '0%',
          containLabel: true
        },
        title: {   //提示文字设置
          text: '单位（人）',
          left:'93%',
          fontWeight:100,
          textStyle:{
            fontSize:14         
          }
        },
        xAxis: {
          type: 'category',
          data:['一月','二月','三月','四月','五月','六月','七月','八月','九月', '十月','十一月', '十二月']
        },
        yAxis: {
          splitLine:{
						show:false
					}
        },
        series: [
          {
            type: 'bar',
            barMaxWidth:'20px',   //柱宽度
            itemStyle: {    //柱样式
              color: '#2AB0EA'
            },
            data:this.userZZDatat
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      hgChart.setOption(option);
    },

  },
  watch: {
  },
}

</script>

<style lang='less'>
.udDm-app{
  padding:20px;
  padding-top: 20px;
  position: relative;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: white;
  .ud_d1{
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(230,230,230,1);
    position: relative;
    .ud_d1_span{
      font-size: 18px;
      color:rgba(51,51,51,1);
    }
  }
  .ud_d2{
    flex: 1;
    overflow-y: auto;
    .ud_d2_ul{
      width: 100%;
      padding-top:30px;
      .ud_d2_li{
        width: 100%;
        padding:0 60px 0 30px;
        box-sizing: border-box;
        justify-content: space-between;
        align-items: center;
        .ud_li_d1{
          width: 200px;
          padding-left: 30px;
          align-items: center;
          div{
            width:24px;
            height:24px;
            background:rgba(255,114,37,1);
            border-radius:50%;
          }
          .ud_li_bg_color{
            background: #2AB0EA;
          }
          span{
            margin-left: 10px;
            font-size: 30px;
            color:rgba(51,51,51,1);
          }
        }
        .ud_li_d2{
          p{
            text-align: center;
            font-size: 16px;
            color:rgba(51,51,51,1);
          }
          .ud_li_img{
            margin-top: 20px;
            width: 200px;
            height: 200px;
            position: relative;
            img{
              width: 100%;
              height: 100%;
            }
            .ud_li_div_p{
              width: 200px;
              text-align: center;
              position:absolute;
              top: 50px;
              left: 0;
              z-index: 10001;
            }
          }
        }
      }
    }
    .ud_zxt_title{
      margin-top: 30px;
      font-size: 16px;
      color:rgba(51,51,51,1);
    }
    .ud_zxt{
      width: 100%;
      height: 350px;
    }
  }
}
</style>