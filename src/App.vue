<template>
  <div id="app" :class="fclass">
     <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {},
  data(){
    return{
       fclass:''
    }
  },
  computed:{
    getsize () {
      return this.$store.state.font.size
    },

  },


  watch: {
    getsize (val) {
       this.addclass(val)
    },

  },  
  methods:{


    addclass(val){
      var arr = ['mini','small','big','moren'];
      arr.forEach((v,k)=>{
        if(val==v){
          this.fclass = v
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #666666;
  width:100%;  
  background:$bg-color;
  height:100%;
  font-size: 14px; 
  /deep/ table{
    font-size:$font-mini ;
    }
}
.big{
  /deep/.distribution-title{
    p{font-size: $font-zuida  !important;}  
  }
   /deep/.el-tree-node__content{
     font-size: $font-max !important;
  }
   font-size:$font-max !important;
  /deep/.el-button{/deep/.iconfont{
    font-size:$font-mini !important;
  }
  }
  /deep/.el-dialog__title{
     font-size: $font-max !important;
  }
  /deep/ .el-form-item__label{
     font-size: $font-max !important;
  }
  /deep/.el-submenu__title{
    font-size: $font-max !important;
  }
  /deep/.el-menu-item{
    font-size: $font-max !important;
  }
  /deep/.el-button{
    font-size: $font-max !important;
  }
  /deep/.el-tabs__item{
    font-size: $font-max !important;
  }
  /deep/table{
    font-size:$font-max !important;
  }
  /deep/.el-input__inner{
    line-height: 52px;
    height: 52px;
  } 
}
.small{
  /deep/.distribution-title{
    p{font-size: $font-max  !important;}  
  }
  font-size: $font-big !important;
    /deep/.el-button{/deep/.iconfont{
    font-size:$font-mini !important;
  }
  }
  /deep/.el-tree-node__content{
     font-size:$font-big !important;
  }
  /deep/.el-dialog__title{
     font-size:$font-big !important;
  }
  /deep/ .el-form-item__label{
     font-size: $font-big !important;
  }
  /deep/.el-submenu__title{
    font-size: $font-big !important;
  }
  /deep/.el-menu-item{
    font-size: $font-big !important;
  }
  /deep/.el-button{
    font-size: $font-big !important;
  }
  /deep/.el-tabs__item{
    font-size:$font-big !important;
  }
  /deep/table{
    font-size:$font-big !important;
  }
  /deep/.el-input__inner{
    line-height: 46px;
    height: 46px;
  } 
}
.mini{
   /deep/.distribution-title{
    p{font-size: $font-big !important;}  
  }
  font-size:$font-small !important;
  /deep/.el-button{/deep/.iconfont{
    font-size:$font-mini !important;
  }}
   /deep/.el-input__inner{
     line-height: 44px;
     height: 44px;
   } 
    /deep/.el-input__inner:focus {
        border: 1px solid red !important;
    }
  /deep/.el-dialog__title{
     font-size: $font-small !important;
  }
  /deep/ .el-form-item__label{
     font-size: $font-small !important;
  }
  /deep/.el-submenu__title{
    font-size: $font-small !important;
  }
  /deep/.el-menu-item{
    font-size: $font-small !important;
  }
  /deep/.el-tree-node__content{
    font-size: $font-small !important;
  }
  /deep/.el-button{
    font-size: $font-small !important;
  }
  /deep/.el-tabs__item{
    font-size:$font-small !important;
  }
  /deep/table{
    font-size:$font-small !important;
  }
}
.moren{


}
</style>
