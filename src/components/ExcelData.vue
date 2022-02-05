<template>
  <div id="app">
    <!-- 分拣表格 -->
    <div id="table_res">
      <TableExcel :content="table_data"></TableExcel>
    </div>
  </div>
</template>

<script>
import TableExcel from "./TableExcel.vue";

export default {
  data() {
    return {
      table_data: [],
    };
  },
  components: {
    TableExcel
  },
};
</script>
