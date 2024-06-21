<template>
  <div class="w-full h-full flex flex-row">
    <div class="flex-1 overflow-hidden" id="container"></div>
    <div class="w-1/5 h-full bg-blue-50 border m-auto">
      <div class="m-auto">
        <ElUpload action="." :http-request="customHttp" :drag="true">
          <ElButton>上传</ElButton>
        </ElUpload>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGeolocation } from "@vueuse/core"
import { ElUpload, ElButton } from "element-plus"
import type { UploadRequestHandler } from "element-plus"
import exifr from "exifr"
import AMapLoader from "@amap/amap-jsapi-loader"

const { coords, locatedAt, error, resume, pause } = useGeolocation()

let map: any
let AMap: any

const customHttp: UploadRequestHandler = (options) => {
  exifr.parse(options.file).then((res: ImageMetadata) => {
    const { latitude, longitude } = res

    $fetch("/api/coordinate_convert", {
      query: {
        locations: `${longitude},${latitude}`,
        coordsys: "gps",
        output: "JSON"
      }
    }).then((res) => {
      if (res.status === "1") {
        const { locations } = res
        const [lng, lat] = locations.split(",")
        const point = new AMap.LngLat(lng, lat)
        const marker = new AMap.Marker({
          position: point
        })
        map.add(marker)
        map.setCenter(point)
      }
    })
  })
  return Promise.resolve()
}

onMounted(() => {
  window._AMapSecurityConfig = {
    securityJsCode: "91f0e6ba8382e37ef64725919da79491"
  }
  const plugins = [
    "AMap.Scale",
    "AMap.ToolBar",
    "AMap.MapType",
    "AMap.ControlBar",
    "AMap.Geolocation",
    "AMap.IndoorMap"
  ]
  AMapLoader.load({
    key: "cdc30f3af2e0c61d887d006dcfd6e4c9", // 申请好的Web端开发者Key，首次调用 load 时必填
    // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    version: "2.0",
    plugins: plugins
  }).then((_AMap) => {
    AMap = _AMap
    map = new _AMap.Map("container", {
      zoom: 11, // 初始化地图级别
      center: [116.397428, 39.90923], // 初始化地图中心点位置
      viewMode: "3D" // 是否为3D地图模式
    })

    const opts = {
      ControlBar: {
        postion: "RT"
      }
    } as any

    plugins.forEach((pStr) => {
      const plugin = pStr.split(".").pop() as string
      map.addControl(new AMap[plugin](opts[plugin]))
    })
  })
})

onUnmounted(() => {
  map?.destroy()
})
</script>

<style scoped></style>
