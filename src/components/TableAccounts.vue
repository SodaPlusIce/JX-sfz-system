<template>
  <el-table :data="tableData" style="width: 100%">
    <!-- 用户名 -->
    <el-table-column prop="ID" label="用户名" width="180"> </el-table-column>
    <!-- 密码 -->
    <el-table-column prop="Password" label="密码" width="180">
    </el-table-column>
    <!-- 权限等级 -->
    <el-table-column prop="Level" label="权限等级" width="180">
    </el-table-column>
    <!-- 所属地区 -->
    <el-table-column prop="Area" label="所属地区" width="180">
    </el-table-column>
    <!-- 备注 -->
    <el-table-column prop="Info" label="备注" width="180"> </el-table-column>
    <!-- 操作 -->
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" @click="dialogFormVisible = true"
          >修改备注</el-button
        >
        <el-dialog title="修改备注" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="备注" :label-width="formLabelWidth">
              <el-input v-model="form.info" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleEdit(scope.$index)"
              >确 定</el-button
            >
          </div>
        </el-dialog>
        <!-- @click="handleEdit(scope.$index) -->
        <el-button
          size="mini"
          type="danger"
          @click="deleteAccount(scope.row.ID)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import bus from "./eventBus";

export default {
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      form: {
        info: "",
      },
      formLabelWidth: "120px",
    };
  },
  mounted() {
    let that = this;

    that.getAccounts();
    bus.$on("data-accounts", (val) => {
      if (val == 1) {
        that.getAccounts();
      }
    });
  },
  methods: {
    getAccounts() {
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
      const api = "http://127.0.0.1:8080/userManager/getUsers";
      this.axios.get(api).then((response) => {
        if (response.data.status == "780") {
          //得到所有的账户信息
          this.tableData = response.data.users; //可以将json字符串转换成json对象
        }
      });
    },
    //编辑备注
    handleEdit(index) {
      let that = this;
      that.dialogFormVisible = false;

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
        "http://127.0.0.1:8080/userManager/modifyInfo?id=" +
        that.tableData[index].ID +
        "&info=" +
        this.form.info;
      this.axios.get(api).then((response) => {
        if (response.data.status == "790") {
          that.$message({
            type: "success",
            message: "修改备注成功",
          });
        }
      });

      bus.$emit("data-accounts", 1);
    },
    deleteAccount(name) {
      this.$confirm("此操作将永久删除该账号, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.handleDelete(name);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //删除账号
    handleDelete(name) {
      let that = this;

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
      const api = "http://127.0.0.1:8080/userManager/del?id=" + name;
      this.axios.get(api).then((response) => {
        if (response.data == "770") {
          that.$message.success("账号 " + name + " 已删除！");
          this.getAccounts();
        } else {
          that.$message.error("删除失败，请检查后重新尝试！");
        }
      });
    },
  },
};
</script>