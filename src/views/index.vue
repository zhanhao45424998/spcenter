<template>
  <div class="index">
       
      <div>
        <Head v-bind:msg="meta" v-on:showUmen="showUmen"></Head>
      </div>
      
      <div class="right" :class="{right2:message}">           
          <UMEN :message="message"></UMEN> 
          <el-main class="main">
            <Nav></Nav>
            <div class="main-center">
              <el-scrollbar style="height:100%">       
                <div style="padding-right:12px;" class="maincontent">
                <transition name="router" mode="out-in">
                  <!-- <keep-alive>  -->
                  <router-view></router-view>
                  <!-- </keep-alive> -->
                </transition>     
                </div>
              </el-scrollbar>
            </div>
          </el-main>
      </div>
     
  </div>
</template>

<script>
import Nav from '@/components/navMain'
import UMEN from "@/components/umen.vue"
import Head from "@/components/headers"

export default {
  name: 'login',
  components:{ UMEN, Head ,Nav},
  data(){
     return{
       meta:'',
       message:'',
       msg:''
     }
  },
  mounted(){
       this.meta = this.$route.meta.msg;
  },
  computed:{
    remessage:function(){
      return this.message;
      console.log('111',remessage)
    }
  },
  watch:{
    msg(newval,oldval){
      console.log(message)
    }
  },
  methods:{
       showUmen(data){       
          this.message = data;
          this.msg = this.message
       },
       go() {
          this.$router.go(-1)
       }
  },
  watch:{
      $route(to,from){
        this.meta = this.$route.meta.msg      
      }
    },
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.back{
  background:$main-color;
}
.main-center{
  height: calc( 100% - 42px);
  overflow-x: hidden;
}
/deep/.is-horizontal{
  display: none;
}
.header-content{
    height: 32px;
    padding: 0px 10px 0px 0px;
    align-items: center;
    justify-content: space-between;
    display: flex;
    // border-bottom: 1px solid #dfdfdf;
    padding-bottom:10px;
}
.index{
  height: 100%;

}
.right{
  width:100%;
  display: flex;
  height:calc( 100% - 80px);
}

.main{
  margin:10px;
  margin-bottom: 0px;
  background:$cg-color;
  overflow-y: hidden;
  overflow-x: hidden;
  padding-top:10px;
  border-radius: 8px;
  padding-bottom: 20px;
  margin-bottom: 10px;
}

.el-scrollbar{
  /deep/ .el-scrollbar__wrap {
           overflow-x: hidden;
  }
}
.slide-fade-enter-active {
  transition: all .2s ease;
}
.slide-fade-leave-active {
  // transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
   transition: all .2s ease;

}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
.router-enter {
    transform: translateX(20px);
    opacity: 0;
}

.router-enter-active, .router-leave-active {
    transition: all .3s ease;
}

.router-leave-to {
    transform: translateX(-20px);
    opacity: 0;
}
</style>
