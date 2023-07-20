<template>
  <Banner />
  <div class=" flex justify-center mt-10">
    <el-timeline :reverse="reverse">
      <el-timeline-item v-for="(p, index) in data" :key="p.id" :timestamp="p.date">
        <NuxtLink :to="p.path" target="_blank">
          <el-card>
            <h4>{{ p.title }}</h4>
            <p>{{ p.description }}</p>
          </el-card>
        </NuxtLink>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script setup lang="ts">
import { ElTimeline, ElTimelineItem, ElCard } from 'element-plus';

const fetchPost = () => $fetch(`/api/post/listAll`);
const { data, refresh } = await useAsyncData('timeLine', fetchPost);

const reverse = ref(true);
</script>

<style scoped></style>