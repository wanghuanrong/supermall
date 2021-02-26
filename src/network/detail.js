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

// 获取详情页推荐信息
export function getRecommend(){
    return request({
        url: '/recommend'
    })
}

// 很多时候，返回来数据非常杂。在给组件发送数据的时候非常不方便。
// 这里就用到了面向对象的思想，把需要的数据通过构造函数分装的一个对象中，就方便了
export class Goods{
    constructor(itemInfo, columns, services){
        this.title = itemInfo.title;
        this.desc = itemInfo.desc;
        this.desc = itemInfo.price;
        this.newPrice = itemInfo.price;
        this.oldPrice = itemInfo.oldPrice;
        this.discount = itemInfo.discountDesc;
        this.columns = columns;
        this.services = services;
        this.realPrice = itemInfo.lowNowPrice;
    }
}

export class Shop{
    constructor(shopInfo){
        this.logo = shopInfo.shopLogo;
        this.name = shopInfo.name;
        this.fans = shopInfo.cFans;
        this.sells = shopInfo.cSells;
        this.score = shopInfo.score;
        this.goodsCount = shopInfo.cGoods;
    }
}

export class GoodsParam{
    constructor(info, rule){
        this.image = info.image ? info.images[0] : '';
        this.infos = info.set;
        this.sizes = rule.tables;
    }
}
