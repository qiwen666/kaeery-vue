<template>
  <div>
    <div class="role-btn">
      <el-button class="add" @click="showDialog(1)"
        ><i class="el-icon-plus"></i>添加角色</el-button
      >
      <el-button class="edit" @click="showDialog(2)"
        ><i class="el-icon-edit"></i>编辑</el-button
      >
      <el-button type="danger" @click="remove"><i class="el-icon-delete"></i>删除</el-button>
    </div>
    <table-template
      ref="table"
      :columns="columns"
      :tableOptions="tableOptions"
      :tableData="tableData"
      @selectCureentChange="selectCureentChange"
    ></table-template>
    <add-role ref="addRole" :isShow.sync="isShow" :listInfo="listInfo" @cancelSelect="cancelSelect" :title="title"></add-role>
  </div>
</template>

<script>
import tableTemplate from "@/components/mod/tableTemplate";
import addRole from "@/components/dialogs/addRole";
import { formatContent } from "@/utils/common";

export default {
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
      isShow: false,
      selectRow: {},
      listInfo: {},
      title: ""
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
  methods: {
    // 添加角色
    add() {
      this.isShow = !this.isShow;
      this.title = "添加角色"
      this.$refs['addRole'].reset()
    },
    // 编辑角色
    edit() {
      if(!this.selectRow.id) {
        this.$message.warning('请选中一行数据');
        return false
      }else {
        this.isShow = true
        this.title = "编辑角色"
        this.listInfo = this.selectRow;
      }
      this.isShow = true;

    },
    // 删除
    remove() {
      this.selectRow.id ? this.removeTips() : this.$message.warning("请选中一行数据")
    },
    // 删除提示
    removeTips() {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        this.cancelSelect()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });    
        this.cancelSelect()      
        });    
    },
    // 选中当前行
    selectCureentChange(currentRow) {
      this.selectRow = Object.assign({}, currentRow);
    },
    // 取消选中当前行
    cancelSelect() {
      this.$refs['table'].$refs.tableTemplate.setCurrentRow();
    }
  },
  components: {
    tableTemplate,
    addRole,
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