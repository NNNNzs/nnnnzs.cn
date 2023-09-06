<template>
  <div class="wrapper" :style="{
    position: 'fixed',
    top: position.y + 'px',
    left: position.x + 'px'
  }">
    <div v-if="!mockList.length" class="empty">无搜索结果</div>

    <div v-for="(item, i) in mockList" :key="item.id" ref="usersRef" class="item" :class="{ active: i === index }"
      @click="clickAt($event, item)" @mouseenter="hoverAt(i)">
      <div class="name">{{ item.name }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref, watch } from "vue"

//选项数据源

const mockData = [
  { name: "文本语言", id: "HTML" },
  { name: "CSS", id: "CSS" },
  { name: "Java", id: "Java" },
  { name: "JavaScript", id: "JavaScript" },
  { name: "php", id: "php" },
  { name: "python", id: "python" }
]

const props = defineProps({
  //是否展示
  visible: {
    type: Boolean,
    default: true
  },

  //搜索关键字
  queryString: {
    type: String,
    default: ""
  },

  //展示的位置

  position: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

//监听父组件传入搜索值的变化
const users = ref([])
const index = ref(-1) //控制文本的下标
// const mockList: any = ref(mockData);

const mockList = computed(() => {
  if (props.queryString) {
    return mockData.filter(({ name }) => name.includes(props.queryString))
  } else {
    return mockData.slice(0)
  }
})

const emit = defineEmits(["onHide", "onPickUser"])

//鼠标悬浮选择下标

const hoverAt = (i: any) => {
  index.value = i
}

//上下选择文本

const keyDownHandler = (e: any) => {
  if (e.code === "Escape") {
    emit("onHide")

    return
  }

  // 键盘按下 => ↓

  if (e.code === "ArrowDown") {
    if (index.value >= mockList.value.length - 1) {
      index.value = 0
    } else {
      index.value = index.value + 1
    }
  }

  // 键盘按下 => ↑

  if (e.code === "ArrowUp") {
    if (index.value <= 0) {
      index.value = mockList.value.length - 1
    } else {
      index.value = index.value - 1
    }
  }

  // 键盘按下 => 回车

  if (e.code === "Enter") {
    if (mockList.value.length) {
      const user = {
        name: mockList.value[index.value].name,

        id: mockList.value[index.value].id
      }

      emit("onPickUser", user)

      index.value = -1
    }
  }
}

//将选中的user抛出给父组件

const clickAt = (e: any, item: any) => {
  const user = {
    name: item.name,
    id: item.id
  }
  emit("onPickUser", user)
  index.value = -1
}

//页面挂载

onMounted(() => {
  document.addEventListener("keyup", keyDownHandler)
})

//页面销毁

onUnmounted(() => {
  document.removeEventListener("keyup", keyDownHandler)
})
</script>

<style scoped lang="less">
.wrapper {
  width: 238px;

  border: 1px solid #e4e7ed;

  border-radius: 4px;

  background-color: #fff;

  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);

  box-sizing: border-box;

  padding: 6px 0;

  z-index: 100;
}

.empty {
  font-size: 14px;
  padding: 0 20px;
  color: #999;
}

.item {
  font-size: 14px;
  padding: 0 20px;
  line-height: 34px;
  cursor: pointer;
  color: #606266;

  &.active {
    background: #f5f7fa;

    color: blue;

    .id {
      color: blue;
    }
  }

  &:first-child {
    border-radius: 5px 5px 0 0;
  }

  &:last-child {
    border-radius: 0 0 5px 5px;
  }

  .id {
    font-size: 12px;

    color: rgb(83, 81, 81);
  }
}
</style>
