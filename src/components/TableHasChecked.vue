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
    <!-- 姓名 start -->
    <el-table-column label="姓名" width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>姓名: {{ scope.row.Name }}</p>
          <p>住址: {{ scope.row.Address }}</p>
          <p>手机号: {{ scope.row.Phone }}</p>
          <p>身份证号: {{ scope.row.ID }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.Name }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <!-- 姓名 end -->
    <!-- 地区 start -->
    <el-table-column
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
    <!-- 第一次检测 start -->
    <el-table-column label="第一次检测" width="100">
      <template slot-scope="scope">
        <div slot="reference" class="result-wrapper">
          <el-tag
            :type="scope.row.NucTime.One === '阴性' ? 'success' : 'danger'"
            size="medium"
            >{{ scope.row.NucTime.One }}</el-tag
          >
        </div>
      </template>
    </el-table-column>
    <!-- 第一次检测 end -->
    <!-- 第二次检测 start -->
    <el-table-column label="第二次检测" width="100">
      <template slot-scope="scope">
        <div slot="reference" class="result-wrapper">
          <el-tag
            :type="scope.row.NucTime.Two === '阴性' ? 'success' : 'danger'"
            size="medium"
            >{{ scope.row.NucTime.Two }}</el-tag
          >
        </div>
      </template>
    </el-table-column>
    <!-- 第二次检测 end -->
    <!-- 第三次检测 start -->
    <el-table-column label="第三次检测" width="100">
      <template slot-scope="scope">
        <div slot="reference" class="result-wrapper">
          <el-tag
            :type="scope.row.NucTime.Three === '阴性' ? 'success' : 'danger'"
            size="medium"
            >{{ scope.row.NucTime.Three }}</el-tag
          >
        </div>
      </template>
    </el-table-column>
    <!-- 第三次检测 end -->
    <!-- 第四次检测 start -->
    <el-table-column label="第四次检测" width="100">
      <template slot-scope="scope">
        <div slot="reference" class="result-wrapper">
          <el-tag
            :type="scope.row.NucTime.Four === '阴性' ? 'success' : 'danger'"
            size="medium"
            >{{ scope.row.NucTime.Four }}</el-tag
          >
        </div>
      </template>
    </el-table-column>
    <!-- 第四次检测 end -->
    <!-- 第五次检测 start -->
    <el-table-column label="第五次检测" width="100">
      <template slot-scope="scope">
        <div slot="reference" class="result-wrapper">
          <el-tag
            :type="scope.row.NucTime.Five === '阴性' ? 'success' : 'danger'"
            size="medium"
            >{{ scope.row.NucTime.Five }}</el-tag
          >
        </div>
      </template>
    </el-table-column>
    <!-- 第五次检测 end -->
    <!-- 第六次检测 start -->
    <el-table-column label="第六次检测" width="100">
      <template slot-scope="scope">
        <div slot="reference" class="result-wrapper">
          <el-tag
            :type="scope.row.NucTime.Six === '阴性' ? 'success' : 'danger'"
            size="medium"
            >{{ scope.row.NucTime.Six }}</el-tag
          >
        </div>
      </template>
    </el-table-column>
    <!-- 第六次检测 end -->
    <!-- 第七次检测 start -->
    <el-table-column label="第七次检测" width="100">
      <template slot-scope="scope">
        <div slot="reference" class="result-wrapper">
          <el-tag
            :type="scope.row.NucTime.Seven === '阴性' ? 'success' : 'danger'"
            size="medium"
            >{{ scope.row.NucTime.Seven }}</el-tag
          >
        </div>
      </template>
    </el-table-column>
    <!-- 第七次检测 end -->
    <!-- 操作，包含编辑和删除 start -->
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" @click="dialogFormVisible = true"
          >编辑信息</el-button
        >
        <!-- handleEdit(scope.$index, scope.row) -->
        <el-dialog title="编辑信息" :visible.sync="dialogFormVisible">
          <el-form>
            <el-form-item
              label="第几次核酸结果："
              :label-width="formLabelWidth"
            >
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="核酸结果：" :label-width="formLabelWidth">
              <el-radio-group v-model="radio2" size="middle">
                <el-radio-button label="阴性"></el-radio-button>
                <el-radio-button label="阳性"></el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleEdit(scope.$index)"
              >确 定</el-button
            >
          </div>
        </el-dialog>

        <el-button size="mini" type="danger" @click="deletee(scope.$index)"
          >解除隔离</el-button
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
      value:"",
      options: [
        {
          value: "one",
          label: "第一次",
        },
        {
          value: "two",
          label: "第二次",
        },
        {
          value: "three",
          label: "第三次",
        },
        {
          value: "four",
          label: "第四次",
        },
        {
          value: "five",
          label: "第五次",
        },
        {
          value: "six",
          label: "第六次",
        },
        {
          value: "seven",
          label: "第七次",
        },
      ],
      radio2: "",
      formLabelWidth: "200px",
      dialogFormVisible: false,
      tableData: [],
    };
  },
  mounted() {
    let that = this;
    that.getData();
    bus.$on("data-checked", (val) => {
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
      const api = "http://192.168.0.109:8080/NVP/getVDPS";
      this.axios.get(api).then((response) => {
        if (response.data.status == "840") {
          this.tableData = response.data.msg; //可以将json字符串转换成json对象
        }
      });
    },
    //编辑信息，更新核酸结果 undone
    handleEdit(index) {
      this.dialogFormVisible = false;
      const token = window.localStorage.getItem("myToken");
      if (token) {
        this.axios.interceptors.request.use((config) => {
          config.headers.token = token;
          return config;
        });
      }
      const api =
        "http://192.168.0.109:8080/NVP/updateNUC?id="+ this.tableData[index].ID +"&time="+this.value+"&nures="+this.radio2;
      this.axios.get(api).then((response) => {
        if (response.data == "850") {
          this.$message.success("操作成功！");
          bus.$emit("data-checked", 1);
        } else {
          this.$message.error("操作失败！");
        }
      });
    },
    deletee(index) {
      this.$confirm(
        "此操作将会使 " +
          this.tableData[index].Name +
          " 解除隔离" +
          ", 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          this.handleDelete(index);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //解除隔离 undone
    handleDelete(index) {
      const token = window.localStorage.getItem("myToken");
      if (token) {
        this.axios.interceptors.request.use((config) => {
          config.headers.token = token;
          return config;
        });
      }
      const api =
        "http://192.168.0.109:8080/NVP/delPER?id=" +
        this.tableData[index].ID;
      this.axios.get(api).then((response) => {
        if (response.data == "860") {
          this.$message.success("操作成功！");
          bus.$emit("data-checked", 1);
        } else {
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
    filterDistrict(value, row) {
      return row.Region === value;
    },
  },
};
</script>
