/** 三方验证页面路由 */
export const AUTH_PATH = '/c/auth';

/** 登录页面 */
export const LOGIN_PATH = '/admin/login';

/** 编辑页面 */
export const EDIT_PAGE = '/admin/edit/'
/** 工具 */
export const TOOLSE_PERFIX_PAGE = '/c/tools'
/** 管理后台页面 */
export const TOOLES_PAGE = '/admin'
/** 标签页面 */
export const TAG_PREFIX_PAGE = '/tags'
/** 默认跳转方式 */
export const A_TAGET = '_blank';

/** 文章详情页名称 */
export const POST_DETAIL_PAGE_NAME = ['20year-month-date-title', '1997-05-07-title']

/** 没有权限的页面 */
export const NO_PERMISSION_PAGE = '/user/error'






/**github oauth url */
export const githubOAuthUrl =
  "https://github.com/login/oauth/authorize?client_id=54e94f475d7a330c6619&scope=user"

export const redirectUri = "http://mac.nnnnzs.cn/login?type=workwechat"

/** 企业微信oauth  */
export const workWechatOAuthUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wwb4eb160b84c040fd&redirect_uri=${redirectUri}&response_type=code&agentid=1000002&scope=snsapi_base&state=CJSTATE#wechat_redirect`
