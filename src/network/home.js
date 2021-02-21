import {request} from './request'

export function getHomeMultidata(){
    return request({
        url: '/home/multidata'
    })
}

// 参数一：请求数据类型（流行、新款、精选）
// 参数二：第几页
export function getHomeGoods(type, page){
    return request({
        url: 'home/data',
        params:{
            type,
            page
        }
    })
}

