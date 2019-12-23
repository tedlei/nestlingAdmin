<template>
  <div class="boimg-app fx">
    <div class="boimg_d1">
      <template v-for="(item,i) of topTitleList">
        <span :key="i" class="boimg_d1_span">
          {{item.title}}
        </span>
      </template>
    </div>
    <div class="boimg_d2" ref="boimg_d2">
      <div v-for="(item,i) of uploadList" :key="i">
        <div class="boimg_d2_li fx">
          <div class="boimg_bdi_span"><span>{{item.title}}</span></div>
          <div class="boimg_bdi_input input">
            <el-input v-model="item.pic" :disabled="true"></el-input>
          </div>
          <el-upload
            class="upload-demo"
            :action="imgUploadUrl"
            :limit="1"
            ref = 'imgUpload'
            :on-success="(res,file)=>{return aptitudeSuccess(res,file,i)}"
            :before-upload="beforeAvatarUpload">
            <el-button size="small" @click="topQk(i)" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">建议尺寸：1920*700 px 格式为JPG、PNG,且不超过3M</div>
          </el-upload>
        </div>
        <!-- <div class="boimg_d2_li fx">
          <div class="boimg_bdi_span"><span>链接{{item.sortOrder}}</span></div>
          <div class="boimg_bdi_input input">
            <el-input @blur="onBlur(i)" v-model="item.url"></el-input>
          </div>
        </div> -->
      </div>
    </div>
    <div class="boimg_btn fx">
      <el-button type="primary" @click="topCommit">确认</el-button>
    </div>
  </div>
</template>

<script>
// import {Button,Select,Option,Input,MessageBox,Pagination,Upload} from 'element-ui'
// import Vue from 'vue';
// Vue.use(Button);
// Vue.use(Select);
// Vue.use(Option);
// Vue.use(Input);
// Vue.use(Pagination);
// Vue.use(Upload);
export default {
  data () {
    return {
      topTitleList:[{title:'app首页广告位'}],    //顶部抬头显示
      qrCodeImgName:'',
      qrCodeImgUrl:'',

      imgUploadUrl:'http://192.168.3.78:9101/upload.do',   //图片上传路劲

      uploadList:[    //上传列表
        {pic:'',title:'app首页广告位',sortOrder:"1",categoryId:'8',phone:""},
      ],
    };
  },

  created(){
    let phone = this.getItem('phone');
    if(phone){
      this.uploadList[0].phone = phone;
    }
    this.getThemeAdvList();
  },

  methods: {
    //获取主题广告列表
    getThemeAdvList(){
      let url = '/content/cateId.do';
      let data = {categoryId:'8'};
      let ull = this.uploadList;
      this.fetch({url,data,method:'get'},2).then(res=>{
        if(res.data.length<=0) return;
        for(let num in ull){
          ull[num].pic = res.data[num].pic;
        }
      })
    },

    //获取上传后的图片路劲
    aptitudeSuccess(res, file,num) {
      if(!res.success) {
        this.$message({message:'上传失败，请重新上传！',type: 'warning'});
        return
      }
      this.uploadList[num].pic = res.message;
    },
    
    //判断图片格式和大小
    beforeAvatarUpload(file,num) {
      const isJPG = file.type === 'image/png'||file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 3;
      if (!isJPG) this.$message({message:'上传头像图片只能是 JPG或png 格式!',type: 'warning'});
      if (!isLt2M) this.$message({message:'上传头像图片大小不能超过 3MB!',type: 'warning'});
      return isJPG && isLt2M;
    },

    //上传时清空列表
    topQk(num){
      this.$refs.imgUpload[num].clearFiles();
    },

    //点击确认时
    topCommit(){
      let url = '/content/update.do'
      this.fetch({url,data:this.uploadList,method:'post'},6).then(res=>{
        let {message,success} = res.data;
        this.$message({message,type:success?'success':'warning'});
      })
    }
  },
}

</script>

<style lang='less'>
.boimg-app{
  padding:20px;
  padding-top: 20px;
  position: relative;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background: white;
  .boimg_d1{
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(230,230,230,1);
    position: relative;
    .boimg_d1_span{
      font-size: 18px;
      color:rgba(51,51,51,1);
    }
  }
  .boimg_d2{
    width: 100%;
    .boimg_d2_li{
      margin-top:10px;
      width: 100%;
      height: 40px;
      align-items: center;
      // background-color: aqua;
      .boimg_bdi_span{
        width: 10%;
        text-align: right;
        font-size: 16px;
        color:rgba(102,102,102,1);
      }
      .boimg_bdi_input{
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
      .boimg_icon{
        margin-left: 30px;
        width: 18px;
        height: 18px;
        color: rgba(51,213,156,1);
        i{
          font-size: 18px;
        }
      }
      .boimg_span{
        margin-left: 5px;
        font-size: 14px;
      }
      .fontColor{
        color:red;
      }
      .boimg_select{
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
  .boimg_btn{
    padding-top: 20px;
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