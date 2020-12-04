<template>
  <el-table
    v-loading="loading"
    border
    :header-cell-style="{ 'background-color': '#fbfbfb' }"
    highlight-current-row
    :data="tableData"
    style="width: 100%"
  >
    <slot></slot>
    <el-table-column
      v-for="column in columns"
      :key="column.field"
      :prop="column.field"
      :label="column.title"
      :width="column.width"
    >
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    columns: {
      type: Array,
    },
  },
  data() {
    return {
      loading: false,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },
};
</script>

<style>
</style>