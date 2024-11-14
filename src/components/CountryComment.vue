<script setup lang="ts">
import { defineProps, ref } from 'vue'
import { useCountryCommentsStore } from '@/stores/countryComment'

// 定义 props 接收父组件传递的数据 CountryProject数组
const props = defineProps({
  countryId: Number,
})

const countryCommentsStore = useCountryCommentsStore()
const comments = ref([])
const comment = ref('')
comments.value = countryCommentsStore.getCountryComments(props.countryId)

const pushComment = () => {
  if (!comment.value || comment.value.trim() === '') {
    return
  }
  countryCommentsStore.addCountryComment(props.countryId, comment.value)
  comments.value = countryCommentsStore.getCountryComments(props.countryId)
  comment.value = ''
}
</script>

<template>
  <div>
    <a-list bordered :data-source="comments">
      <template #renderItem="{ item }">
        <a-list-item>{{ item }}</a-list-item>
      </template>
      <template #header>
        <div>评论列表</div>
      </template>
    </a-list>
    <a-space style="display: flex; justify-content: flex-end; margin-top: 30px">
      <a-input v-model:value="comment" />
      <a-button type="primary"  @click="pushComment">发表评论</a-button>
    </a-space>
  </div>
</template>

<style scoped>
:deep(.ant-list-header) {
  background-color: #769cf4;
  padding: 12px 16px;
  font-weight: 500;
}
</style>
