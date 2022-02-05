<template>
  <div id="app">
    <div id="input_all">
      <br />
      <div class="block">
        <span class="demonstration">日期：</span>
        <el-date-picker
          v-model="value2"
          align="right"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
      </div>
      <!-- 确认按钮 -->
      <el-button id="btn-check" @click="check_alert" type="warning"
        >导出</el-button
      >
    </div>

    <div id="upload">
      <UpdateFiles id="upload"></UpdateFiles>
    </div>

    <!-- 分拣表格 -->
    <div id="table_res">
      <TableTowns :content="table_data"></TableTowns>
    </div>
  </div>
</template>

<script>
import TableTowns from "./TableTowns.vue";
import UpdateFiles from "./UpdateFiles.vue"
import { Loading } from "element-ui";
import bus from "./eventBus";

export default {
  data() {
    return {
      table_data: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      value2: Date,
    };
  },
  methods: {
    //调乡镇分拣接口
    check_alert() {
      //取出来token
      const token = window.localStorage.getItem("myToken");
      //token有的话 执行这段操作 没有的话  就不添加token了 这样我们就不会把token传给后端了
      //是的 就是这么简单
      if (token) {
        this.axios.interceptors.request.use((config) => {
          // 为请求头添加token字段为服务端返回的token
          config.headers.token = token;
          // return config是固定用法 必须有返回值
          return config;
        });
      }

      //发送get请求
      const api =
        "http://192.168.0.109:8080/selectData";
      this.axios.get(api).then((response) => {
        if (response.data == "810") {
          this.$message.success("已完成乡镇分拣！");
          this.select();
        }else if(response.data == "751"){
          this.$message.warning("对不起，您没有权限访问此功能！");
        }
      });
    },
    //完成分拣操作
    select() {
      // 日期的本地存储          
      window.localStorage.setItem("month",String(this.value2.getMonth()+1));
      window.localStorage.setItem("day",String(this.value2.getDay()-1));

      let loadingInstance = Loading.service({ fullscreen: true }); //全屏显示加载中图样
      const token = window.localStorage.getItem("myToken");
      if (token) {
        this.axios.interceptors.request.use((config) => {
          config.headers.token = token;
          return config;
        });
      }
      const api ="http://192.168.0.109:8080/NVP/getNVPS";
      this.axios.get(api).then((response) => {
        if (response.data.status == "820") {
          console.log(response.data.msg);
          this.table_data=response.data.msg;
          bus.$emit("data_towns", this.table_data);
          loadingInstance.close();
        }
      });
    },
  },
  components: {
    TableTowns,
    UpdateFiles
  },
};
</script>

<style scoped>
#input_all {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  margin-bottom: -5px;
  margin-left: -50px;
}
#btn-check {
  background-color: rgb(84, 165, 59);
  border-color: rgb(84, 165, 59);
  margin-left: 20px;
  margin-top: -20px;
}
.block {
  margin-top: 5px;
  margin-bottom: 25px;
}
#upload{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -30px;
  margin-bottom: 10px;
  margin-left: -75px;
}
</style>
