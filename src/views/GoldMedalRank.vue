<script setup lang="ts">
import type { CountryCommentVO, CountryGold } from '@/types'
import CountryGoldService from '@/services/CountryGoldService'
import { ref, onMounted } from 'vue'
import router from '@/router'
import { useCountryCommentsStore } from '@/stores/countryComment'
import TextMarquee from '@/components/TextMarquee.vue'

const countryCommentsStore = useCountryCommentsStore()

// 当前页，和页码大小
const currentPage = ref(1)
const pageSize = ref(6)
const total = ref(0)
const showData = ref<CountryGold[]>([])
const countryMap = ref(new Map<string, CountryGold>())

// 获取分页数据
const fetchData = async () => {
  const resp = await CountryGoldService.getPage(
    pageSize.value,
    currentPage.value,
  )
  showData.value = resp.data

  // 如果还没有获取过总条数，则获取
  if (total.value === 0) {
    const totalResp = await CountryGoldService.getTotal()
    total.value = totalResp.data.length
    totalResp.data.forEach((item: CountryGold) => {
      countryMap.value.set(item.id.toString(), item)
    })
  }
  const allCountryComments = countryCommentsStore.getAllCountryComments
  comments.value = []
  allCountryComments.forEach((item: { id: number; comments: string[] }) => {
    const country = countryMap.value.get(item.id.toString()) as CountryGold
    if (country && item.comments) {
      item.comments.forEach((comment: string) => {
        comments.value.push({
          countryName: country.country,
          comment,
          color: country.color,
        })
      })
    }
  })
}

// 监听页码变化
const handlePageChange = (page: number) => {
  currentPage.value = page
  fetchData()
}

const comments = ref<CountryCommentVO[]>([])
onMounted(() => {
  fetchData()
})

function goDetail(id: number) {
  router.push({ name: 'country-detail', query: { id: id.toString() } })
}

const pageSizeChange = () => {

  if(!pageSize.value || (currentPage.value * pageSize.value > total.value)) {
    currentPage.value = 1
  }
  fetchData();
}

</script>

<template>
  <div>
    <a-flex gap="middle" vertical>
      <div style="width: 60vw; margin: 0 auto; display: flex; justify-content: center; align-items: center">
        <img src="@/assets/come.gif" width="200px" />
        <TextMarquee :texts="comments" :height="150" :speed="1">
          <template #default="{ text }">
            <a-tag :color="text.color">{{ text.countryName }}</a-tag>
            {{ text.comment }}
          </template>
        </TextMarquee>
        <img width="300px" src="@/assets/logo.webp" />
      </div>
      <a-flex wrap="wrap" class="card-bar" gap="small">
        <!--        <div class="card-bar" >-->
        <a-card
          v-for="item in showData"
          :key="item.id"
          style="width: 300px"
          :headStyle="{ backgroundColor: item.color }"
        >
          <template v-slot:title>
            <div @click="goDetail(item.id)" class="title-class">
              {{ item.country }}
            </div>
          </template>
          <p>金牌：{{ item.gold }}</p>
          <p>银牌：{{ item.silver }}</p>
          <p>铜牌：{{ item.bronze }}</p>
        </a-card>
        <!--        </div>-->
      </a-flex>
    </a-flex>
    <div class="footer">
      <a-flex style="width: 60vw; margin: 30px auto" justify="start">
        <a-pagination
          v-model:current="currentPage"
          :total="total"
          :pageSize="pageSize"
          @change="handlePageChange"
          show-less-items
        />
        <div style="display: flex; align-items: center; margin-left: 50px">
          <a-input-number
            id="inputNumber"
            v-model:value="pageSize"
            :min="1"
            :max="total"
            @change="pageSizeChange"
          />
          当前页面展示数量
        </div>
      </a-flex>
    </div>
  </div>
</template>

<style scoped>
:deep(.ant-card-head) {
  background-color: #f0f2f5;
}

.card-bar,
footer {
  width: 60vw;
  margin: 0 auto;
}

.title-class {
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
}
</style>
