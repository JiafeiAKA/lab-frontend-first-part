<script setup lang="ts">
import { ref, watch } from 'vue'

interface BaseInputProps {
  label: string
  modelValue: string | number // ใช้สำหรับรับค่า modelValue จาก parent
}

// ใช้ withDefaults เพื่อกำหนดค่าเริ่มต้นให้กับ label
const props = withDefaults(defineProps<BaseInputProps>(), {
  label: ''
})

// กำหนด emits เพื่อให้สามารถ emit ค่า modelValue กลับไปยัง parent ได้
const emit = defineEmits(['update:modelValue'])

// Local value เพื่อ sync กับ modelValue ที่ได้รับจาก props
const localValue = ref(props.modelValue)

// Watch เพื่อ sync ค่า modelValue จาก parent มายัง localValue
watch(() => props.modelValue, (newValue) => {
  localValue.value = newValue
})

// เมื่อ localValue มีการเปลี่ยนแปลง ก็ emit ค่าใหม่กลับไปยัง parent
watch(localValue, (newValue) => {
  emit('update:modelValue', newValue)
})
</script>

<template>
  <label v-if="props.label">
    {{ props.label }}
  </label>
  <input
    class="mb-6"
    v-bind="$attrs"
    v-model="localValue"
  :placeholder="props.label"
  />
</template>

<style scoped>
/* คุณสามารถใส่ styles ที่ต้องการได้ */
</style>