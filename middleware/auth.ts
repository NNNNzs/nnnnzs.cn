

/** 验证是否通过验证 */
export default defineNuxtRouteMiddleware(async (to, from) => {
  if (process.server) return;
  const data = await $fetch('/api/auth/v', { method: "POST", credentials: 'include' });

  if (!data.status) {
    return navigateTo({
      path: AUTH_PATH,
      query: {
        nextPath: to.fullPath
      }
    })
  } else {
    return
  }
})