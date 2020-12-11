<template>
  <div>
    <div class="user-top">
      <el-input v-model="keyword" placeholder="根据用户昵称搜索"></el-input>
      <el-button plain icon="el-icon-search">搜索</el-button>
    </div>
    <table-template
      :columns="tableHeader"
      :tableOptions="tableOptions"
      :tableHandle="tableHandle"
      :tableData="tableData"
      @handleCurrentChange="handleCurrentChange"
      @handleSizeChange="handleSizeChange"
    >
      <template v-slot:content="slotProps">
        <el-tooltip
          class="item"
          effect="dark"
          :content="slotProps.row.content"
          placement="bottom"
        >
          <div>{{ slotProps.row.content | toFormatContent }}</div>
        </el-tooltip>
      </template>
      <template v-slot:quality="slotProps">
        <span class="operator" @click="showUpload">{{ slotProps.row.quality }}</span>
      </template>

      <!-- <template v-slot="slotProps">
        <el-button size="mini" @click="edit(slotProps.data)">编辑</el-button>
        <el-button size="mini" type="danger" @click="remove(slotProps.data.id)">删除</el-button>
      </template> -->

      <!-- 正常->禁用高亮 停用->启用高亮 -->
      <template v-slot="slotProps">
        <el-button
          type="text"
          size="small"
          :disabled="slotProps.data.handleStatus === 1"
          @click="handleAction(slotProps.data.id, 'enable')"
          >启用</el-button
        >
        <el-button
          type="text"
          size="small"
          :disabled="slotProps.data.handleStatus === 2"
          @click="handleAction(slotProps.data.id, 'disable')"
          >禁用</el-button
        >
      </template>
    </table-template>

    <upload :isShow.sync="isShow"/>

  </div>
</template>

<script>
import tableTemplate from "@/components/mod/tableTemplate";
import upload from "@/components/mod/upload";

export default {
  filters: {
    toFormatContent(val) {
      return val.length > 12 ? val.slice(0, 12) + "..." : val;
    },
  },
  data() {
    return {
      keyword: "",
      // table配置
      tableHeader: [
        {
          label: "公司名称",
          prop: "title",
          width: 180,
        },
        {
          label: "注册时间",
          prop: "registerTime",
          width: 180,
        },
        {
          label: "内容",
          prop: "content",
          width: 280,
          slotContent: "slot",
          slotName: "content",
        },
        {
          label: "权限",
          prop: "quality",
          width: 180,
          slotContent: "slot",
          slotName: "quality",
        },
        {
          label: "审核时间",
          prop: "status",
          width: 180,
          render: (row) =>
            row.status === 1
              ? "已发布"
              : row.status === 2
              ? "发布中"
              : "未发布",
        },
        {
          label: "状态",
          prop: "handleStatus",
          width: 80,
          render: (row) => (row.handleStatus === 1 ? "正常" : "停用"),
        },
      ],
      tableOptions: {
        selection: false,
        index: true,
        labelIndex: "序号",
        slotBtn: true,
        pageExtend: {
          layout: 'total, prev, pager, next,jumper'
        },
        btnStyle: {
          color: '#dbe27e',
          size: 15
        }
      },
      tableHandle: {
        label: "操作",
        options: [
          {
            label: "修改",
            method: (index, row) => {
              this.handleEdit(index, row);
            },
          },
          {
            label: "删除",
            method: (index, row) => {
              this.handleDel(index, row);
            },
          },
        ],
      },
      tableData: [
        {
          id: 1,
          registerTime: "2016-05-02",
          title: "王小虎",
          status: 1,
          content: "意见反馈意见反馈意见反馈意见反馈意见反馈意见反馈",
          quality: "查看",
          handleStatus: 1,
        },
        {
          id: 2,
          registerTime: "2016-05-02",
          title: "王小虎",
          status: 2,
          content: "意见反馈意见反馈意见反馈意见反馈意见反馈意见反馈",
          handleStatus: 2,
        },
        {
          id: 3,
          registerTime: "2016-05-02",
          title: "王小虎",
          status: 3,
          content: "意见反馈意见反馈意见反馈意见反馈意见反馈意见反馈",
          handleStatus: 1,
        },
        {
          id: 4,
          registerTime: "2016-05-02",
          title: "王小虎",
          status: 1,
          content: "意见反馈意见反馈意见反馈意见反馈意见反馈意见反馈",
          handleStatus: 2,
        },
      ],
      isShow: false //上传组件显示与否
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
  methods: {
    handleEdit(index, row) {
      console.log(index, row, "编辑");
    },
    handleDel(index, row) {
      console.log(index, row, "删除");
    },
    edit(row) {
      console.log(row, "自定义编辑");
    },
    remove(id) {
      console.log(id, "自定义删除");
    },
    handleAction(id, type) {
      switch (type) {
        case "enable":
          this.actionType(id, "enable");
          break;
        default:
          this.actionType(id, "disable");
          break;
      }
    },
    actionType(id, type) {
      let status = type === "enable" ? "启用" : "禁用";
      this.$confirm(`是否确定${status}该账号？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log(`${status}${id}`);
          this.$message.success(`${status}成功`);
        })
        .catch(() => {
          this.$message.info(`已取消${status}`);
        });
    },
    handleCurrentChange(val) {
      console.log(`当前${val}页`);
    },
    handleSizeChange(val) {
      console.log(`每页${val}条`);
    },

    // 上传组件
    showUpload() {
      this.isShow = !this.isShow;
    }
  },
  components: {
    tableTemplate,
    upload
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
.operator {
  color: var(--font-checked-color);
  cursor: pointer;
}
</style>