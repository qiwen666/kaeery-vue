<template>
  <el-table
    v-loading="loading"
    :header-cell-style="{ 'background-color': '#fbfbfb' }"
    highlight-current-row
    :data="tableData"
    style="width: 100%"
  >
    <!-- <slot></slot> -->
    <!-- 复选框 -->
    <el-table-column
      v-if="tableOptions && tableOptions.selection"
      type="selection"
      width="55"
    ></el-table-column>

    <!-- 序列号 -->
    <el-table-column
      v-if="tableOptions && tableOptions.index"
      :label="tableOptions && tableOptions.labelIndex"
      type="index"
      width="55"
    ></el-table-column>

    <!-- 基本表格 -->
    <el-table-column
      v-for="item in columns"
      :key="item.prop"
      :prop="item.prop"
      :label="item.label"
    >
      <template slot-scope="scope">
        <div v-if="item.render">{{ item.render(scope.row) }}</div>
        <!-- 自定义表格插槽 -->
        <slot v-else-if="item.slotContent && item.slotContent === 'slot'" :name="item.slotName" :row="scope.row"></slot>
        <div v-else>{{ scope.row[item.prop] }}</div>
      </template>
    </el-table-column>

    <el-table-column
      label="操作"
      v-if="tableOptions && tableOptions.slotContent"
    >
      <template slot-scope="scope">
        <slot :data="scope"></slot>
      </template>
    </el-table-column>

    <!-- 操作按钮 -->
    <el-table-column
      v-if="tableHandle.label"
      :label="tableHandle.label"
      width="100"
    >
      <template slot-scope="scope">
        <template v-for="(item, index) in tableHandle.options">
          <el-button
            type="text"
            size="small"
            :key="index"
            @click.native.prevent="item.method(index, scope.row)"
            >{{ item.label }}</el-button
          >
        </template>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    columns: {
      type: Array,
      default: () => {
        return [];
      },
    },
    tableData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    tableOptions: {
      type: Object,
      default: {
        stripe: false, //斑马纹
        highlightCurrentRow: false, //高亮当前行
        border: false,
        index: false, //序列号,
        labelIndex: "", //序列号文本显示
        selection: false, //复选框
        slotContent: false,
      },
    },
    tableHandle: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      loading: false,
    };
  },
};
</script>

<style>
</style>