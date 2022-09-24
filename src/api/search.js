/**
 * 搜素相关请求模块
 */
import request from '@/utils/request'

/**
 * 搜索建议请求模块
 */
export const getSearchSuggestion = q => {
  return request({
    method: 'GET',
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}

/**
 * 搜索结果请求模块
 */
export const getSearchResult = params => {
  return request({
    method: 'GET',
    url: '/v1_0/search',
    params
  })
}
