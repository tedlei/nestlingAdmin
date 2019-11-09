import echarts from "../../../../static/js/echarts.js";
export default {
  data() {
    return {
      leftTopData:[],   
      rightTopData:[],
      leftBottomData:[],   
      rightBottomData:[],


    };
  },
  created() {
    this.leftTopData = [10,30];   
    this.rightTopData = [
      ['一月', 43.3, 85.8],
      ['二月', 83.1, 73.4],
      ['三月', 86.4, 65.2],
      ['四月', 86.4, 65.2],
      ['五月', 86.4, 65.2],
      ['六月', 72.4, 53.9],
      ['七月', 72.4, 53.9],
      ['八月', 72.4, 53.9],
      ['九月', 72.4, 53.9],
      ['十月', 72.4, 53.9],
      ['十一月', 72.4, 53.9],
      ['十二月', 72.4, 53.9]
    ];   
    this.leftBottomData = [10,50,70,60,34,11,10,50,70,60,34,11];
    this.rightBottomData = [1,2,3,4,5,6,7,8,9,1,1,2]
  },
  mounted() {
    this.createCircle();
    this.histogram();
    this.lineChart();
    this.rightPillar();
  },
  methods: {
    getData(){
      
    },








    createCircle(){     //左上饼图
      // 基于准备好的dom，初始化echarts实例
      let circle1 = echarts.init(document.getElementById('circle1'));
      let option = {
        title : {
          text: '用户总数',
          subtext: this.leftTopData[0]+this.leftTopData[1],
          x:'center',
          top:125
        },
        series: [
          {
            type: 'pie',
            center: ['50%', '50%'],
            radius: ['50%', '100%'],
            startAngle:90,
            hoverAnimation:false,
            silent :true,
            label: {
              show: false
            },
            data: [
              {
                value:this.leftTopData[0],
                itemStyle: {
                  color: '#FF7225'
                }
              },
              {
                value:this.leftTopData[1],
                itemStyle: {
                  color: '#2AB0EA'
                }
              }
            ]
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      circle1.setOption(option)
    },

    histogram(){    //右上柱形图
      // 基于准备好的dom，初始化echarts实例
      let hgChart = echarts.init(document.getElementById('histogram'));
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
          left:'0',
          fontWeight:100,
          textStyle:{
            fontSize:14         
          }
        },
        dataset: {  //柱形图分组数据
          source: this.rightTopData
        },
        xAxis: {type: 'category'},
        yAxis: {
          splitLine:{
						show:false
					}
        },
        series: [
            {
              type: 'bar',
              barGap:0,   //柱间隔
              barMaxWidth:'10px',   //柱宽度
              itemStyle: {    //柱样式
                color: '#2AB0EA',
                barBorderRadius:[5, 5, 0,0]   //设置柱形图圆角
              }
            },
            {
              type: 'bar',
              barGap:0,
              barMaxWidth:'10px',
              itemStyle: {
                color: '#FF7225',
                barBorderRadius:[5, 5, 0,0]   //设置柱形图圆角
              }
            }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      hgChart.setOption(option);
    },

    lineChart(){    //左下角折线图
      let lcChart = echarts.init(document.getElementById('lineChart'))
      // 基于准备好的dom，初始化echarts实例
      let option = {
        title: {   //提示文字设置
          text: '单位（人）',
          left:'87%',
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
          right: '2%',
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
            // lineStyle:{    //线条样式
            //   color:'#FF7225'
            // },
            itemStyle: {
              normal: {
                  color: "#FF7225",
                  lineStyle: {
                      color: "#FF7225"
                  }
              }
            },
            data:this.leftBottomData
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      lcChart.setOption(option);
    },

    rightPillar(){    //右下柱形图
      // 基于准备好的dom，初始化echarts实例
      let hgChart = echarts.init(document.getElementById('userRise'));
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
          left:'85%',
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
            barGap:0,   //柱间隔
            barMaxWidth:'20px',   //柱宽度
            itemStyle: {    //柱样式
              color: '#2AB0EA'
            },
            data:this.rightBottomData
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      hgChart.setOption(option);
    },
  },

  watch: {
    $route:function(path,param){
      console.log(path,param)
    }
  },
};