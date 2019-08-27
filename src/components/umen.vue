<template>
   <div class="menu">
    <el-scrollbar style="height:100%">
    <el-container>
        <el-row class="tac">   
                <el-menu
                default-active=""
                class="el-menu-vertical-demo"   
                router
                :collapse="isCollapse"
                unique-opened
               	active-text-color="#155789"
                >
                <div  v-for="(item,i) in list" :key="i" class="item-list">
                   <div v-if="item.children">
                      <el-submenu :index="i+''" >
                            <template slot="title">
                            <i class=iconfont :class="item.icon" :style="{color:item.color}" style="margin-right:26px"></i>
                            <span >{{item.meta.msg}}</span>
                            </template>
                            <div v-for="(ites,i) in item.children" :key="i">
                               <div v-if="!ites.hidden">
                                   <el-menu-item :index="item.path+'/'+ites.path"  style="padding-left:68px;" @click="clickMenu(ites.meta.msg,`${item.path}/${ites.path}`)">{{ites.meta.msg}}</el-menu-item>
                               </div>
                            </div>                   
                        </el-submenu>
                    </div>  
                    <div v-else>
                        <el-menu-item :index="item.path">
                            <i class=iconfont :class="item.icon" :style="{color:item.color}" ></i>
                            <span slot="title" style="color:#323232;">{{item.meta.msg}}</span>
                        </el-menu-item>
                     </div> 
                  </div>
                </el-menu>
            </el-row>
    </el-container>
    </el-scrollbar>
    </div>  
 
</template>

<script>
import { EventBus } from '@/utils/bus.js'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
      return{     
         openedTab: [],
         isCollapse: false,
         lists:this.$router.options.routes,
         list:[],
         src: require("../assets/login/toux.jpg"),
         dialogFormVisible:false,
         dialogFormVisible2:false,
         form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          radio:''
        },
        formLabelWidth: '120px',
        
      }
  },

  computed:{
     getmenu(){
       return this.$store.state.umen.userUmen
     }

  },

  watch:{

  },

  created(){
      let m = this.$router.options.routes
      console.log(m)
      m.forEach(x => {
            if(!x.hidden){
              this.list.push(x)
            }
      })

     /////////////////////////// 
     EventBus.$on('showUmen',res=>{
         let p = !res
         this.isCollapse = p
        });
  },

  methods: { 


    clickMenu (componentName,componentPath) { 
      let _this = this;     
      let componentMsg = {componentName:componentName,componentPath:componentPath} 
      this.openedTab = this.$store.state.nav.openedTab;
      if(this.openedTab.length == 0){         
            this.$store.commit('addTab', componentMsg)
      }else{
            let m = this.openedTab; 
            let arr = [];
            m.forEach((v,k)=>{
              arr.push(v.componentName);
            })
            if(arr.indexOf(componentMsg.componentName)== -1) {
                this.$store.commit('addTab', componentMsg)
            }
            else{
                this.$store.commit('changeTab', componentMsg)
            }
      }

    },

    quer(){
      this.dialogFormVisible = true;
    },
    pass(){
      this.dialogFormVisible2 = true;
    },
    btn(){
      console.log(111)
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.el-menu-item {
    background-color:$bg-color  !important;
}
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
/deep/  .el-scrollbar__wrap{
   overflow-x:hidden; 
   margin-right: -22px !important; 
}
.logo{
    padding-left: 40px;
    height: 150px;
    background: #fafeff;
}  
.el-menu-item{
  font-size: 16px;
}
/deep/.el-submenu__icon-arrow{
    position: absolute;
    top: 50%;
    margin-left: 17px;
    right: 18px;
    margin-top: -4px;
}
/deep/.el-submenu__title{
      height: 50px;
    line-height: 50px;
    padding: 0 52px;
    padding-left:24px !important;
    font-size: 16px;
    color:#666;
}
/deep/.el-submenu .el-menu-item{
    height: 40px;
    line-height: 40px;
    color:$font-vcolr;
}
.el-menu-item.is-active {
   background-color:$main-color !important;
}
.el-submenu__title{
  font-size:16px !important;
}
.item-list{
  font-size: 16px;
}
.el-menu-item.is-active {
   background-color: $umen-color!important;
   color:$vices-color;
}

.el-row{
    height: 100%;
}
.el-submenu__title{
  margin-left:34px !important;
}
.el-menu{
    height: 100%;
    background-color:$cg-color;
    border:none;
 
}
.hello{
    height: 100%;
}
.el-col-12{
    min-width: 240px;
        height: 100%;

}
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  .el-container{
      // height: calc( 100% - 150px);
      height: 100%;
  }
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

/deep/.el-scrollbar__view{
  height:100%;
}
/deep/.el-scrollbar__wrap.default-scrollbar__wrap {
  overflow-x: auto;
}
.menu{
    height:100%;
    background-color: #fafeff;
    box-shadow: 1px 0px 10px $font-vcolr;
}
/deep/.el-submenu__title{
  color:$font-color;
}
/deep/.el-submenu.is-active .el-submenu__title{
    color:$vices-color !important;
}
/deep/.el-scrollbar__thumb{
  visibility: hidden;
}
.title>img{
  width: 60px;
  height: 60px;
  border-radius:50%
}
.title-umen{
    width: 174px;
    height: 174px;
    background: #ffffff;
    position: absolute;
    top:52px;
    z-index: 99;
    left:-94px;
    border:1px solid #ddd;
    border-radius: 5px;
    box-shadow:-4px 4px 10px  #ddd;
}
.umen-list>li{
    margin-top:24px;
    padding: 0 34px;
}
.title{
 
    width: 60px;
    padding-top:26px;
    border-radius: 50%;
}
.title-buttom{
   position:absolute;
   top: -18px;
   left: 20px;
}
.el-dropdown{
    top: 4px;
    left: 0px;
    width: 100px;
    
}
.el-dropdown-menu{
    .el-dropdown-menu__item {
          padding-left:40px;
      }
}
</style>
