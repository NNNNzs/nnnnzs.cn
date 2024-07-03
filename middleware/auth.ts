

/** 验证是否通过验证 */
export default defineNuxtRouteMiddleware(async (to, from) => {
  if (process.server) return;
  const userInfo = useUserInfoStore();
  if (!userInfo.account) {
    return navigateTo({
      path: NO_PERMISSION_PAGE,
      query: {
        nextPath: to.fullPath
      }
    })
  } else {
    return
  }
})