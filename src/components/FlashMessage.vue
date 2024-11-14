<!-- src/components/FlashMessage.vue -->

<template>
  <div class="flash-message" v-if="message">
    <p>{{ message }}</p>
    <button @click="$emit('close')">Close</button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  message: string
}>();

defineEmits(['close']);
</script>

<style scoped>
.flash-message {
  background-color: #86b9e2;
  border: 1px solid #a0d3f1;
  color: #155724;
  padding: 10px;
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.flash-message p {
  margin: 0;
}
</style>
