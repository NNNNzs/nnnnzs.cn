export interface User {
  id?: number;
  role?: string;
  account?: string;
  password?: string;
  nickname?: string;
  mail?: string;
  phone?: string;
  registered_ip?: string;
  registered_time?: Date;
  login_time?: Date;
  login_ip?: string;
  dd_id?: string;
  github_id?: string;
  work_wechat_id?: string;
  avatar?: string;
}

export default function useUserInfo() {
  const userInfo = reactive<User>({})
  const router = useRouter()
  $fetch(clientUrl + '/user/info', { credentials: 'include' }).then(data => {
    Object.assign(userInfo, data)
  }).catch(err => {
    if (err.statusCode === 401) {
      router.replace({ path: '/login' })
    }
  })

  return userInfo
}