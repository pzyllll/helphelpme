<script setup lang="ts">
import CountryDesc from '@/components/CountryDesc.vue'
import CountryProject from '@/components/CountryProject.vue'
import { useRoute } from 'vue-router'
import CountryGoldService from '@/services/CountryGoldService'
import { ref } from 'vue'
import CountryComment from '@/components/CountryComment.vue'

// 使用 useRoute 获取当前路由对象
const route = useRoute()

// 从路由对象中获取国家 ID
const countryId = parseInt(route.query.id as string, 10)

const detail = ref({
  country: '',
  desc: '',
  gold: 0,
  silver: 0,
  bronze: 0,
})

const projects = ref([])
const currentPage = ref(1)
const pageSize = ref(5)
const total = ref(0)

CountryGoldService.getDetail(countryId).then(resp => {
  detail.value = resp.data
})

const fetchData = async (pageSizeParam: number, currentPageParam: number) => {
  const resp = await CountryGoldService.getProjects(
    countryId,
    pageSizeParam,
    currentPageParam,
  )
  projects.value = resp.data
  total.value = resp.total
  pageSize.value = pageSizeParam
  currentPage.value = currentPageParam
}

fetchData(pageSize.value, currentPage.value)
</script>

<template>
  <div class="container">
    <a-button @click="$router.go(-1)">回到首页</a-button>
    <country-desc
      :title="detail.country"
      :desc="detail.desc"
      :gold-medals="detail.gold"
      :bronze-medals="detail.bronze"
      :silver-medals="detail.silver"
    />
      <country-project
        :projects="projects"
        :total="total"
        :currentPage="currentPage"
        :fetchData="fetchData"
        :pageSize="pageSize"
      />
      <country-comment :countryId="countryId" />
  </div>
</template>

<style scoped>
.container{
  width: 60vw;
  margin: 0 auto;
}
</style>
