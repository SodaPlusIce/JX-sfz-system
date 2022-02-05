<template>
<!-- 导航栏 start -->
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    background-color="#009688"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-menu-item index="1" @click="emit1">乡镇分拣</el-menu-item>
    <!-- <el-submenu index="2">
      <template slot="title">导出</template>
      <el-menu-item index="2-1" @click="emit21">导出问题表格</el-menu-item>
      <el-menu-item index="2-2" @click="emit22">登录</el-menu-item>
      <el-menu-item index="2-3" @click="emit23">管理账号</el-menu-item>
    </el-submenu> -->
    <!-- <el-menu-item index="2" @click="emit2">导出问题表格</el-menu-item> -->
    <el-menu-item index="3" @click="emit3">数据分析</el-menu-item>
    <!-- <el-menu-item index="4" @click="emit4">待核查人员</el-menu-item> -->
    <!-- <el-menu-item index="5" @click="emit5">已核查人员</el-menu-item> -->
    <el-menu-item index="6" @click="emit6">注销</el-menu-item>
    <!-- <el-menu-item index="7" @click="emit7">管理账号</el-menu-item> -->
  </el-menu>
<!-- 导航栏 end -->

</template>

<script>
import bus from './eventBus'

export default {
  data() {
    return {
      activeIndex: "1"
    };
  },
  methods: {
    emit1(){
      bus.$emit("tabItem-click",1);
    },
    emit2(){
      bus.$emit("tabItem-click",2);
    },
    emit3(){
      bus.$emit("tabItem-click",3);
    },
    emit4(){
      bus.$emit("tabItem-click",4);
    },
    emit5(){
      bus.$emit("tabItem-click",5);
    },
    emit6(){
      bus.$emit("tabItem-click",6);
    },
    emit7(){
      bus.$emit("tabItem-click",7);
    }
  },
};
</script>

<style scoped>
.el-menu-demo{
  background-color: rgb(0, 105, 0);
  width: 100%;
}
</style>
