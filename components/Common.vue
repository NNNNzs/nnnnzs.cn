<template>
  <div class="relative">
    <Header> </Header>
    <slot></slot>
    <Footer></Footer>
  </div>
</template>

<script lang="ts">
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: { Header, Footer },
  name: "Common",
});
</script>
