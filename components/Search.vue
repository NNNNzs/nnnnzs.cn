<template>
  <!-- <AlgoliaDocSearch :options="options" /> -->
  <div id="docsearch"></div>
</template>

<script setup lang="ts">
// @ts-ignore
import docsearch from '@docsearch/js'
import '@docsearch/css';
const indexName = 'nnnnzs'
const config = useRuntimeConfig();
const { applicationId, apiKey } = config.public.algolia

onMounted(() => {

  docsearch({
    container: '#docsearch',
    appId: applicationId,
    indexName: indexName,
    apiKey: apiKey,
  })

})
</script>

<style scoped></style>