<template>
  <div class="login-app fx">
    <div class="login_logo">
      <img style="width:100%;height:100%;" src="../../../static/images/clLOGO.png" alt="">
    </div>
    <div class="login_div">
      <div class="login_d_jxw">
        <img style="width:100%;height:100%;" src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2721344446,1039543013&fm=26&gp=0.jpg" alt="">
      </div>
      <div class="login_d_input">
        <p class="login_d_p">雏鸟教育后台管理</p>
        <div class="login_in fx">
          <p>管理员</p>
          <input type="text" placeholder="请输入帐户名">
        </div>
        <div class="login_in fx top30">
          <p>密码</p>
          <input type="text" placeholder="请输入帐密码">
        </div>
        <button class="login_btn" @click="topLogin">登陆</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    };
  },

  methods: {
    topLogin(){
      this.push('/index')
    }
  }

}

</script>

<style lang='less' scoped>
.login-app{
  flex-direction: column;
  position:fixed;
  min-width: 1200px;
  min-height: 800px;
  width: 100%;
  height: 100%;
  background-image: url('../../../static/images/login.png');
  background-size: 100% 100%;
  justify-content: center;
  align-items: center;
  .login_logo{
    width:200px;
    height:80px;
    // background:white;
    position: absolute;
    top: 5%;
    left: 15.3%;
  }
  .login_div{
    margin-top: -10%;
    width: 600px;
    height: auto;
    .login_d_jxw{
      margin: auto;
      width:201px;
      height:152px;
      background:rgba(204,204,204,1);
    }
    .login_d_input{
      padding:40px 0;
      height: auto;
      width: 100%;
      background:white;
      border-radius: 5px;
      box-shadow:0px 10px 10px 10px rgba(0, 0, 0, 0.2);
      .login_d_p{
        text-align: center;
        font-size: 34px;
        color:rgba(102,102,102,1);
      }
      .login_in{
        margin-top: 50px;
        height: 50px;
        justify-content: center;
        align-items: center;
        p{
          width: 65px;
          font-size: 16px;
          color:rgba(102,102,102,1);
        }
        input{
          padding-left: 10px;
          font-size: 16px;
          width: 376px;
          height: 50px;
          border:1px solid rgba(230,230,230,1);
          border-radius:5px;
        }
      }
      .top30{
        margin-top: 30px;
      }
      .login_btn{
        margin: 50px auto;
        margin-bottom: 0;
        display: block;
        width:376px;
        height:50px;
        background:rgba(42,176,234,1);
        border-radius:5px;
        font-size: 20px;
        color: white;
        cursor: pointer;
      }
      .login_btn:active{
        background:rgba(62,196,254,1);
      }
    }
  }
}
</style>