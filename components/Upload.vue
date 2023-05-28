<template>
  <ClientOnly>
    <div id="upload" class="w-full h-full flex justify-center items-center relative">
      <ElUpload action="." multiple ref="upload" @mouseenter="handleFocus" :disabled="showLoading"
        :http-request="customRequest" :show-file-list="false">
        <ElButton v-if="!showLoading" size="large" type="primary">上传</ElButton>
        <ElProgress v-else type="circle" :percentage="uploadText"></ElProgress>
      </ElUpload>

      <div class="absolute right-0 top-0 bottom-0">
        <ElIcon :size="40">
          <ArrowLeft @click="showLocal" @mouseenter="showLocal"></ArrowLeft>
        </ElIcon>
      </div>


      <ElDrawer v-model="showDrawer" :width="500" :show-close="false" title="上传列表">
        <template #header="{ close, titleId, titleClass }">
          <ElInput v-model="searchKey"></ElInput>
        </template>
        <ul v-if="rencetUploadList.length > 0" bordered :class="{ done }">
          <ElCard class="mt-4" v-for="(item, index) in filterList" :key="item.addTime">
            <template #header>
              <div class="flex justify-between">
                <span>{{ item.fileName }}</span>
                <ElButton text @click="handleRemove(item)" :icon="Close"></ElButton>
              </div>
            </template>
            <ElForm label-width="80" @submit.prevent>
              <ElFormItem label="添加时间:">{{ dayjs(item.addTime).format('YYYY-MM-DD HH:mm:ss') }}</ElFormItem>
              <ElFormItem v-if="item.fileName" label="文件名:">{{ item.fileName }}</ElFormItem>
              <ElFormItem label="别名:">
                <ElInput v-if="currentEditId === item.addTime && currentEdit" v-model="currentEdit.alisa"
                  @keydown="handleAlisaKeydown($event as KeyboardEvent, item, index)" />
                <span @dblclick="handleEditAlisa(item, $event)" v-else class="block w-full min-w-[20px] h-full">{{
                  item.alisa
                }}</span>
              </ElFormItem>
              <ElFormItem label="文件类型:">
                <span @click="doCopy(item.mime)">
                  {{ item.mime }}
                </span>
              </ElFormItem>
              <ElFormItem label="链接:">
                <ElLink target="_blank" :download="item.fileName" :href="item.url" class=" break-words">
                  {{ item.url }}
                </ElLink>
                <!-- <a >{{}}</a> -->
              </ElFormItem>
              <ElFormItem label="状态:">
                <span>{{ item.status }}</span>
                <span v-if="item.status === '同步中'" @click="fileExis(item)">检查</span>
              </ElFormItem>
              <ElFormItem label="进度:" v-if="item.status === '上传中'">
                {{ item.progress }}
              </ElFormItem>
              <ElFormItem label="上传时间:">
                {{ dayjs(item.finishTime).format('YYYY-MM-DD HH:mm:ss') }}
              </ElFormItem>
            </ElForm>
          </ElCard>
        </ul>
        <ElResult v-else icon="error" title="404 资源不存在" sub-title="生活总归带点荒谬"></ElResult>
      </ElDrawer>
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>
import axios, { AxiosResponse } from "axios";
import RecentUpload, { UploadInfo } from "~/composables/RecentUpload"
import { Close, ArrowLeft } from '@element-plus/icons-vue'
import dayjs from "dayjs";
import { upload } from '@/api/fs'
import ConfirmImage from "@/components/ConfirmImage.vue"
import { ElMessage, ElLink, ElProgress, ElDrawer, ElCard, ElResult, ElInput, ElUpload, ElButton, ElMessageBox, UploadRequestOptions, ElDialog, ElIcon, ElForm, ElFormItem } from 'element-plus'
const recentUpload = new RecentUpload();
const rencetUploadList = ref<UploadInfo[]>([])
const searchKey = ref('');
const filterList = computed(() => {
  if (!searchKey.value.trim()) {
    return rencetUploadList.value
  }
  const keys: (keyof UploadInfo)[] = ['fileName', 'alisa', 'mime'];
  return rencetUploadList.value.filter(row => keys.some(k => row[k]?.toString().includes(searchKey.value)))
})

useHead({
  link: [
    {
      rel: "stylesheet",
      href: "/css/element-plus.css"
    }
  ]
})


onMounted(() => {
  rencetUploadList.value = recentUpload.list.value;
});

const showLocal = () => {
  showDrawer.value = !showDrawer.value;
};

const done = ref(false);

const flashCurrent = () => {
  showLocal();
  done.value = true;
  setTimeout(() => {
    done.value = false;
  }, 3000);
};

// 1. 上传之后 复制上传之后的链接
// 2. 将外链转换成自己的
// 3. 大文件分片上传
// 4. 进度条
// 5. 监听剪贴板粘贴图片可以上传
const base64 = ref<string | null>("");
const imgSrc = ref();
const hasDialog = ref(false);
const showDrawer = ref(false);
const showLoading = ref(false);
const uploadText = ref<number>(0);


const { copy } = useClipboard()

const confirmImgRender = (text: string) => {
  return h(ConfirmImage, {
    text: text
  })
}

const renderImg = (src: string) => {
  return h("img", {
    class: "preview",
    src: src,
  })
}

/**
 *
 * @param text
 * @description 是否允许外链转换功能
 */
const canTransForm = (text: string) => {
  const imgList = [".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"];
  return (
    text.startsWith("http") &&
    !text.includes("static.nnnnzs.cn") &&
    imgList.some((ext) => text.includes(ext))
  );
};

