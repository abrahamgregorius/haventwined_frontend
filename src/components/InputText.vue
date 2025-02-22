<script setup>
    defineProps({
        labelTitle: String,
        type: String,
        defaultValue: String,
        placeholder: String,
    })
</script>

<template>
  <div class="form-control w-full ${containerStyle">
    <label class="label">
      <span class="label-text text-base-content">{{ labelTitle }}</span>
    </label>
    <input
      :type="type || 'text'"
      :value="defaultValue || ''"
      :placeholder="placeholder || ''"
      class="input input-bordered w-full"
    />
  </div>
</template>
