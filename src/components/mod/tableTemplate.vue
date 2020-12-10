<template>
  <div class="table-template">
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
      >
        <template slot-scope="scope">
          <template v-for="(item, index) in tableHandle.options">
            <!-- 自定义按钮 -->
            <el-button v-if="item.disabled" :disabled="scope.row.status!==1" :key="index" type="text" size="small">{{item.label}}</el-button>
            <!-- 普通按钮 -->
            <el-button
              v-else
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

    <el-pagination
      v-if="hasPagination"
      class="table-pagination"
      background
      layout="total, sizes, prev, pager, next ,jumper"
      :current-page="pagination.currentpage ? pagination.currentPage : 1"
      :page-size="pagination.pageSize ? pagination.pageSize : 10"
      :total="pagination.total ? pagination.total : 0"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
  </el-pagination>


  </div>
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
    // 是否显示分页
    hasPagination: {
      type: Boolean,
      default: false
    },
    // 分页配置
    pagination: {
      type: Object,
      default: () => {
        return {
          currentPage: 1,
          pageSize: 10,
          total: 0
        }
      }
    }
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页${val}条`);
      this.$emit("handleSizeChange",val);
    },
    handleCurrentChange(val) {
      console.log(`当前${val}页`);
      this.$emit("handleCurrentChange",val);
    }
  }
};
</script>

<style lang="scss">
.table-template {
  .table-pagination {
    margin-top: 20px;
    text-align: right;
  }
}
</style>