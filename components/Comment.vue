<template>
  <!-- 评论区 -->
  <div id="disqus_thread"></div>
</template>

<script setup lang="ts">
const postId = inject("postId")
onMounted(() => {
  ;(function () {
    // DON'T EDIT BELOW THIS LINE
    var d = document,
      s = d.createElement("script")
    s.src = "https://nnnnzs-cn.disqus.com/embed.js"
    s.setAttribute("data-timestamp", +new Date() + "")
    ;(d.head || d.body).appendChild(s)
  })()
})
useScriptTag(
  "https://s7.addthis.com/js/300/addthis_widget.js#pubid=ra-6225e5e4b7e8b9d7",
  () => {},
  {
    async: true
  }
)
</script>
<style scoped></style>
