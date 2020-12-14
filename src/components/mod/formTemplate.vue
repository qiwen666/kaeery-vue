<template>
  <el-form :model="formData" ref="form" :label-position="labelPosition">
    <el-form-item
      v-for="item in formItem"
      :key="item.prop"
      :label="item.label"
      :label-width="item.labelWidth"
      :prop="item.prop"
    >
      <!-- input -->
      <el-input
        v-if="item.type === 'text'"
        v-model="formData[item.prop]"
        :placeholder="item.placeholder"
        :style="{ width: item.width }"
        type="text"
        autocomplete="off"
      ></el-input>

      <!-- textarea -->
      <el-input
        v-if="item.type === 'textarea'"
        v-model="formData[item.prop]"
        :placeholder="item.placeholder"
        :style="{ width: item.width }"
        type="textarea"
      ></el-input>

      <!-- select -->
      <el-select
        v-if="item.type === 'select'"
        v-model="formData[item.prop]"
        :placeholder="item.placeholder"
        :style="{ width: item.width }"
      >
        <el-option
          v-for="select_item in item.options"
          :key="select_item.label"
          :label="select_item.label"
          :value="select_item.value"
        ></el-option>
      </el-select>

      <!-- checkbox -->
      <el-checkbox-group v-if="item.type === 'checkbox'" v-model="formData[item.prop]">
        <el-checkbox
          v-for="checkbox_item in item.options"
          :label="checkbox_item.value"
          :key="checkbox_item.value"
          >{{ checkbox_item.label }}</el-checkbox
        >
      </el-checkbox-group>

      <!-- radio -->
      <el-radio-group v-if="item.type === 'radio'" v-model="formData[item.prop]">
        <el-radio
          v-for="radio_item in item.options"
          :key="radio_item.label"
          :label="radio_item.value"
          >{{ radio_item.label }}</el-radio
        >
      </el-radio-group>

      <!-- date -->
      <el-date-picker
        v-if="item.type === 'date'"
        v-model="formData[item.prop]"
        type="date"
        :placeholder="item.placeholder"
      ></el-date-picker>

      <!-- switch -->
      <el-switch v-if="item.type === 'switch'" v-model="formData[item.prop]"></el-switch>

      <!-- slot -->
      <slot v-if="item.type === 'slot'" :name="item.slotName"></slot>
    </el-form-item>

    <!-- 按钮 -->
    <el-form-item
      :label-width="formHandler.labelWidth"
      :style="{ textAlign: 'left' }"
    >
      <el-button
        v-for="handle_item in formHandler.options"
        :key="handle_item.label"
        :type="handle_item.type"
        @click="handle_item.handler && handle_item.handler(formData)"
        >{{ handle_item.label }}</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    formItem: {
      type: Array,
      default: () => [],
    },
    formData: {
      type: Object,
      default: () => {}
    },
    formHandler: {
      type: Object,
      default: () => {},
    },
    labelPosition: {
      type: String,
      default: "Left",
    },
  },
  data() {
    return {
    };
  },
  methods: {
    initData() {
      
      // const formData = {};
      this.formItem.forEach((item) => {
        if(item.validator) {
          item.rules = item.validator;
        }
      //   if (item.prop) {
      //     // 对象添加属性 var obj = {}; obj.a = 'xxx';
      //     formData[item.prop] = item.value || null
      //   }
      });
      // this.form = formData;
    },
  },
  watch: {
    formItem: {
      handler(val) {
        this.initData();
      },
      immediate: true,
    },
  },
};
</script>

<style>
</style>