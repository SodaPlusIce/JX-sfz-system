<template>
  <el-table ref="filterTable" :data="tableData" style="width: 100%">
    <!-- 日期 start -->
    <el-table-column
      label="日期"
      sortable
      width="180"
      column-key="scope.row.PublicDate"
    >
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.PublicDate }}</span>
      </template>
    </el-table-column>
    <!-- 日期 end -->
    <!-- 姓名等基本信息 start -->
    <el-table-column label="姓名" width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>姓名: {{ scope.row.Name }}</p>
          <p>住址: {{ scope.row.Address }}</p>
          <p>身份证号: {{ scope.row.ID }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.Name }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <!-- 姓名等基本信息 end -->
    <!-- 手机号 start -->
    <el-table-column
      label="手机号"
      width="180"
    >
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.Phone }}</span>
      </template>
    </el-table-column>
    <!-- 手机号 end -->
    <!-- 地区 start -->
    <el-table-column
      prop="district"
      label="所属街道或乡镇"
      width="180"
      :filters="[
        { text: '安良', value: '安良' },
        { text: '白庙', value: '白庙' },
        { text: '茨芭', value: '茨芭' },
        { text: '东城', value: '东城' },
        { text: '广天', value: '广天' },
        { text: '黄道', value: '黄道' },
        { text: '李口', value: '李口' },
        { text: '龙山', value: '龙山' },
        { text: '堂街', value: '堂街' },
        { text: '王集', value: '王集' },
        { text: '薛店', value: '薛店' },
        { text: '姚庄', value: '姚庄' },
        { text: '渣园', value: '渣园' },
        { text: '长桥', value: '长桥' },
        { text: '冢头', value: '冢头' },
      ]"
      :filter-method="filterDistrict"
      filter-placement="bottom-end"
    >
      <template slot-scope="scope">
        <el-tag type="warning" disable-transitions>{{
          scope.row.Region
        }}</el-tag>
      </template>
    </el-table-column>
    <!-- 地区 end -->
    <!-- 状态，待核查和已核查 start -->
    <el-table-column
      prop="tag"
      label="状态"
      width="180"
      :filters="[
        { text: '待核查', value: false },
        { text: '已核查', value: true },
      ]"
      :filter-method="filterTag"
      filter-placement="bottom-end"
    >
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.Verified === false ? 'primary' : 'success'"
          disable-transitions
          >{{ scope.row.Verified==false?"待核查":"已核查" }}</el-tag
        >
      </template>
    </el-table-column>
    <!-- 状态，待核查和已核查 end -->
    <!-- 操作，包含编辑和删除 start -->
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          id="check-btn"
          @click="edit(scope.$index, scope.row)"
          ><el-tag type="success" disable-transitions
            >转为已核查</el-tag
          ></el-button
        >
      </template>
    </el-table-column>
    <!-- 操作，包含编辑和删除 end -->
  </el-table>
</template>

<script>
import bus from "./eventBus"

export default {
  data() {
    return {
      tableData: []
    };
  },
  mounted() {
    let that = this;
    that.getData();
    bus.$on("data-unchecked", (val) => {
      if (val == 1) {
        that.getData();
      }
    });
  },
  methods: {
    //调接口，查询数据
    getData() {
      const token = window.localStorage.getItem("myToken");
      if (token) {
        this.axios.interceptors.request.use((config) => {
          config.headers.token = token;
          return config;
        });
      }
      const api = "http://127.0.0.1:8080/NVP/getNVPS";
      this.axios.get(api).then((response) => {
        if (response.data.status == "820") {
          //得到所有的账户信息
          this.tableData = response.data.msg; //可以将json字符串转换成json对象
        }
      });
    },
    edit(index){
      this.$confirm("此操作将会使 "+this.tableData[index].Name+
      " 的状态变为已核查"+", 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.handleEdit(index);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //状态变为已核查
    handleEdit(index) {
      const token = window.localStorage.getItem("myToken");
      if (token) {
        this.axios.interceptors.request.use((config) => {
          config.headers.token = token;
          return config;
        });
      }
      const api = "http://127.0.0.1:8080/NVP/updateVerified?id="+this.tableData[index].ID;
      this.axios.get(api).then((response) => {
        if (response.data == "830") {
          this.$message.success("操作成功！");
          bus.$emit("data-unchecked",1);
        }else{
          this.$message.error("操作失败！");
        }
      });
    },
    resetDateFilter() {
      this.$refs.filterTable.clearFilter("date");
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.Verified === value;
    },
    filterDistrict(value, row) {
      return row.Region === value;
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
  },
};
</script>
<style scoped>
#check-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 82px;
  height: 32px;
  border: 0;
}
</style>