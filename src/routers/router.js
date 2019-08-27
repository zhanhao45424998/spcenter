import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/index'
const _import = path => r => require.ensure([], () => r(require('../views/' + path + '.vue')));

Vue.use(Router)

export default new Router({
//  mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {path: '/', redirect: '/product/brand',hidden: true},
    {
        path: '/product',
        component:Layout,
        name:'product',  
        icon: 'iconshuju',
        color:'#ff6600',
        meta:{
            msg:'商品信息'  
        },
        children:[
          {
            path:'brand',
            component: _import('product/brand'),
            name: 'brand', 
            meta:{
               msg:'品牌列表'  
            },   
          },
          {
            path:'productlist',
            component: _import('product/productlist'),
            name: 'productlist', 
            meta:{
               msg:'商品列表'  
            },   
          },
          {
            path:'productcategory',
            component:_import('product/productcategory'),
            name:'productcategory',
            meta:{
              msg:'类别列表'
            } 
          },
          {
            path:'productstyle',
            component: _import('product/productstyle'),
            name: 'productstyle', 
            meta:{
               msg:'商品类别'  
            },   
          },
          {
            path:'productattributes',
            component: _import('product/productattributes'),
            name: 'productattributes', 
            meta:{
               msg:'属性类别'  
            },   
          },

        ]
    },        
    {
        path: '/rotary',
        component:Layout,
        name:'base2', 
        icon: 'iconyuanliaoxiaohao',
        color:"#F15685",
        meta:{
            msg:'轮播设置'  
        },
        children:[]
    },
  ]
})
