<template>
  <div class="w-screen h-screen bg-slate-100 overflow-auto">
    <CellGroup inset>
      <Cell
        title="当前状态"
        :value="disabled ? '已屏蔽' : '未屏蔽'"
      ></Cell>
      <Cell v-for="item in list" title="屏蔽信息" :value="item[0]"></Cell>
      <Cell>
        <Button type="primary" @click="show = true">添加禁用</Button>
      </Cell>
    </CellGroup>
    <Popup v-model:show="show" position="bottom">
      <PickerGroup
        title="开始时间"
        :tabs="['开始日期', '开始时间', '结束日期', '结束时间']"
        next-step-text="下一步"
        @confirm="onConfirm"
        @cancel="onCancel"
        v-model:active-tab="activeTab"
      >
        <DatePicker v-model="startDate" :min-date="new Date()" />
        <TimePicker v-model="startTime"></TimePicker>
        <DatePicker v-model="endDate" :min-date="new Date()" />
        <TimePicker v-model="endTime"></TimePicker>
      </PickerGroup>
    </Popup>
  </div>
</template>

<script setup lang="ts">
import "vant/lib/index.css"
import dayjs from "dayjs"
import {
  Cell,
  CellGroup,
  Popup,
  DatePicker,
  TimePicker,
  PickerGroup,
  Picker,
  Button
} from "vant"
const disabled = ref(false)
const list = ref<string[][]>([])

interface DetailRes {
  list: any[]
  disabled: boolean
}
interface SendDto {
  startTime?: string
  endTime?: string
  userId?: string
}

const show = ref(false)

const startDate = ref(dayjs().format("YYYY-MM-DD").split("-"))
const startTime = ref(dayjs().format("HH-mm").split("-"))

const endDate = ref(dayjs().format("YYYY-MM-DD").split("-"))
const endTime = ref(dayjs().add(1, "hour").format("HH-mm").split("-"))

const getDetail = () => {
  $fetch(clientUrl + "/msg/isMute", { method: "post" }).then((res) => {
    const r = res as DetailRes
    disabled.value = r.disabled
    list.value = r.list
  })
}
const reset = () => {
  startDate.value = dayjs().format("YYYY-MM-DD").split("-")
  startTime.value = dayjs().format("HH-mm").split("-")

  endDate.value = dayjs().format("YYYY-MM-DD").split("-")
  endTime.value = dayjs().add(1, "hour").format("HH-mm").split("-")
  activeTab.value = 0
}
const sendBody = reactive<SendDto>({
  startTime: "",
  endTime: ""
})
const activeTab = ref(0)
const setMute = () => {
  sendBody.startTime =
    startDate.value.join("-") + " " + startTime.value.join(":")

  sendBody.endTime =
    endDate.value.join("-") + " " + endTime.value.join(":")

  $fetch(clientUrl + "/msg/mute", { method: "post", body: sendBody }).then(
    (res) => {
      show.value = false
      getDetail()
      reset()
    }
  )
}
const onConfirm = () => {
  setMute()
}
const onCancel = () => {
  show.value = false
}

onMounted(() => {
  getDetail()
})
</script>

<style scoped></style>
