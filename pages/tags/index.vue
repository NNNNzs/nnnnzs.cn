<template>
  <Banner></Banner>
  <div class="container w-3/4 m-auto  grid grid-cols-1 gap-5 py-10 md:grid-cols-2 lg:grid-cols-4">
    <NuxtLink v-for="item in  list " :to="`${TAG_PREFIX_PAGE}/${item[0]}`"
      class="class-card relative w-10/12 h-32 mb-14 md:mx-auto md:w-10/12 md:max-w-[200px] md:h-64 md:mb-16">

      <div v-for="(tag, index) in  item[1]"
        class="child absolute h-full w-full class-child-shadow p-5 flex flex-col justify-between"
        :style="`--offset:${index + 1};--max-index:${item[1]}`">
        <h1 class="font-bold text-2xl font-Rubik">{{ item[0] }}</h1>
        <p class="text-right text-neutral-500">{{ item[1] }} articles</p>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
type Entry = [string, number]

const fetchTags = () => $fetch(`/api/tags`, { method: 'GET' });
const { data } = useAsyncData('tags', fetchTags);
const list = ref<Entry[]>([])
if (data.value) {
  list.value = data.value.sort((a, b) => a[1] < b[1] ? 1 : -1)
}

useHead({
  title: '标签',
});

</script>

<style lang="scss">
.class-card {
  --offset-multiplier: 4px;

  &:hover {
    --offset-multiplier: 6px;
  }

  .class-child-shadow {
    background: #fff;
    border-radius: 6px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .16), 0 -4px 8px hsla(0, 0%, 100%, .8);
    transition: all .4s ease;
    margin-top: calc(var(--offset)*var(--offset-multiplier));
    margin-left: calc(var(--offset)*var(--offset-multiplier));
    z-index: calc(8 - var(--offset));

  }
}
</style>
