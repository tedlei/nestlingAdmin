import echarts from "../../../../static/js/echarts.js";
export default {
  data() {
    return {
      lineChartData:[],


      isLineChart:false,  //是否显示折线图
    };
  },
  mounted() {
    // this.lineChart();    //调用折线图
    this.histogram();  
    this.createCircle()  
    setTimeout(() => {
      this.lineChartData = [10,50,70,60,34,11];
      if(this.lineChartData.length<=1){
        this.isLineChart = false;
        return
      }
      this.isLineChart = true;
      setTimeout(() => {
        this.lineChart(echarts.init(document.getElementById('lineChart')));
      }, 1);
    }, 300);
  },
  methods: {
    lineChart(lcChart){    //折线图
      // 基于准备好的dom，初始化echarts实例
      let option = {
        title: {   //提示文字设置
          text: '单位（人）',
          left:'94%',
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
          right: '0%',
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
            symbol: "none",
            smooth: true,
            lineStyle:{    //线条样式
              color:'#2AB0EA'
            },
            areaStyle: {   //填充区域样式
              color:'#2AB0EA'
            },
            // data:[5, 30, 45, 60, 90, 130, 120, 170, 150, 190, 230, 210]
            data:this.lineChartData
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      lcChart.setOption(option);
    },
    histogram(){    //柱形图
      // 基于准备好的dom，初始化echarts实例
      let hgChart = echarts.init(document.getElementById('histogram'));
      let option = {
        title: {   //提示文字设置
          text: '单位（个）',
          top:'1%',
          left:'87.5%',
          fontWeight:100,
          textStyle:{
            fontSize:14         
          }
        },
        grid: {  //整体图形的位置
          top: '15%',
          left: '0%',
          right: '0%',
          bottom: '0%',
          containLabel: true
        },
        xAxis: {  //x轴
          type: 'category',
          data: ['课程发布', '教师发布', '资讯发布']
        },
        yAxis: {  //
            type: 'value',
            show:false,
				    splitLine:{show:false},//隐藏网格线

        },
        series: [   //
          {
            data: [40, 10, 1],
            type: 'bar',
            barMaxWidth:'40px',
            label:{
              // value:[1,2,3],
              show:true,  
              fontSize:'18px',
              position: 'top',
              textStyle: {        //数值样式
                color: 'black',
                fontSize: 16
              }
            },
            itemStyle: {
              normal: {
                  // 随机显示
                  // color:function(d){return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16);},
                  // 定制显示（按顺序）
                  color: function(params) { 
                      var colorList = ['#FF7225','#2AB0EA','#CC0808']; 
                      return colorList[params.dataIndex] 
                  }
              },
            },
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      hgChart.setOption(option);
    },

    createCircle(){
      // 基于准备好的dom，初始化echarts实例
      let circle1 = echarts.init(document.getElementById('circle1'));
      // 使用刚指定的配置项和数据显示图表。
      circle1.setOption(this.circle(100,90,300,100))
    },

    circle(num1,num2,num3,num4){    //圆
       let z = (num1+num2)/9*10
       let z1 = z*0.9*((num1-num2)/num1);
       let z2 = z*0.9*(num2/num1);
       let z3 = z*0.1;

       let k = (num3+num4)/9*10
       let k1 = k*0.9*((num3-num4)/num3);
       let k2 = k*0.9*(num4/num3);
       let k3 = k*0.1;

       return {
        series: [
          {
            type: 'pie',
            center: ['50%', '50%'],
            radius: ['85%', '100%'],
            hoverAnimation:false,
            silent :true,
            startAngle:70,
            label: {
              show: false
            },
            data: [
              {
                value: z2,
                itemStyle: {
                  color: '#FF7225'
                }
              },
              {
                value:z1,
                itemStyle: {
                  color: '#F2F2F2'
                }
              },
              {
                value: z3,
                itemStyle: {
                  color: 'none'
                }
              },
            ]
          },
          {
            type: 'pie',
            center: ['50%', '50%'],
            radius: ['60%', '75%'],
            startAngle:70,
            hoverAnimation:false,
            silent :true,
            label: {
              show: false
            },
            data: [
              {
                value: k2,
                itemStyle: {
                  color: '#2AB0EA'
                }
              },
              {
                value:k1,
                itemStyle: {
                  color: '#F2F2F2'
                }
              },
              {
                value: k3,
                itemStyle: {
                  color: 'none'
                }
              },
            ]
          }
        ]
       };
    }
  },
  computed: {
    //折线图数据是否少于俩个
    zxtIsData(){
      if(this.lineChartData.length<=1) return false;
      return true;
    },
  },
  watch: {
    $route:function(path,param){
      console.log(path,param)
    }
  },
};