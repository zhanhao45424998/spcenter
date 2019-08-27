import fetch from '@/utils/fetch';
//商品类别
export default {
    getMsg(data) {
        return fetch({
            url: '/product/service1110401.do',
            method: 'post',      
            data
        })
    },
    
}