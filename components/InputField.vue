<template>
  <input type="text" v-bind:value="modelValue" @input="$emit('update:modelValue', $event.target.value)" placeholder="Enter text" />
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  modelValue: String
});
</script>

<style scoped>
input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
