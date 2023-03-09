<template>
  <div class="w-full h-full flex flex-row">
    <div class="flex-1 h-full bg-blue-50 border mr-1" id="map">
    </div>
    <div class="w-1/5 h-full bg-blue-50 border m-auto">
      <div class="m-auto">
        <ElUpload action="." :http-request="customHttp">
          <ElButton>上传</ElButton>
        </ElUpload>
        {{ gpsInfo }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElUpload, ElButton } from 'element-plus';
import type { UploadRequestHandler } from 'element-plus';

import Map from 'ol/Map.js';
import { OSM, XYZ, TileWMS } from 'ol/source';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import { defaults as defaultControl, MousePosition, ScaleLine, ZoomToExtent, ZoomSlider } from 'ol/control'
import 'ol/ol.css'
import exifr from 'exifr'
import { Point } from 'ol/geom';
import { fromLonLat } from 'ol/proj';

let map: Map;
let view: View
onMounted(() => {

  map = new Map({
    target: 'map',
    layers: [
      new TileLayer({
        source: new XYZ({
          url: 'https://wprd01.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&size=1&scl=1&style=8&ltype=0',
        })
        // source: new TileWMS({
        //   url: 'https://wmts-service.pre-fc.alibaba-inc.com/amap/service/wms',
        //   params: {
        //     'LAYERS': 'map:shanghai',
        //     VERSION: '1.1.0'
        //   }
        // })

      }),
    ],
    controls: defaultControl().extend([
      new MousePosition(),
      new ScaleLine(),
      new ZoomToExtent(),
      new ZoomSlider(),
    ]),
    view: view = new View({
      center: [118.0, 31.0],
      // center: [118.7555611111111, 31.97137222222222],
      projection: 'EPSG:4326',
      zoom: 15,
    }),
  });
})

const gpsInfo = ref<any>()

const customHttp: UploadRequestHandler = (options) => {
  // options.file;
  console.log(options.file)
  // const info = exifr.parse(options.file)
  exifr.gps(options.file).then(res => {
    gpsInfo.value = res;
    const point = fromLonLat([res.longitude, res.latitude], 'EPSG:4326')
    // fromLonLat()
    view.animate({
      // point,
    })
    view.setCenter(point)
    // view.centerOn()
  });
  return Promise.resolve()
}


</script>

<style lang="scss" scoped></style>