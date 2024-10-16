<script setup lang="ts">
import type { Organizer } from '@/types';  // Import the Organizer type

const modelValue = defineModel();  // Define v-model for two-way binding

// Define props for the component
interface BaseSelectProps {
  label: string;   // Label for the select input
  options: Organizer[];  // List of organizers to populate the dropdown
}

const props = withDefaults(defineProps<BaseSelectProps>(), {
  label: '',  // Default label is an empty string
});
</script>

<template>
  <!-- Only show the label if it's provided -->
  <label v-if="label">
    {{ props.label }}
  </label>

  <!-- Select dropdown bound to v-model -->
  <select class="mb-6" v-bind="$attrs" v-model="modelValue">
    <option
      v-for="option in props.options"
      :key="option.id"
      :value="option.id"
      :selected="option.id === modelValue"
    >
      {{ option.name }}
    </option>
  </select>
</template>