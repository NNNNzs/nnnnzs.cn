<template>
  <div class="card-item">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "拟态",
  setup() {
    return {};
  },
};
</script>

<style lang="less">
.card-item {
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;

  box-shadow: 18px 18px 30px rgba(0, 0, 0, 0.1),
    -18px -18px 30px rgba(255, 255, 255, 1);
  border-radius: 20px;
  background-color: #efeeee;
  transition: box-shadow 0.2s ease-out;

  &:hover {
    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.1),
      0px 0px 0px rgba(255, 255, 255, 1),
      inset 18px 18px 30px rgba(0, 0, 0, 0.1),
      inset -18px -18px 30px rgba(255, 255, 255, 1);
    transition: box-shadow 0.2s ease-out;
  }
}
</style>
