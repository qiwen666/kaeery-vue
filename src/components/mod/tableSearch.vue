<template>
  <el-form :inline="true" :model="form_data" class="form_search_inline">
    <el-form-item
      v-for="item in searchItem"
      :key="item.label"
      :label="item.label || ''"
    >
      <!-- input -->
      <el-input
        v-if="item.type === 'input'"
        v-model="form_data[item.prop]"
        @change="getKeyword"
        :placeholder="item.placeholder"
        :style="{ width: item.width }"
      ></el-input>
      <!-- select -->
      <el-select
        v-if="item.type === 'select'"
        v-model="form_data[item.prop]"
        @change="toggleSelect"
        placeholder="请选择"
        :style="{ width: item.width }"
      >
        <el-option
          v-for="item in item.options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <!-- date -->
      <el-date-picker
        v-if="item.type === 'date'"
        :style="{ width: item.width }"
        v-model="form_data[item.prop]"
        @change="getDate"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="timestamp"
      >
      </el-date-picker>
      <!--自定义  -->
      <slot v-if="item.type === 'slot'" :name="item.name"></slot>
    </el-form-item>
    <!-- 按钮 -->
    <el-form-item>
      <template v-for="item in searchHandler">
        <el-button
          v-if="item.element === 'button'"
          :type="item.type || 'primary'"
          @click="item.handler && item.handler()"
          :key="item.label">{{ item.label }}</el-button>
      </template>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    searchItem: {
      type: Array,
      default: () => {
        return [];
      },
    },
    searchHandler: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      form_data: {},
    };
  },
  created() {
    console.log(this.searchHandler);
  },
  methods: {
    initFormData() {
      this.searchItem.forEach((item) => {
        if (item.type === "select") {
          this.selectOptions(item);
        }
      });
    },
    /**下拉选项 */
    selectOptions(data) {
      const options = this.$store.state.config[data.options];
      if (options) {
        data.options = options;
      }
    },
    /**初始化v-model值 */
    initFields() {
      const field = {};
      this.searchItem.forEach((item) => {
        if (item.prop) {
          field[item.prop] = "";
        }
      });
      this.form_data = field;
    },
    toggleSelect(options) {
      this.$emit("callbackSelect", options);
    },
    getDate(date) {
      let range = {};
      if (!date) {
        range = {
          startTime: "",
          endTime: "",
        };
      } else {
        range = JSON.parse(`{"startTime": ${date[0]},"endTime": ${date[1]}}`);
      }
      this.$emit("callbackDate", range);
    },
    getKeyword(val) {
      this.$emit("callbackKeyword", val);
    },
  },
  watch: {
    searchItem: {
      handler(newVal) {
        this.initFormData();
        this.initFields();
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss">
</style>