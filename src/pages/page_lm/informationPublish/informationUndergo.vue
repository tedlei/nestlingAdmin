<template>
  <div class="teacUnd-app fx">
    <div class="teac_d_editor fx">
      <div class="teac_d_header" ref="teac_d_header"></div>
      <div class="teac_d_body" ref="teac_d_body">
      </div>
    </div>

    <div class="addt_button">
      <el-button type="primary" @click="topCommit()">保存</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      editorObj:null,  //富文本对象
      schoolIntroStr: '', // 编辑内容
    };
  },

  mounted(){
    this.createEditorObj();
    this.getEditorHtml();
  },

  methods: {
    //初始化富文本
    createEditorObj(){
      let {teac_d_header, teac_d_body} = this.$refs;
      this.editor("editorObj", teac_d_header, teac_d_body, 'schoolIntroStr');
    },

    //获取后台富文本类容
    getEditorHtml(){
      this.schoolIntroStr = this.getItem('infoText');
    },

    //保存富文本类容
    topCommit(){
      this.setItem('infoText',this.editorObj.txt.html());
    }
  },
  beforeDestroy(){
    this.topCommit();
  },
  
}

</script>

<style lang='less'>
.teacUnd-app{
  width: 100%;
  flex-direction: column;
  .teac_d_editor{
    flex: 1;
    width: 100%;
    flex-direction: column;
    .teac_d_header{
      margin-top: 10px;
    }
    .teac_d_body{
      flex: 1;
        overflow-y: auto;
      .w-e-text{
        overflow-y: auto;
      }
    }
  }
  .addt_button{
    margin-top: 30px;
    text-align: center;
    .el-button{
      width:150px;
      height:40px;
      background:rgba(42,176,234,1);
      border-radius:5px;
    }
  }
}
</style>