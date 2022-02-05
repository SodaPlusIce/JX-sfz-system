<template>
  <el-table :data="content" stripe height="420px" border style="width: 100%">
    <el-table-column prop="名称" label="名称" > </el-table-column>
    <el-table-column prop="证件号" label="证件号"></el-table-column>
    <el-table-column prop="手机号" label="手机号"> </el-table-column>
    <el-table-column prop="联系地址" label="联系地址"> </el-table-column>
    <el-table-column prop="是否属实本地" label="是否属实本地" > </el-table-column>
    <el-table-column prop="退回原因" label="退回原因"> </el-table-column>
    <el-table-column prop="其他核查过程信息" label="其它核查过程信息"> </el-table-column>
    <el-table-column prop="转出目的地市" label="转出目的地市" > </el-table-column>
    <el-table-column prop="转出目的区县" label="转出目的区县"> </el-table-column>
    <el-table-column prop="转出原因" label="转出原因"> </el-table-column>
  </el-table>
</template>

<script>
import bus from './eventBus'

export default {
  data() {
    return {
      content: []
    };
  },
  created(){
    //接受传过来的解析好的json数据
    bus.$on("data_question", (val) => {
      this.content=val;
    });
  }
};
</script>

<style scoped>
</style>