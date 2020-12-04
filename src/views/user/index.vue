<template>
  <div>
    <div class="user-top">
      <el-input v-model="keyword" placeholder="根据用户昵称搜索"></el-input>
      <el-button plain icon="el-icon-search">搜索</el-button>
    </div>
    <table-template 
    :columns="table.columns"
    :tableData="tableData"
    >
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="text" size="small">移除 </el-button>
        </template>
      </el-table-column>
    </table-template>
  </div>
</template>

<script>
import tableTemplate from "@/components/mod/tableTemplate";

export default {
  data() {
    return {
      keyword: "",
      table: {
        columns: [{
          prop: 'cover',
          label: '封面'
        },{
          prop: 'startTime',
          label: '开始时间'
        },{
          prop: 'endTime',
          label: '结束时间'
        },{
          prop: 'tel',
          label: '联系电话'
        }],
      },
    };
  },
  mounted() {
    let breadcrumb = [
      {
        link: "#",
        title: "用户管理",
      },
      {
        link: "",
        title: "注册用户",
      },
    ];
    this.$store.commit("SET_BREADCRUMB", breadcrumb);
  },
  components: {
    tableTemplate,
  },
};
</script>

<style lang="scss">
.user-top {
  display: flex;
  margin-bottom: 15px;
  .el-input {
    width: 200px;
    margin-right: 10px;
    input::placeholder {
      color: var(--font-keyword-color);
    }
  }
  .el-button {
    width: 80px;
    padding: 10px;
  }
}
</style>