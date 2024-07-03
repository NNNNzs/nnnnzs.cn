export interface IUser {
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
export const useUserInfoStore = defineStore('userInfo', {
  state: () => ({
    id: 0,
    role: '',
    account: '',
    avatar: '',
    password: '',
    nickname: '',
    mail: '',
    phone: '',
    dd_id: '',
    github_id: '',
    work_wechat_id: '',
    status: 0
  } as IUser),
  actions: {
    async getInfo() {
      const infos = await $fetch(clientUrl + '/user/info')
      Object.assign(this, infos)
    }
  }
})
