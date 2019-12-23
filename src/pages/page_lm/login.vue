<template>
  <div class="login-app fx" ref="loginApp">
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
          <p>手机号</p>
          <input type="number" autofocus v-model="phone" placeholder="请输入手机号">
        </div>
        <div class="login_in fx top30">
          <p>验证码</p>
          <input type="number" class="login_input" v-model="yzm" placeholder="请输入验证码">
          <button 
          class="login_yzm" 
          :disabled="residueItem>0" 
          :class="residueItem>0?'yzmdis':''"
          @click="topGetYzm">{{residueItem>0?residueItem+"秒后获取":'获取验证码'}}</button>
        </div>
        <button class="login_btn" @click="topLogin">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      phone:'',
      yzm:'',

      residueItem:0,
    };
  },
  mounted() {
    let loginApp = this.$refs.loginApp;
    let then = this;
    loginApp.onkeydown=function(event){
      var e = event || window.event || arguments.callee.caller.arguments[0];       
      if(e && e.keyCode==13){
        then.topLogin();
      }
    }; 
  },
  methods: {
    //点击验证码时
    topGetYzm(){
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
      this.fetch({url,data:{phone:this.phone},method:'get'},6).then(res=>{
        this.$message({message:res.data.message,type:'success'});
      }).catch(err=>{
        this.$message({message:'获取验证码失败，请点击从新获取！',type:'warning'});
      })
    },

    //登陆
    topLogin(){
      let url = '/login.do'
      let yzm = this.yzm;
      let data = {
        phone:this.phone,
        code:yzm
      }
      if(yzm.length<6){
        this.$message({message:'验证码为空或格式错误！',type:'warning'});
        return
      }
      this.fetch({url,data,method:'get'},6).then(res=>{
        let {message,success} = res.data;
        if(success){
          this.setItem('phone',this.phone);
          setTimeout(() => {
            this.push('/index')
          }, 1000);
        }
        this.$message({message:success?'登陆成功':message,type:success?'success':'warning'});
      })
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

        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
            -webkit-appearance: none;
        }
        
        input[type="number"] {
            -moz-appearance: textfield;
        }
        .login_input{
          width: 200px;
        }
        .login_yzm{
          margin-left: 10px;
          width: 166px;
          height: 50px;
          border-radius: 5px;
          background-color: #fd8109;
          font-size: 16px;
          color: white;
          cursor: pointer;
        }
        .login_yzm:active{
          background-color: #ec7008;
        }
        .yzmdis{
          cursor: no-drop;
          background-color: #ccc;
        }
      }
      .top30{
        margin-top: 30px;
      }
      .login_btn{
        margin: 50px 138px;
        margin-bottom: 0;
        display: block;
        width:376px;
        height:50px;
        background:#fd8109;
        border-radius:5px;
        font-size: 20px;
        color: white;
        cursor: pointer;
      }
      .login_btn:active{
        background:#ec7008;
      }
    }
  }
}
</style>