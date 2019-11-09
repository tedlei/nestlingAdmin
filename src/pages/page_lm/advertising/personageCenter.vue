<template>
  <div class="pcDm-app fx">
    <div class="pc_d1">
      <template v-for="(item,i) of topTitleList">
        <span :key="i" class="pc_d1_span">
          {{item.title}}
        </span>
      </template>
    </div>
    <div class="pc_d2" ref="pc_d2">
      <div class="pc_d2_li fx">
        <div class="pc_bdi_span"><span>主题广告图1</span></div>
        <div class="pc_bdi_input input">
          <el-input v-model="qrCodeImgName" :disabled="true"></el-input>
        </div>
        <el-upload
          class="upload-demo"
          action="http://192.168.3.65:9101/upload.do"
          multiple
          :limit="1"
          :on-success="getqrCodeImg"
          :before-upload="beforeAvatarUpload">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">建议尺寸：200*200 px 格式为JPG、PNG,且不超过1M</div>
        </el-upload>
      </div>
      <div class="pc_d2_li fx">
        <div class="pc_bdi_span"><span>链接1</span></div>
        <div class="pc_bdi_input input">
          <el-input v-model="qrCodeImgName"></el-input>
        </div>
      </div>
      <div class="pc_d2_li fx">
        <div class="pc_bdi_span"><span>主题广告图2</span></div>
        <div class="pc_bdi_input input">
          <el-input v-model="qrCodeImgName" :disabled="true"></el-input>
        </div>
        <el-upload
          class="upload-demo"
          action="http://192.168.3.65:9101/upload.do"
          multiple
          :limit="1"
          :on-success="getqrCodeImg"
          :before-upload="beforeAvatarUpload">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">建议尺寸：200*200 px 格式为JPG、PNG,且不超过1M</div>
        </el-upload>
      </div>
      <div class="pc_d2_li fx">
        <div class="pc_bdi_span"><span>链接2</span></div>
        <div class="pc_bdi_input input">
          <el-input v-model="qrCodeImgName"></el-input>
        </div>
      </div>
    </div>
    <div class="pc_btn fx">
      <el-button type="primary">确认</el-button>
    </div>
  </div>
</template>

<script>
import {Button,Select,Option,Input,MessageBox,Pagination,Upload} from 'element-ui'
import Vue from 'vue';
Vue.use(Button);
Vue.use(Select);
Vue.use(Option);
Vue.use(Input);
Vue.use(Pagination);
Vue.use(Upload);
export default {
  data () {
    return {
      topTitleList:[{title:'主题广告位'}],    //顶部抬头显示
      qrCodeImgName:'',
      qrCodeImgUrl:'',
    };
  },

  created(){
  },

  methods: {
    //获取图片路劲
    aptitudeSuccess(res, file,str) {
      console.log(res, file,str)
      if(!res.success) {
        this.$message({message:'上传失败，请重新上传！',type: 'warning'});
        return
      }
      switch (str) {
        case 'logo':
          this.LogoImgUrl = res.message;
          this.LogoImgName = file.name;
          break;
        case 'qrCode':
          this.qrCodeImgUrl = res.message;
          this.qrCodeImgName = file.name;
          break;
        case 'onea':
          this.oneAdvertisingImgUrl = res.message;
          this.oneAdvertisingImgName = file.name;
          break;
        case 'twoa':
          this.twoAdvertisingImgUrl = res.message;
          this.twoAdvertisingImgName = file.name;
          break;
        case 'threea':
          this.threeAdvertisingImgUrl = res.message;
          this.threeAdvertisingImgName = file.name;
          break;
        case 'map':
          this.mapImgUrl = res.message;
          this.mapImgName = file.name;
          break;
      }
    },

    //上传Logo图片
    getLogoImg(res,file){
      this.aptitudeSuccess(res, file,'logo');
    },
    //上传Logo图片
    getqrCodeImg(res,file){
      this.aptitudeSuccess(res, file,'qrCode');
    },
    //上传广告图片1
    getOneAdvertisingImg(res,file){
      this.aptitudeSuccess(res, file,'onea');
    },
    //上传广告图片2
    getTwoAdvertisingImg(res,file){
      this.aptitudeSuccess(res, file,'twoa');
    },
    //上传广告图片3
    getThreeAdvertisingImg(res,file){
      this.aptitudeSuccess(res, file,'threea');
    },
    //上传广告图片3
    getMapImg(res,file){
      this.aptitudeSuccess(res, file,'map');
    },

    //判断图片格式和大小
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/png'||file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) this.$message({message:'上传头像图片只能是 JPG或png 格式!',type: 'warning'});
      if (!isLt2M) this.$message({message:'上传头像图片大小不能超过 2MB!',type: 'warning'});
      return isJPG && isLt2M;
    },
  },
  watch: {
  },
}

</script>

<style lang='less'>
.pcDm-app{
  padding:20px;
  padding-top: 20px;
  position: relative;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background: white;
  .pc_d1{
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(230,230,230,1);
    position: relative;
    .pc_d1_span{
      font-size: 18px;
      color:rgba(51,51,51,1);
    }
  }
  .pc_d2{
    width: 100%;
    .pc_d2_li{
      margin-top:10px;
      width: 100%;
      height: 40px;
      align-items: center;
      // background-color: aqua;
      .pc_bdi_span{
        width: 9%;
        text-align: right;
        font-size: 16px;
        color:rgba(102,102,102,1);
      }
      .pc_bdi_input{
        margin-left: 2%;
        width: 30%;
        height: 100%;
        border:1px solid rgba(230,230,230,1);
        border-radius:5px;
        .el-input{
          border:0;
          height: 100%;
          .el-input__inner{
            border:0;
            height: 100%;
          }
        }
      }
      .pc_icon{
        margin-left: 30px;
        width: 18px;
        height: 18px;
        color: rgba(51,213,156,1);
        i{
          font-size: 18px;
        }
      }
      .pc_span{
        margin-left: 5px;
        font-size: 14px;
      }
      .fontColor{
        color:red;
      }
      .pc_select{
        border:0;
        display: flex;
        .el-select{
          border:1px solid rgba(230,230,230,1);
          border-radius:5px;
        }
        .el-select+.el-select{
          margin-left: 1%;
        }
      }
      .input{
        width:50%;
      }
      .bgColor{
        border-color: red;
      }
      .upload-demo{
        width: 35%;
        margin-left: 2%;
        .el-upload-list{
          display: none;
        }
        .el-upload__tip{
          margin-left: 3%;
          display:inline-block;
        }
      }
    }
  }
  .pc_btn{
    flex:1;
    justify-content: center;
    align-items:flex-end;
    .el-button{
      width:150px;
      height:40px;
    }
  }
}
</style>