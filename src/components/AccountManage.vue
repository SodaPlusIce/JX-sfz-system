<template>
  <div id="app">
    <!-- 用户名密码输入提示及input框 -->
    <div id="input_all">
      <br />
      <el-button id="btn-add" type="warning" @click="dialogFormVisible = true"
        >添加账号</el-button
      >
      <!-- 表单 -->
      <el-dialog title="账号信息" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item
            label="用户名"
            :label-width="formLabelWidth"
            :rules="[{ required: true, message: '用户名不能为空' }]"
          >
            <el-input
              v-model="form.id"
              placeholder="请输入用户名"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="密码"
            :label-width="formLabelWidth"
            :rules="[{ required: true, message: '密码不能为空' }]"
          >
            <el-input
              v-model="form.password"
              placeholder="请输入密码"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="权限等级设置"
            :label-width="formLabelWidth"
            :rules="[{ required: true }]"
          >
            <el-radio-group v-model="form.level" size="medium">
              <el-radio-button label="B"></el-radio-button>
              <el-radio-button label="C"></el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="所属地区" :label-width="formLabelWidth" :rules="[{ required: true }]">
            <el-select v-model="form.region" placeholder="请选择账号所属区域">
              <el-option label="安良" value="安良"></el-option>
              <el-option label="白庙" value="白庙"></el-option>
              <el-option label="茨芭" value="茨芭"></el-option>
              <el-option label="东城" value="东城"></el-option>
              <el-option label="广天" value="广天"></el-option>
              <el-option label="李口" value="李口"></el-option>
              <el-option label="龙山" value="龙山"></el-option>
              <el-option label="堂街" value="堂街"></el-option>
              <el-option label="王集" value="王集"></el-option>
              <el-option label="薛店" value="薛店"></el-option>
              <el-option label="姚庄" value="姚庄"></el-option>
              <el-option label="渣园" value="渣园"></el-option>
              <el-option label="长桥" value="长桥"></el-option>
              <el-option label="冢头" value="冢头"></el-option>
              <el-option label="社防组" value="社防组"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input v-model="form.tips" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addAccount">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div id="tableAccounts">
      <TableAccounts></TableAccounts>
    </div>
  </div>
</template>

<script>
import TableAccounts from "./TableAccounts.vue";
import bus from "./eventBus";

export default {
  data() {
    return {
      username: "",
      password: "",
      level: "B",
      tips: "",
      dialogFormVisible: false,
      form: {
        id: "",
        password: "",
        level: "B",
        region:"",
        tips: "",
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    addAccount() {
      //添加账号
      let that = this;
      that.dialogFormVisible = false;

      const token = window.localStorage.getItem("myToken");
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
        "http://127.0.0.1:8080/userManager/add?id=" +
        this.form.id +
        "&" +
        "password=" +
        this.form.password +
        "&" +
        "level=" +
        this.form.level +
        "&area="+
        this.form.region+
        "&" +
        "info=" +
        this.form.tips;
      this.axios.post(api).then((response) => {
        if (response.data == "760") {
          that.$message.success("添加成功！");
          bus.$emit("data-accounts", 1);
        } else {
          that.$message.error("账号添加失败，请检查后重新尝试！");
        }
      });
    },
  },
  components: {
    TableAccounts,
  },
};
</script>

<style scoped>
#input_all {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  margin-left: -50px;
}
#tips {
  margin-left: 50px;
  margin-right: 20px;
  margin-top: -10px;
  text-align: center;
}
#btn-check {
  background-color: rgb(35, 165, 240);
  border-color: rgb(35, 165, 240);
  margin-left: 20px;
  margin-top: -10px;
}
#btn-add {
  background-color: rgb(35, 165, 240);
  border-color: rgb(35, 165, 240);
  margin-left: 20px;
  margin-top: -10px;
}
</style>