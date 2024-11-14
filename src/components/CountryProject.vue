<script setup lang="ts">
import { defineProps, type PropType } from 'vue';
import type { CountryProject } from '@/types'

// 定义 props 接收父组件传递的数据 CountryProject数组
const props = defineProps({
  projects: Array as () => CountryProject[],
  total: Number,
  currentPage: Number,
  pageSize: Number,
  fetchData: {
    type: Function as PropType<(pageSize: number, currentPage: number) => void>,
    required: true
  }
});

const columns = [
  {
    title: '项目名称',
    dataIndex: 'projectName',
    align: 'center',
  },
  {
    title: '金牌',
    dataIndex: 'gold',
    align: 'center',
  },
  {
    title: '银牌',
    dataIndex: 'silver',
    align: 'center',
  },
  {
    title: '铜牌',
    dataIndex: 'bronze',
    align: 'center',
  },
];

const handleTableChange = (pag: { pageSize: number; current: number }) => {
  // 直接调用父组件传入的 fetchData
  props.fetchData(pag.pageSize, pag.current);
}

</script>

<template>
  <a-table
    :columns="columns"
    :data-source="props.projects"
    bordered
    :pagination="{ current: props.currentPage, pageSize: props.pageSize, total: props.total }"
    @change="handleTableChange"
  >
    <template #title>
      <div class="table-title">获奖项目</div>
    </template>
  </a-table>
</template>

<style scoped>
:deep(.ant-table-title) {
  background-color: peachpuff;  /* 浅灰色 */
  padding: 12px 16px;
  font-weight: 500;
}

/* 如果你想让标题文字居中 */
.table-title {
  text-align: center;
}
</style>
