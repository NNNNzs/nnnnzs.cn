<template>
  <div class="full">
    <MdEditor v-model="value"></MdEditor>
  </div>
</template>

<script setup name="admin" lang="ts">
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
const value = ref(null)
const route = useRoute();
const { params } = route;
const { title } = params;
useHead({
  title: title as string,
});

</script>

<style lang="scss" >

</style>