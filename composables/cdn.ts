import axios from 'axios';

/**
 * Refreshes the CDN cache for the given URLs.
 *
 * @param {string[]} urls - An array of URLs to be purged from the CDN cache.
 * @return {Promise<any>} A promise that resolves to the response data if the CDN cache was successfully refreshed, 
 * or rejects with the response data if an error occurred.
 */
export const reflashCDNRemote = (urls: string[]) => {

  return new Promise((resolve, reject) => {
    axios({
      url: clientUrl + '/common/purgeUrlsCache',
      method: 'post',
      data: urls.filter(e => !!e)
    }).then(res => {
      if (res.data.TaskId) {
        resolve(res.data)
      } else {
        reject(res.data)
      }
    }).catch(reject)
  })

}


export const CDN_URL = 'https://www.nnnnzs.cn';