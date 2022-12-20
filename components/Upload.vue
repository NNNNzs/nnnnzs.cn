<template>
  <ClientOnly>
    <div id="upload" class="w-screen h-screen flex justify-center items-center">
      <ElUpload :action="actionUrl" multiple ref="upload" @mouseenter="handleFocus" :disabled="showLoading"
        :http-request="customRequest" :show-file-list="false">
        <ElButton v-if="!showLoading" size="large" type="primary">上传</ElButton>
        <ElProgress v-else type="circle" :percentage="uploadText"></ElProgress>
      </ElUpload>
      <ElDrawer v-model="showDrawer" :width="500" :show-close="false" title="上传列表">
        <template #header="{ close, titleId, titleClass }">
          <ElInput></ElInput>
        </template>
        <ul v-if="rencetUploadList.length > 0" bordered :class="{ done }">
          <ElCard class="mt-4" v-for="(item, index) in rencetUploadList" :key="item.addTime">
            <template #header>
              <div class="flex justify-between">
                <span>{{ item.fileName }}</span>
                <ElButton text @click="handleRemove(item)" :icon="Close"></ElButton>
              </div>
            </template>
            <ElForm>
              <ElFormItem label="添加时间:">{{ dayjs(item.addTime).format('YYYY-MM-DD HH:mm:ss') }}</ElFormItem>
              <ElFormItem label="文件名:">{{ item.fileName }}</ElFormItem>
              <ElFormItem label="别名:">
                <ElInput v-if="currentEditId === item.addTime && currentEdit" v-model="currentEdit.alisa"
                  @keydown="handleAlisaKeydown($event as KeyboardEvent, item, index)" />
                <span v-else>{{ item.alisa }}</span>
              </ElFormItem>
              <ElFormItem label="文件类型:">
                <span @click="doCopy(item.mime)">
                  {{ item.mime }}
                </span>
              </ElFormItem>
              <ElFormItem label="链接:">
                <ElLink target="_blank" :download="item.fileName" :href="item.url">
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

      <ElIcon>
        <svg @click="showLocal" @mouseenter="showLocal" xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8l8 8l1.41-1.41L7.83 13H20v-2z" fill="currentColor" />
        </svg>
      </ElIcon>

    </div>
  </ClientOnly>

</template>
,
<script lang="ts" setup>
import { Ref } from 'vue-demi'
import axios, { AxiosResponse } from "axios";
import RecentUpload, { UploadInfo } from "@/utils/hooks/RecentUpload"
import { Close } from '@element-plus/icons-vue'
import dayjs from "dayjs";
import { ElMessage, ElLink, ElProgress, ElDrawer, ElCard, ElResult, ElInput, ElUpload, ElButton, ElMessageBox, UploadRequestOptions, UploadRequestHandler, ElDialog, ElIcon, ElForm, ElFormItem } from 'element-plus'
let rencetUploadList: Ref<UploadInfo[]> = ref([])
let recentUpload: any;
useHead({
  link: [
    {
      rel: "stylesheet",
      href: "//cdn.jsdelivr.net/npm/element-plus/dist/index.css"
    }
  ]
})

onMounted(() => {
  recentUpload = new RecentUpload();
  rencetUploadList = recentUpload.list;
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
const uploadBlob = ref<Blob>();
const hasDialog = ref(false);
const showDrawer = ref(false);
const showLoading = ref(false);
const uploadText = ref<number>(0);
const actionUrl = ref('https://api.nnnnzs.cn/api/upload');
const baseUrl = actionUrl.value

const { copy } = useClipboard()

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

const handleFocus = () => {
  navigator.clipboard
    .read()
    .then((clipboardItems) => {
      clipboardItems.forEach((clipboardItem) => {
        for (const type of clipboardItem.types) {
          clipboardItem.getType(type).then((blob) => {
            const isImg = type.includes("image");
            const isText = type.includes("text");
            if (isImg) {
              const src = URL.createObjectURL(blob);
              imgSrc.value = src;
              if (hasDialog.value) {
                return false;
              }

              hasDialog.value = true;
              const imgVnode = h("img", {
                class: "preview",
                src: src,
              })

              ElMessageBox.confirm(
                imgVnode,
                "检测到剪贴板有图片，是否上传")
                .then(res => {
                  const addTime = new Date().getTime();
                  handleUpload(blob).then((url) => {
                    recentUpload.add({
                      addTime,
                      alisa: "",
                      url,
                      mime: blob.type,
                      origin: "剪贴板",
                      fileName: "clipboard",
                    });
                    hasDialog.value = false;
                    doCopy(url);
                  })
                }).catch(_ => {
                  hasDialog.value = false;
                })
            } else if (isText) {
              navigator.clipboard.readText().then((text) => {
                if (canTransForm(text)) {
                  if (hasDialog.value) {
                    return false;
                  }

                  hasDialog.value = true;
                  ElMessageBox.confirm(
                    h("div", [
                      `检测到剪贴板的图片外链`,
                      h(
                        "a",
                        {
                          href: text,
                          target: "_blank",
                        },
                        text
                      ),
                      `是否上传？`,
                      h("div", [
                        h("img", {
                          src: text,
                        }),
                      ]),
                    ]),
                    '检测到剪贴板有图片外链',
                  ).then(_ => {
                    transformImage(text).then((res) => {
                      doCopy(res);
                    });
                  }).catch(_ => {
                    hasDialog.value = false;
                  })
                }
              });
            }
          });
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
  // 保存
  if (code === "Enter") {
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
const handleUpload = (blob: Blob) => {
  const formData = new FormData();
  formData.append("inputFile", blob);
  return new Promise<string>((resolve, reject) => {
    axios({
      url: baseUrl,
      method: "post",
      data: formData,
      onUploadProgress: ({ loaded, total }) => {
        console.log(loaded, total);
      },
    })
      .then((res: AxiosResponse<{ code: number; data: unknown; url: string }>) => {
        const { code, data, url } = res.data;
        if (code == 200) {
          resolve(url);
        } else {
          reject(res);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const customRequest = (opt: UploadRequestOptions) => {
  const { file } = opt;
  const { type, name } = file;
  const formData = new FormData();
  formData.append("inputFile", file);

  const addTime = new Date().getTime();
  showLoading.value = true;
  return axios({
    url: actionUrl.value,
    method: "post",
    data: formData,
    onUploadProgress: ({ loaded, total = 0 }) => {
      uploadText.value = Math.ceil((loaded / total) * 100);
      console.log({ percent: Math.ceil((loaded / total) * 100) });
    },
  })
    .then((res) => {
      showLoading.value = false;
      uploadText.value = 0;

      const { code, data, url } = res.data;
      if (code == 200) {
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
    })
    .catch((error) => {
    });
};

/**
 *
 * @param url url
 * @description 图片转换，通过后端下载图片，上传到cos，再返回给前端
 */
const transformImage = (url: string) => {
  return new Promise<string>((resolve) => {
    axios({
      url: baseUrl + "/dupload",
      method: "post",
      data: {
        url,
      },
    }).then((res) => {
      if (res.data) {
        resolve(res.data.url);
      }
    });
  });
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
body {
  background-color: #efefef;
  width: 100vw;
  height: 100vh;
}

.preview {
  border: 1px dashed #bf6464;
  padding: 5px;
}

.drawer-content {
  .title {
    width: 30px;
    position: relative;
    margin-right: 2px;
  }

  .content {
    word-break: break-all;
  }
}

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
