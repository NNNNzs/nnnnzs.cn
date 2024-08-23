<template>
  <div class="w-full h-full overflow-y-auto pl-8">
    <div class="w-20 text-left mb-1 text-small" v-for="item in timeList">
      <!-- <span >{{ item.date }}</span> -->
      <span v-if="item.year || item.month">{{ item.date }}</span>
      <span v-else>-</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs"
// 一年的第一天
const start = ref(dayjs().subtract(1, "year").startOf("year"))
// 一年的最后一天
const end = ref(dayjs().subtract(1, "year").endOf("year"))

// 每一天的日期放到数组里
const timeList = computed(() => {
  const list = []
  const startDay = dayjs(start.value)
  const endDay = dayjs(end.value)

  const dates = dayjs(end.value).diff(dayjs(start.value), "day")

  for (let i = 0; i < dates; i++) {
    const currentDay = startDay.add(i, "day")
    // 判断是否是一年的第一天
    const isFirstOfYear = currentDay.date() === 1
    // 判断是否是每个月的第一天
    const isFirstOfMonth = currentDay.month() === 0
    if (isFirstOfYear) {
      list.push({
        year: true,
        date: currentDay.format("YYYY") + ""
      })
    }
    if (isFirstOfMonth) {
      list.push({
        month: true,
        date: currentDay.format("MM") + ""
      })
    }
    list.push({
      date: currentDay.format("DD")
    })
  }
  return list
})
</script>

<style scoped></style>
