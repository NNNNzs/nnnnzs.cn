<template>
  <div class="content">

    <!--文本框-->
    <div ref="divRef" class="editor" contenteditable @keyup="handleKeyUp" @keydown="handleKeyDown" />

    <!--选项-->

    <sandText v-if="showDialog" :visible="showDialog" :position="position" :query-string="queryString"
      @onPickUser="handlePickUser" @onHide="handleHide" @onShow="handleShow" />

    <el-button type="primary" @click="logA">获取数据</el-button>

    <!-- <el-button ref="btn" type="text" @click="handleIn">@</el-button> -->


  </div>
</template>

<script lang="ts" setup>

import { onMounted, ref } from 'vue';
import { ElButton } from 'element-plus'

import sandText from './sendText.vue'

const userList: any = ref([]) //用户数据列表

const node = ref('')  // 获取到节点

const user = ref('')   // 选中项的内容

const endIndex = ref('')   // 光标最后停留位置

const queryString = ref('')  // 搜索值

const showDialog = ref(false)   // 是否显示弹窗

const regX = /@([^@\s]*)$/

// 0宽字符
const width0Str = '\u200b'

const position = ref({
  x: 0,
  y: 0
})  // 弹窗显示位置

const divRef = ref<HTMLDivElement | null>(null)


// 数组去重

const distinct = (arr: any, key: any) => {

  var newObj: any = {}

  var newArr: any = []

  for (var i = 0; i < arr.length; i++) {

    var item = arr[i]

    if (!newObj[item[key]]) {

      newObj[item[key]] = newArr.push(item)

    }

  }

  return newArr

}

//格式化

const escape2Html = (str: any) => {

  // 格式化

  var arrEntities: any = { lt: '<', gt: '>', nbsp: ' ', amp: '&', quot: '"' }

  return str.replace(/&(lt|gt|nbsp|amp|quot);/gi, function (all: any, t: any) {

    return arrEntities[t]

  })

}

//获取输入的@用户的信息

const logA = () => {

  const text = divRef.value?.innerHTML

  const text2 = escape2Html(text)

  let list: any = []

  for (let index = 0; index < userList.value.length; index++) {

    if (text2.includes(`"id":"${userList.value[index].id}"`)) {

      list.push(userList.value[index])

    }

  }

  list = distinct(list, 'id') //获取到@的id和name

  console.log(divRef.value?.innerText, list)

}




//初始化

onMounted(() => {

  handleIn()

})

//初始化各项数据

const handleIn = async () => {

  // divRef.value.focus()

  document.execCommand('selectAll', false, '')

  let a: any = document.getSelection()

  a.collapseToEnd()

  const node1 = getRangeNode()

  const endIndex1 = getCursorIndex()

  node.value = node1

  endIndex.value = endIndex1

  position.value = await getRangeRect() //需要异步获取

  queryString.value = getAtUser() || ''

  showDialog.value = false

}

// 获取光标位置

const getCursorIndex = () => {

  const selection: any = window.getSelection() //窗口的selection对象，当前用户选择的文本

  return selection.focusOffset // 选择开始处 focusNode 的偏移量

}

// 获取节点

const getRangeNode = () => {

  const selection: any = window.getSelection()

  return selection.focusNode // 选择的结束节点，正在聚焦的节点

}

// 弹窗出现的位置

const getRangeRect = async () => {

  const selection: any = (window).getSelection()

  const range = selection.getRangeAt(0) // 是用于管理选择范围的通用对象

  const rect: any = await range.getClientRects()[0] // 择一些文本并将获得所选文本的范围

  // const rect = range.getBoundingClientRect()

  const LINE_HEIGHT = 30

  if (rect === undefined) { //光标在行首，是undefined

    divRef.value!.innerHTML = width0Str //零字符

    const rect = range.getClientRects()[0]

    // console.log(rect);

    let obj: any = { x: 0, y: 0 }

    return obj

  } else {

    return {

      x: rect.x,

      y: rect.y + LINE_HEIGHT

    }

  }

}

// 是否展示 @  匹配@

const showAt = () => {

  const node = getRangeNode() //获取当前被聚焦的节点

  if (!node || node.nodeType !== Node.TEXT_NODE) return false

  const content = node.textContent || '' //获取节点文本


  const match = regX.exec(content.slice(0, getCursorIndex())) //输入到 当前光标位置 匹配@

  return match && match.length === 2 //返回@符号 一个@长度为2

}

// 获取 @ 用户 @后的数据

