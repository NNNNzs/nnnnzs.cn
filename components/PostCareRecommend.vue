<template>
  <div
    class="
      max-w-md
      mx-auto
      bg-white
      rounded-xl
      shadow-md
      overflow-hidden
      md:max-w-2xl
      my-4
    "
  >
    <div class="md:flex">
      <div class="md:flex-shrink-0">
        <img
          class="h-48 w-full object-cover md:w-48"
          src="https://static.nnnnzs.cn/bing/20210912.png?imageMogr2/thumbnail/680x/format/webp/interlace/1/quality/100"
          alt="Man looking at item at a store"
        />
      </div>
      <div class="p-8">
        <div
          class="uppercase tracking-wide text-sm text-indigo-500 font-semibold"
        >
          Case study
        </div>
        <a
          href="#"
          class="
            block
            mt-1
            text-lg
            leading-tight
            font-medium
            text-black
            hover:underline
          "
          >Finding customers for your new business</a
        >
        <p class="mt-2 text-gray-500">
          Getting a new business off the ground is a lot of hard work. Here are
          five ideas you can use to find your first customers.
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style scoped>
</style>