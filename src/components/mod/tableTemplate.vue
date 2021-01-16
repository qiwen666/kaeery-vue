<template>
  <div class="table-container">
    <!-- 表格 -->
    <el-table
      ref="tableTemplate"
      v-loading="loading"
      :header-cell-style="{ 'background-color': '#fbfbfb' }"
      :highlight-current-row="tableOptions.highlightCurrentRow"
      @current-change="selectCureentChange"
      @selection-change="tableSelectChange"
      :data="tableData"
      style="width: 100%"
    >
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
        :width="item.width"
      >
        <template slot-scope="scope">
          <div v-if="item.render">{{ item.render(scope.row) }}</div>
          <!-- 自定义表格插槽 -->
          <slot
            v-else-if="item.slotContent && item.slotContent === 'slot'"
            :name="item.slotName"
            :row="scope.row"
          ></slot>
          <div v-else>{{ scope.row[item.prop] }}</div>
        </template>
      </el-table-column>

      <!-- 自定义按钮插槽 -->
      <el-table-column
        label="操作"
        width="180"
        v-if="tableOptions && tableOptions.slotBtn"
      >
        <template slot-scope="scope">
          <slot :data="scope.row"></slot>
        </template>
      </el-table-column>

      <!-- 操作按钮 -->
      <el-table-column
        v-if="tableHandle.label"
        :label="tableHandle.label"
        width="280"
      >
        <template slot-scope="scope">
          <template v-for="(item, index) in tableHandle.options">
            <el-button
              type="text"
              size="small"
              :key="index"
              @click.native.prevent="item.method(index, scope.row)"
              :style="
                tableOptions.btnStyle
                  ? {
                      color: `${tableOptions.btnStyle.color}`,
                      marginRight: tableOptions.btnStyle.size + 'px',
                    }
                  : ''
              "
              >{{ item.label }}</el-button
            >
          </template>
        </template>
      </el-table-column>
    </el-table>

    <div class="tableFooter">
      <slot name="tableLeft" ></slot>
      <!-- 分页 -->
      <el-pagination
        class="pagination"
        background
        :layout="
          tableOptions.pageExtend && tableOptions.pageExtend.layout
            ? tableOptions.pageExtend.layout
            : 'total, prev, pager, next'
        "
        :current-page="pagination.currentPage"
        :page-size="pagination.pageSize"
        :total="pagination.total"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      >
      </el-pagination>

    </div>
  </div>
</template>

<script>

export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
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
        slotBtn: false, //自定义按钮
        pageExtend: {
          layout: "total, prev, pager, next",
        },
        btnStyle: {
          color: "",
          size: null,
        },
      },
    },
    tableHandle: {
      type: Object,
      default: () => {
        return {};
      },
    },
    pagination: {
      type: Object,
      default: () => {
        return {
          currentPage: 1,
          pageSize: 10,
          total: 0,
        };
      },
    },
    tableRow: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页${val}条`);
      this.$emit("handleSizeChange", val);
    },
    handleCurrentChange(val) {
      console.log(`当前${val}页`);
      this.$emit("handleCurrentChange", val);
    },
    selectCureentChange(currentRow) {
      if (this.tableOptions.highlightCurrentRow) {
        this.$emit("selectCureentChange",currentRow)
      }
    },
    tableSelectChange(val) {
      console.log(val,'选中值');
      const requestData = {
        userId: val.map(item => item.id)
      }
      console.log(requestData);
      this.$emit("update:tableRow",requestData)
    }
  },
};
</script>

<style lang="scss">
.table-container {
  .tableFooter {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;

    .pagination {
      // text-align: right;
    }

  }
}
</style>