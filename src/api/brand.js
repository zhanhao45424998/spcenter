import fetch from '@/utils/fetch';
//品牌信息
export default {
    getMsg(data) {
        return fetch({
            url: 'product/service1110001.do',
            method: 'post',      
            data
        })
    },
    
    addprojuct(data){
        return fetch({
            url: 'product/service1110002.do',
            method: 'post',      
            data
        })
    },
    //删除图片
    deleteImg(data){
        return fetch({
            url: 'product/service1110003.do',
            method: 'post',      
            data
        }) 
    }
}