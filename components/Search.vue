<template>
  <!-- <AlgoliaDocSearch :options="options" /> -->
  <div id="docsearch" class="flex items-center"></div>
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

<style >
.dark .DocSearch {
  --docsearch-text-color: #f5f6f7;
  --docsearch-container-background: rgba(9, 10, 17, 0.8);
  --docsearch-modal-background: #15172a;
  --docsearch-modal-shadow: inset 1px 1px 0 0 #2c2e40, 0 3px 8px 0 #000309;
  --docsearch-searchbox-background: #090a11;
  --docsearch-searchbox-focus-background: #000;
  --docsearch-hit-color: #bec3c9;
  --docsearch-hit-shadow: none;
  --docsearch-hit-background: #090a11;
  --docsearch-key-gradient: linear-gradient(-26.5deg, #565872, #31355b);
  --docsearch-key-shadow: inset 0 -2px 0 0 #282d55, inset 0 0 1px 1px #51577d, 0 2px 2px 0 rgba(3, 4, 9, 0.3);
  --docsearch-footer-background: #1e2136;
  --docsearch-footer-shadow: inset 0 1px 0 0 rgba(73, 76, 106, 0.5), 0 -4px 8px 0 rgba(0, 0, 0, 0.2);
  --docsearch-logo-color: #fff;
  --docsearch-muted-color: #7f8497;
}

.dark .DocSearch .DocSearch-Button .DocSearch-Button-Key {
  box-shadow: unset
}
</style>