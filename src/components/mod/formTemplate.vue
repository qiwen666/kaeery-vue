<template>
  <el-form :label-position="labelPosition">
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
        :placeholder="item.placeholder"
        :style="{ width: item.width }"
        type="text"
        autocomplete="off"
      ></el-input>

      <!-- textarea -->
      <el-input
        v-if="item.type === 'textarea'"
        :placeholder="item.placeholder"
        :style="{ width: item.width }"
        type="textarea"
      ></el-input>

      <!-- select -->
      <el-select
        v-if="item.type === 'select'"
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
      <el-checkbox-group v-if="item.type === 'checkbox'" v-model="item.model">
        <el-checkbox
          v-for="checkbox_item in item.options"
          :label="checkbox_item.value"
          :key="checkbox_item.value"
          >{{ checkbox_item.label }}</el-checkbox
        >
      </el-checkbox-group>

      <!-- radio -->
      <el-radio-group v-if="item.type === 'radio'">
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
        type="date"
        :placeholder="item.placeholder"
      ></el-date-picker>

      <!-- switch -->
      <el-switch v-if="item.type === 'switch'"></el-switch>

      <!-- slot -->
      <slot v-if="item.type === 'slot'" :name="item.slotName"></slot>
    </el-form-item>

    <!-- 按钮 -->
    <el-form-item :label-width="formHandler.labelWidth" :style="{textAlign: 'left'}">
      <el-button
        v-for="handle_item in formHandler.options"
        :key="handle_item.label"
        :type="handle_item.type"
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
};
</script>

<style>
</style>