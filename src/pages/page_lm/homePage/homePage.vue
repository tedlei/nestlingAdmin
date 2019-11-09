<template>
  <div class="hp-app" ref="hp_app">
    <div class="hp_d1 fx">
      <div class="hp_d1_left">
        <div class="hp_d1_top fx">
          <span>网站设置</span>
        </div>
        <div class="hp_d1_zxt">
          <div class="hp_circle" id="circle1"></div>
          <span class="hp_left_span">单位（人）</span>
          <ul class="hp_d1_ul">
            <li class="hp_d1_li fx">
              <div></div>
              <span>学校用户 &nbsp;&nbsp; 50000</span>
            </li>
            <li class="hp_d1_li fx">
              <div class="hp_bg_color"></div>
              <span>普通用户 &nbsp;&nbsp; 50000</span>
            </li>
          </ul>
        </div>
      </div>
      <!-- 分割块 -->
      <div style="width: 20px;"></div>
      <div class="hp_d1_right">
        <div class="hp_d1_top fx">
          <span>预约数</span>
        </div>
        <div class="hp_d1_zxt">
          <ul class="right_style">
            <li class="hp_d1_li fx">
              <div></div>
              <span>教师预约</span>
            </li>
            <li class="hp_d1_li fx">
              <div class="hp_bg_color"></div>
              <span>课程预约</span>
            </li>
          </ul>
          <div class="hp_d1_zxt" id="histogram" ></div>
        </div>
      </div>
    </div>

    <div class="hp_d1 marTop fx">
      <div class="hp_d1_left">
        <div class="hp_d1_top fx">
          <span>用户活跃度</span>
        </div>
        <div class="hp_d1_zxt fx">
          <div class="hp_lineChart" id="lineChart"></div>
        </div>
      </div>
      <!-- 分割块 -->
      <div style="width: 20px;"></div>
      <div class="hp_d1_right">
        <div class="hp_d1_top fx">
          <span>用户增长</span>
        </div>
        <div class="hp_d1_zxt" id="userRise" ></div>
      </div>
    </div>
  </div>
</template>

<script>
import homePage from './homePage.js'
export default {
 ...homePage
};
</script>

<style lang='less' scoped>
.hp-app {
  overflow-y: auto;
  position: relative;
  flex: 1;
  background-color: #f2f2f2;
  .hp_d1 {
    height: 400px;
    justify-content: space-between;
    align-items: center;
    .hp_d1_left,
    .hp_d1_right {
      flex: 1;
      padding: 20px;
      height: 400px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 20px 0px rgba(18, 24, 30, 0.1);
      opacity: 0.9;
      border-radius: 5px;
      .hp_d1_top {
        padding-bottom: 20px;
        border-bottom: 1px solid rgba(230, 230, 230, 1);
        justify-content: space-between;
        align-items: center;
        span {
          font-size: 18px;
          color: rgba(51, 51, 51, 1);
        }
      }
      .hp_d1_zxt{
        margin-top: 1%;
        width: 100%;
        height: 300px;
        position: relative;
        .hp_circle{
          margin-left: 40px;
          width: 300px;
          height: 300px;
          border-radius: 150px;
          overflow: hidden;
        }
        .hp_lineChart{
          width: 100%;
          height: 100%;
        }
        .hp_left_span{
          position:absolute;
          font-size: 14px;
          color:rgba(51,51,51,1);
          top: 0;
          right: 0;
        }
        .hp_d1_ul{
          position: absolute;
          bottom: 0;
          right:5%;
          li+li{
            margin-top: 5px;
          }
          .hp_d1_li{
            justify-content: center;
            align-items: center;
            div{
              width:15px;
              height:15px;
              background:rgba(255,114,37,1);
              border-radius:50%;
            }
            span{
              margin-left: 10px;
              font-size: 14px;
              color:rgba(153,153,153,1);
            }
            .hp_bg_color{
              background-color: #2AB0EA;
            }
          }
        }
        .right_style{
          width: 90px;
          position: absolute;
          right: 0;
          .hp_d1_li{
            justify-content: center;
            align-items: center;
            div{
              width:13px;
              height:13px;
              background:rgba(255,114,37,1);
              border-radius:50%;
            }
            span{
              margin-left: 10px;
              font-size: 16px;
              color:rgba(153,153,153,1);
            }
            .hp_bg_color{
              background-color: #2AB0EA;
            }
          }
        }
      }
    }
  }
  .marTop{
    margin-top: 20px;
  }
  // .hp_d2{
  //   margin-top: 20px;
  //   padding: 20px;
  //   height: 510px;
  //   background: #FFF;
  //   border-radius: 5px;
  //   .hp_d2_top {
  //     padding-bottom: 20px;
  //     border-bottom: 1px solid rgba(230, 230, 230, 1);
  //     justify-content: space-between;
  //     align-items: center;
  //     span {
  //       font-size: 18px;
  //       color: rgba(51, 51, 51, 1);
  //     }
  //   }
  //   .hp_d2_zxt{
  //     margin-top: 10px;
  //     height: calc(100% - 65px);
  //     .hp_d2_p2{
  //       margin-top: 100px;
  //       text-align: center;
  //       font-size: 18px;
  //       color:rgba(51,51,51,1);
  //     }
  //   }
  //   .hp_d2_zxt>div{
  //     width: 100% !important;
  //     height: 100% !important;
  //   }
  // }
}
</style>