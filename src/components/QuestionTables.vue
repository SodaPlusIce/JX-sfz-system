<template>
  <div id="app">
    <div id="upload">
      <UpdateFiles id="upload"></UpdateFiles>
    </div>
    <!-- 分拣表格 -->
    <div id="table_res">
      <TableQuestion :content="table_data"></TableQuestion>
    </div>
  </div>
</template>

<script>
import TableQuestion from "./TableQuestion.vue";
import UpdateFiles from "./UpdateFiles.vue"
import { Loading } from "element-ui";
import bus from "./eventBus";

export default {
  data() {
    return {
      text: "",
      table_data: [],
    };
  },
  methods: {
    check_alert() {
      var res = window.confirm(
        "请确认您是否已将待筛选文件放入指定文件夹。若已正确放入，请点击“确定”按钮；否则请点击“取消”按钮"
      );
      if (res) {
        this.select();
      }
    },
    //弹出提示框
    open() {
      this.$alert("没有问题表格！", "操作成功", {
        confirmButtonText: "确定",
        callback: (action) => {
          this.$message({
            type: "info",
            message: `action: ${action}`,
          });
        },
      });
    },
    //实现1->01的功能函数
    padLeft(nr, n, str) {
      return Array(n - String(nr).length + 1).join(str || "0") + nr;
    },
    //完成分拣操作
    select() {
      console.log("正在导出中...");
      //发送get请求
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          loadingInstance.close();
          window.alert("问题表格已导出！（若无内容则说明表格没有问题）");
          this.table_data = JSON.parse(this.responseText); //可以将json字符串转换成json对象
          bus.$emit("data_question", this.table_data);

          if (this.table_data == []) {
            this.open();
          }
        }
      };
      xhttp.open(
        "GET",
        "http://127.0.0.1:8080/checkInputSheetFormat?time=" +
          String(this.padLeft(this.value2.getMonth() + 1, 2)) +
          this.value2.getDate(),
        true
      );
      xhttp.send();
      let loadingInstance = Loading.service({ fullscreen: true }); //全屏显示加载中
    },
  },
  components: {
    TableQuestion,
    UpdateFiles
  },
};
</script>

<style scoped>
#upload{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}
</style>