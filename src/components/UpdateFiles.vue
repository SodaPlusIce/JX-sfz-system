<template>
  <div style="width: 70%;margin-left: 30px;margin-top: 30px;">
    <el-upload ref="upload"
               class="upload-demo" :multiple='true' :auto-upload='true' list-type='text' :show-file-list='true'
               :before-upload="beforeUpload" :drag='true' action=''
               :http-request="uploadFile" accept=".xlsx,.xls" >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">点击<em>上传</em>,仅限excel文件</div>
    </el-upload>
    <!-- <el-button type="primary" style="margin-left:15px" @click="onSubumit">提交</el-button> -->
  </div>
</template>
 
<script>
  // 导入模块
  import axios from 'axios'
  export default {
    components: {
      axios
    },
    data() {
      return {
        isUpload:false,  // 是否上传文件
      }
    },
    methods: {
      // 上传文件之前的钩子
      beforeUpload(file) {
        //判断文件格式
        let hz = file.name.split('.').pop()
        // console.log("hz",hz)
        if (hz != 'xlsx' && hz != 'xls') {
          this.$message.error(`只能选择excel文件，文件后缀须为.xlsx或.xls`)
          return false
        }
 
        this.isUpload = true
      },
      // 上传文件
      uploadFile(item) {
        let _this = this
        let fileObj = item.file
        const form = new FormData()// FormData 对象
        form.append('file', fileObj)// 文件对象  'upload'是后台接收的参数名
        axios({
          url: 'http://192.168.0.109:8080/upload',
          data: form,
          method: 'POST',
          contentType: 'multipart/form-data',
          processData: false //告诉jquery不要对form进行处理
          // contentType: false, //指定为false才能形成正确的Content-Type
        })
          .then(function(res) {
            console.log(res);
            if(res.data.status=="800"){
                _this.$message.success("上传成功");
            }else if(res.data.status=="751"){
                _this.$message.warning("对不起，您没有权限访问此功能！");
            }
            
          })
          .catch(function(err) {
            let res = err.response
            // console.log('失败', res)
            _this.$message.error(res.data.msg)
          })
      },
      // 检查是否上传
      onSubumit(){
        if (this.isUpload == false){
          this.$message.error("请上传excel文件")
          return false
        } else {
          this.$message.success("文件已上传")
          return true
        }
      },
    }
  }
</script>
 
<style>
</style>