const doCopy = (str: string) => {
  copy(str);
  hasDialog.value = false;
  flashCurrent();
  ElMessage("上传成功，成功复制到剪贴板" + str);
};

const focused = useWindowFocus()

const handleFocus = () => {
  if (!focused.value) {
    return
  }
  navigator.clipboard
    .read()
    .then((clipboardItems) => {
      clipboardItems.forEach(async (clipboardItem) => {
        for (const type of clipboardItem.types) {
          const blob = await clipboardItem.getType(type);

          const isImg = type.includes("image");
          const isText = type.includes("text");
          console.log('type', type)
          console.log('isImg', type)
          if (isImg) {

            if (hasDialog.value) {
              return false;
            }

            const src = URL.createObjectURL(blob);
            imgSrc.value = src;

            hasDialog.value = true;
            const imgVnode = renderImg(src)
            ElMessageBox.confirm(
              imgVnode,
              "检测到剪贴板有图片，是否上传"
            )
              .then(res => {
                handleUpload(blob).then((url) => {
                  hasDialog.value = false;
                })
              }).catch(_ => {
                hasDialog.value = false;
              })
          }

          if (isText) {
            const text = await navigator.clipboard.readText();
            console.log('text', text)
            if (!canTransForm(text) || hasDialog.value) {
              return
            }
            hasDialog.value = true;
            ElMessageBox.confirm(
              confirmImgRender(text),
              '检测到剪贴板有图片外链',
            ).then(_ => {
              transformImage(text).then((res) => {
                doCopy(res);
              });
            }).catch(_ => {
              hasDialog.value = false;
            })
          }
        }
      });
    })
    .catch((err) => {
      // 不支持的文件类型
      console.warn("clipboard", err);
    });
};

const hanlePaste = (e: any) => {
  let cbd = e.clipboardData;
  if (!(e.clipboardData && e.clipboardData.items)) {
    return;
  }

  for (var i = 0; i < cbd.items.length; i++) {
    var item = cbd.items[i];
    if (item.kind == "file") {
      var blob = item.getAsFile();
      if (blob.size === 0) {
        return;
      }
      if (blob.type.includes("image")) {
        var reader = new FileReader(); //新建一个FileReader
        reader.readAsDataURL(blob); //读取文件,保存为base64 格式
        reader.onload = function (evt) {
          if (evt.target && typeof evt.target.result === "string") {
            base64.value = evt.target.result;
          }
        };
      }
      handleUpload(blob);
    }
  }
};

const handleRemove = (item: UploadInfo) => {
  recentUpload.remove(item);
};
onMounted(() => {
  window.addEventListener("focus", handleFocus);
  window.addEventListener("paste", hanlePaste);
});

onUnmounted(() => {
  window.removeEventListener("focus", handleFocus);
  window.removeEventListener("paste", hanlePaste);
});

let currentEditBak = ref(null);
const currentEdit = ref<UploadInfo>({
  addTime: 0,
  finishTime: 0,
  alisa: "",
  url: "",
  mime: "",
  origin: "剪贴板",
  status: "上传中",
  fileName: "",
});
const currentEditId = ref<number | Date | null>(null);

const handleEditAlisa = (item: UploadInfo, event: MouseEvent) => {
  console.log("event", event);
  currentEdit.value = item as UploadInfo;
  currentEditId.value = item.addTime;
  currentEditBak.value = JSON.parse(JSON.stringify(item));
};


const handleAlisaKeydown = (event: KeyboardEvent, item: UploadInfo, index: number) => {
  const { code } = event;
  console.log('code', code);
  // 保存
  if (['NumpadEnter', 'Enter'].includes(code)) {
    const { value } = currentEdit;
    item = JSON.parse(JSON.stringify(value));
    currentEditId.value = null;
  }
  // 退出还原
  if (code === "Escape") {
    if (currentEditBak.value) {
      rencetUploadList.value[index] = currentEditBak.value;
    }
    currentEditId.value = null;
    event.preventDefault();
    event.stopPropagation();
  }
};


/**
 *
 * @param blob
 * @description 通过后端接口上传的cos
 */
const handleUpload = async (file: Blob | File) => {
  console.log('file', file)
  const formData = new FormData();
  formData.append("inputFile", file);
  const { type, name } = file;

  const addTime = new Date().getTime();
  showLoading.value = true;

  const res = await axios({
    url: baseUrl + "/upload",
    method: "post",
    onUploadProgress(e) {
      uploadText.value = Number(e.progress) * 100 
    },
    data: formData
  });

  if (res.data.data) {
    const url = res.data.data;
    recentUpload.add({
      addTime,
      alisa: "",
      url,
      mime: type || "",
      origin: "主动上传",
      fileName: name,
    });
    doCopy(url);
  }
  showLoading.value = false;
  return res.data.data;
};

const customRequest = async (opt: UploadRequestOptions) => {
  const { file } = opt;
  handleUpload(file)
};

/**
 *
 * @param url url
 * @description 图片转换，通过后端下载图片，上传到cos，再返回给前端
 * 该接口暂未实现
 */
const transformImage = async (url: string) => {
  return await $fetch('/api/fs/dupload', { method: 'POST', query: { url } })
};

const fileExis = (item: UploadInfo) => {
  axios({
    url: baseUrl + "/isExis",
    method: "get",
    params: { url: item.url },
  }).then((res) => {
    if (res.data.data) {
      item.status = "上传成功";
    }
  });
};


</script>

<style lang="less">
@keyframes flash {
  from {
    border: 1px solid blue;
  }

  to {
    border: 1px solid gold;
  }
}

.done .el-card__body {
  animation: flash 1s infinite;
}
</style>
