import fetch from '@/utils/fetch';
//商品类别
export default {
    addMsg(data) {
        return fetch({
            url: '/product/service1110102.do',
            method: 'post',      
            data
        })
    },
    getMsg(data) {
        return fetch({
            url: '/product/service1110101.do',
            method: 'post',      
            data
        })
    },
}