<template>
  <el-table :data="content" stripe height="550px" border style="width: 100%">
    <el-table-column prop="ID" label="证件号"> </el-table-column>
    <el-table-column prop="Name" label="名称" width="180"></el-table-column>
    <el-table-column prop="Phone" label="手机号"> </el-table-column>
    <el-table-column prop="Address" label="联系地址"> </el-table-column>
    <el-table-column prop="PublicDate" label="下发时间"> </el-table-column>
  </el-table>
</template>

<script>
import bus from "./eventBus";

export default {
  data() {
    return {
      content: [],
    };
  },
  created() {
    //接受传过来的解析好的json数据
    bus.$on("data_towns", (val) => {
      this.content = val;
      this.local_store();
    });
  },
  methods: {
    //用于chart的本地存储
    local_store() {
      var patt1 = new RegExp("安良");
      var patt2 = new RegExp("白庙");
      var patt3 = new RegExp("茨芭");
      var patt4 = new RegExp("东城");
      var patt5 = new RegExp("广天");
      var patt6 = new RegExp("黄道");
      var patt7 = new RegExp("李口");
      var patt8 = new RegExp("龙山");
      var patt9 = new RegExp("堂街");
      var patt10 = new RegExp("王集");
      var patt11 = new RegExp("薛店");
      var patt12 = new RegExp("姚庄");
      var patt13 = new RegExp("渣园");
      var patt14 = new RegExp("长桥");
      var patt15 = new RegExp("冢头");

      //用以chart的本地数据存储,数据初始化
      window.localStorage.setItem("an", 0);
      window.localStorage.setItem("bai", 0);
      window.localStorage.setItem("ci", 0);
      window.localStorage.setItem("dong", 0);
      window.localStorage.setItem("guang", 0);
      window.localStorage.setItem("huang", 0);
      window.localStorage.setItem("li", 0);
      window.localStorage.setItem("long", 0);
      window.localStorage.setItem("tang", 0);
      window.localStorage.setItem("wang", 0);
      window.localStorage.setItem("xue", 0);
      window.localStorage.setItem("yao", 0);
      window.localStorage.setItem("zha", 0);
      window.localStorage.setItem("chang", 0);
      window.localStorage.setItem("zhong", 0);

      for (var i = 0; i < this.content.length; i++) {
        if (patt1.test(this.content[i]["Address"])) {
          window.localStorage.setItem(
            "an",
            parseInt(window.localStorage.getItem("an")) + 1
          );
          continue;
        }
        if (patt2.test(this.content[i]["Address"])) {
          window.localStorage.setItem(
            "bai",
            parseInt(window.localStorage.getItem("bai")) + 1
          );
          continue;
        }
        if (patt3.test(this.content[i]["Address"])) {
          window.localStorage.setItem(
            "ci",
            parseInt(window.localStorage.getItem("ci")) + 1
          );
          continue;
        }
        if (patt4.test(this.content[i]["Address"])) {
          window.localStorage.setItem(
            "dong",
            parseInt(window.localStorage.getItem("dong")) + 1
          );
          continue;
        }
        if (patt5.test(this.content[i]["Address"])) {
          window.localStorage.setItem(
            "guang",
            parseInt(window.localStorage.getItem("guang")) + 1
          );
          continue;
        }
        if (patt6.test(this.content[i]["Address"])) {
          window.localStorage.setItem(
            "huang",
            parseInt(window.localStorage.getItem("huang")) + 1
          );
          continue;
        }
        if (patt7.test(this.content[i]["Address"])) {
          window.localStorage.setItem(
            "li",
            parseInt(window.localStorage.getItem("li")) + 1
          );
          continue;
        }
        if (patt8.test(this.content[i]["Address"])) {
          window.localStorage.setItem(
            "long",
            parseInt(window.localStorage.getItem("long")) + 1
          );
          continue;
        }
        if (patt9.test(this.content[i]["Address"])) {
          window.localStorage.setItem(
            "tang",
            parseInt(window.localStorage.getItem("tang")) + 1
          );
          continue;
        }
        if (patt10.test(this.content[i]["Address"])) {
          window.localStorage.setItem(
            "wang",
            parseInt(window.localStorage.getItem("wang")) + 1
          );
          continue;
        }
        if (patt11.test(this.content[i]["Address"])) {
          window.localStorage.setItem(
            "xue",
            parseInt(window.localStorage.getItem("xue")) + 1
          );
          continue;
        }
        if (patt12.test(this.content[i]["Address"])) {
          window.localStorage.setItem(
            "yao",
            parseInt(window.localStorage.getItem("yao")) + 1
          );
          continue;
        }
        if (patt13.test(this.content[i]["Address"])) {
          window.localStorage.setItem(
            "zha",
            parseInt(window.localStorage.getItem("zha")) + 1
          );
          continue;
        }
        if (patt14.test(this.content[i]["Address"])) {
          window.localStorage.setItem(
            "chang",
            parseInt(window.localStorage.getItem("chang")) + 1
          );
          continue;
        }
        if (patt15.test(this.content[i]["Address"])) {
          window.localStorage.setItem(
            "zhong",
            parseInt(window.localStorage.getItem("zhong")) + 1
          );
          continue;
        }
      }
    },
  },
};
</script>

<style scoped>
</style>