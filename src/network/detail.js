import {request} from "./request";

// 获取详情页数据
export function getDetail(iid){
    return request({
        url: '/detail',
        params:{
            iid
        }
    })
}