const getAtUser = () => {

  const content = getRangeNode().textContent || ''


  const match = regX.exec(content.slice(0, getCursorIndex()))

  if (match && match.length === 2) {

    return match[1]  //@ 后面跟着的字符 光标停留

  }

  return undefined

}

// 创建整个@标签

const createAtButton = (user: any) => {

  const btn = document.createElement('span')

  btn.style.display = 'inline-block'

  btn.dataset.user = JSON.stringify(user)

  btn.className = 'at-button'

  btn.contentEditable = 'false'

  btn.textContent = `@${user.name}`

  btn.style.color = 'blue'

  const wrapper = document.createElement('span')

  wrapper.style.display = 'inline-block'

  wrapper.contentEditable = 'false'

  const spaceElem = document.createElement('span')

  spaceElem.style.whiteSpace = 'pre'

  spaceElem.textContent = width0Str

  spaceElem.contentEditable = 'false'

  const clonedSpaceElem = spaceElem.cloneNode(true)

  wrapper.appendChild(spaceElem)

  wrapper.appendChild(btn)

  wrapper.appendChild(clonedSpaceElem)

  return wrapper

}

const replaceString = (raw: any, replacer: any) => {
  return raw.replace(regX, replacer)
}

// 插入@标签

const replaceAtUser = (user: any) => {

  const node1: any = node.value

  if (node1 && user) {

    const content = node1.textContent || ''

    const endIndex1 = endIndex.value

    const preSlice = replaceString(content.slice(0, endIndex1), '')

    const restSlice = content.slice(endIndex1)

    const parentNode = node1.parentNode

    const nextNode = node1.nextSibling

    const previousTextNode = new Text(preSlice)

    const nextTextNode = new Text(width0Str + restSlice) // 添加 0 宽字符

    const atButton = createAtButton(user) //创建@user标签

    parentNode.removeChild(node1)

    // 插在文本框中

    if (nextNode) {

      parentNode.insertBefore(previousTextNode, nextNode)

      parentNode.insertBefore(atButton, nextNode)

      parentNode.insertBefore(nextTextNode, nextNode)

    } else {

      parentNode.appendChild(previousTextNode)

      parentNode.appendChild(atButton)

      parentNode.appendChild(nextTextNode)

    }

    // 重置光标的位置

    const range = new Range()

    const selection: any = window.getSelection()

    range.setStart(nextTextNode, 0)

    range.setEnd(nextTextNode, 0)

    selection.removeAllRanges()

    selection.addRange(range)

  }

}

// 键盘抬起事件

const handleKeyUp = async () => {

  //匹配@  出现@

  if (showAt()) {

    const node1 = getRangeNode()

    const endIndex1 = getCursorIndex() //获取光标位置

    node.value = node1

    endIndex.value = endIndex1

    position.value = await getRangeRect() //获取坐标需要时间，需要异步获取  

    queryString.value = getAtUser() || ''

    showDialog.value = true

  } else {

    showDialog.value = false

  }

  // 限制长度 为1000 截取

  if (divRef.value!.innerText.length > 1000) {
    divRef.value!.innerText = divRef.value!.innerText.substr(0, 1000)
    // 光标移动到最后
    document.execCommand('selectAll', false, '')
    //将选种网页中的全部内容，也就是全部文本,第二个参数为true，会显示对话框
    let a = document.getSelection()!
    a.collapseToEnd()

  }

}

// 键盘按下事件

const handleKeyDown = (e: any) => {

  //当前@选择被打开

  if (showDialog.value) {

    if (

      e.code === 'ArrowUp' ||

      e.code === 'ArrowDown' ||

      e.code === 'Enter'

    ) {

      // 阻止浏览器默认动作 (页面跳转)

      e.preventDefault()

    }

  }

}

// 插入标签后 隐藏选择框  获取子组件抛出的user

const handlePickUser = (user1: any) => {

  userList.value.push(user1)

  replaceAtUser(user1)

  user.value = user1

  showDialog.value = false

}

// 隐藏选择框

const handleHide = () => {

  showDialog.value = false

}

// 显示选择框

const handleShow = () => {

  showDialog.value = true

}

</script>

<script lang="ts">
export default {
  name: 'NAtInput'
}
</script>


<style scoped lang="less">
.content {

  width: 50%;

  font-family: sans-serif;




  h1 {

    text-align: center;

  }

}




.editor {

  margin: 0 auto;

  width: 100%;

  height: 200px;

  background: #fff;

  border: 1px solid #ccc;

  border-radius: 5px;

  text-align: left;

  padding: 10px;

  overflow: auto;

  line-height: 30px;




  &-focus {

    outline: none;

  }

}
</style>
