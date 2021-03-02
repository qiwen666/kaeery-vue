<template>
  <div>
    <div class="role-btn">
      <el-button class="add" @click="add"
        ><i class="el-icon-plus"></i>添加角色</el-button
      >
      <el-button class="edit" @click="edit"
        ><i class="el-icon-edit"></i>编辑</el-button
      >
      <el-button type="danger" @click="remove"
        ><i class="el-icon-delete"></i>删除</el-button
      >
    </div>

    <tableSearch
      :searchItem="searchItem"
      :searchHandler="searchHandler"
      @callbackSelect="callbackSelect"
      @callbackDate="callbackDate"
      @callbackKeyword="callbackKeyword"
    >
      <template #keyword>
        <el-input-number v-model="num" @change="handleChange"></el-input-number>
      </template>
    </tableSearch>

    <table-template
      ref="table"
      :columns="columns"
      :tableOptions="tableOptions"
      :tableData="tableData"
      :searchItem="searchItem"
      @selectCureentChange="selectCureentChange"
    ></table-template>
    <add-role
      ref="addRole"
      :isShow.sync="isShow"
      :listInfo="listInfo"
      @submitForm="submitForm"
      @cancelSelect="cancelSelect"
      :title="title"
    ></add-role>
  </div>
</template>

<script>
import tableTemplate from "@/components/mod/tableTemplate";
import addRole from "@/components/dialogs/addRole";
import { formatContent } from "@/utils/common";
import tableSearch from "@/components/mod/tableSearch";
import role from "@/mixins/role";
import { showMessage, createEnum } from '../../utils/showMessage'

export default {
  mixins: [role],
  data() {
    return {
      columns: [
        {
          label: "角色名称",
          prop: "roleName",
          width: 180,
          render: (val) => {
            return val.roleName === 1 ? "管理员" : "超级管理员";
          },
        },
        {
          label: "角色描述",
          prop: "description",
          render: (val) => {
            return formatContent(val.description);
          },
        },
      ],
      tableOptions: {
        index: true,
        labelIndex: "序号",
        highlightCurrentRow: true,
      },
      tableData: [
        {
          id: 1,
          roleName: 1, // 管理员
          description: "测试角色",
        },
        {
          id: 2,
          roleName: 2,
          description:
            "测试角色测试角色测试角色测试角色测试角色测试角色测试角色测试角色",
        },
      ],
      searchItem: [
        { label: "订单状态", prop: "orderStatus", type: "select", width: "180px", options: "orderStatus" },
        { label: "日期范围", prop: "range", type: "date" },
        { label: "关键字搜索", prop: "keyword", type: "input", placeholder: "请输入内容" },
        // { label: "空间容量", prop: "spaceCapcity", type: "slot", name: "keyword" },
      ],
      searchHandler: [
        // { label: "导出账单", element: "button", handler: () => { this.showDialog() }},
      ],
      isShow: false,
      selectRow: {},
      listInfo: {},
      title: "",
      num: "",
    };
  },
  mounted() {
    let breadcrumb = [
      {
        link: "#",
        title: "权限管理",
      },
      {
        link: "",
        title: "系统角色",
      },
    ];
    this.$store.commit("SET_BREADCRUMB", breadcrumb);
  },
  created() {
    this.getTableList();
  },
  methods: {
    // 添加角色
    add() {
      this.isShow = !this.isShow;
      this.title = "添加角色";
      this.$refs["addRole"].reset();
    },
    // 编辑角色
    edit() {
      if (!this.selectRow.id) {
        this.$message.warning("请选中一行数据");
        return false;
      } else {
        this.isShow = true;
        this.title = "编辑角色";
        this.listInfo = this.selectRow;
      }
      this.isShow = true;
    },
    // 删除
    remove() {
      this.selectRow.id
        ? this.removeTips()
        : this.$message.warning("请选中一行数据");
    },
    // 删除提示
    removeTips() {
      this.$confirm("此操作将永久删除该角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          showMessage(0)
          this.cancelSelect();
        })
        .catch(() => {
          showMessage(3)
          this.cancelSelect();
        });
    },
    // 选中当前行
    selectCureentChange(currentRow) {
      this.selectRow = Object.assign({}, currentRow);
    },
    // 取消选中当前行
    cancelSelect() {
      this.$refs["table"].$refs.tableTemplate.setCurrentRow();
    },
    // 添加角色
    submitForm(args) {
      console.log(args,'submitForm');
    },
    getTableList() {
      let searchInfo = {
        orderStatus: this.orderStatus,
        range: this.range,
        keyword: this.keyword,
      };
      console.log(searchInfo, "请求参数");
    },
  },
  components: {
    tableTemplate,
    addRole,
    tableSearch,
  },
};
</script>

<style lang="scss">
.role-btn {
  text-align: right;
  .el-button {
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    border-radius: 6px;
    i {
      margin-right: 6px;
    }
  }
  span {
    color: var(--bg-white-color);
  }
  .add {
    background: var(--bg-add-color);
  }
  .edit {
    background: var(--bg-edit-color);
  }
}
</style>