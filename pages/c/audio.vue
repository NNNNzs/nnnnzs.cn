<template>
  <div>
    <h1>Audio</h1>
    <p>Audio page</p>
  </div>
</template>

<script lang="ts" setup>
import { useTitle, useSpeechRecognition,useUserMedia } from "@vueuse/core"
import { ElButton } from "element-plus"
import { ref } from "vue"

var APPID = "5bd6cb20"
var API_SECRET = "5560f982ceea83824516c9ed496ac470"
var API_KEY = "4775b6d03fe77b4cfaef6fba0657a695";

useUserMedia()


</script>
