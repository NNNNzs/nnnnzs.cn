/** 授权获取token */
export default defineEventHandler(async (event) => {
    const res = await $fetch(baseUrl + '/auth')
    return res;
})
