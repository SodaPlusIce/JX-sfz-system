<template>
  <div id="app">
    <!-- 分拣表格 -->
    <div id="table_res">
      <TableHasChecked :content="table_data"></TableHasChecked>
    </div>
  </div>
</template>

<script>
import TableHasChecked from "./TableHasChecked.vue";

export default {
  data() {
    return {
      table_data: [],
    };
  },
  components: {
    TableHasChecked
  },
};
</script>
