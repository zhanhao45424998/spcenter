<template>
  <div class="header">
       <div class="header-title">
          <div class="title-img">
              <img :src="src" alt="" style="vertical-align: middle;">
          </div>
          <div class="title-content">
              <div class="header-list">
                  <div style="line-height:80px;">
                    <i class="iconfont iconzhankai" style="font-size:20px;" v-on:click="umen"></i>
                  </div>
                  <p style="line-height:80px;letter-spacing: 2px;">
                      <!-- <span>工作库房：</span><span>卫材办库房</span> -->
                  </p>
                  <div style="margin-left:30px;">
                      <el-select v-model="value" placeholder="请选择字体大小" size="mini" style="width:80px;">
                          <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                      </el-select>
                  </div>
              </div>
              <div class="top">   
                  <p style="line-height:80px;margin-right:50px;"><span style="color:#fff;letter-spacing:4px;">新空间医护商城管理系统</span></p>        
                  <p class="top-email"><router-link :to="{path:'/admin/remind'}"><i class="iconfont iconmail"></i></router-link></p>
                   <p class="top-email"><router-link :to="{path:'/admin/remind'}" style=" margin-right:10px;"><i class="iconfont iconremind"></i></router-link></p>
                  <!-- <p @click.native="btn" style="color:#dfdfdf;line-height:80px;">登出</p> -->
                  <div class="admin-title">
                      <img :src="touxiang" alt="">
                      <el-dropdown trigger="click">
                          <span class="el-dropdown-link">
                            <span>David Williams</span> <br>系统管理员<i class="el-icon-caret-bottom el-icon--right"></i>
                          </span>
                          <el-dropdown-menu slot="dropdown" style="width:200px">
                            <el-dropdown-item @click.native="quer">切换库房</el-dropdown-item>
                            <el-dropdown-item @click.native="pass">密码设置</el-dropdown-item>
                            <el-dropdown-item @click.native="btn">安全退出</el-dropdown-item>
                          </el-dropdown-menu>
                      </el-dropdown>
                  </div>     
              </div>
          </div>
         
       </div>
       <el-dialog title="切换库房" :visible.sync="dialogVisible">
            <!-- <el-form :model="form">
              <el-form-item label="请选择库房" :label-width="formLabelWidth">
                <el-select v-model="form.region" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item> 
              <el-form-item label="是否为默认库房" :label-width="formLabelWidth">
                  <el-radio v-model="form.radio" label="1">是</el-radio>
                  <el-radio v-model="form.radio" label="2">否</el-radio>
              </el-form-item>
            </el-form> -->
            <div class="checkt">
              <el-form :model="form">
              
                    <el-form-item label="请选择库房" >
                    <el-select v-model="form.region" placeholder="请选择库房">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                    </el-form-item>
             
                   
                    <el-form-item label="是否设为默认库房">
                      <el-radio v-model="form.radio" label="1" style="margin-left:20px">是</el-radio>
                      <el-radio v-model="form.radio" label="2" >否</el-radio>
                    </el-form-item>
              </el-form>
            </div>
            <div slot="foot" class="dialog-footer">
              <el-button @click="valueState = false">取 消</el-button>
              <el-button type="primary" @click="valueState = false" style="margin-left:40px;">确 定</el-button>
            </div>
       </el-dialog>

       <el-dialog title="修改密码" :visible.sync="dialogVisible2" :center = true >
            <el-form :model="form" style="width: 60%;margin: 0 auto;">
              <el-form-item label="请输入新密码" :label-width="formLabelWidth">
                <el-input v-model="form.name" auto-complete="off" type="password"></el-input>
              </el-form-item>
            </el-form>
            <div slot="foot" class="dialog-footer">
              <el-button type="primary" @click="valueState2 = false">确 定</el-button>
              <el-button @click="valueState2 = false" style="margin-left:40px;">取 消</el-button>

            </div>
       </el-dialog> 
  </div>


</template>

<script>
import { EventBus } from '@/utils/bus.js'

export default {
  name: '',
  data(){
      return{
         options: [{
            value: 'big',
            label: '大'
          }, {
            value: 'small',
            label: '中'
          }, {
            value: 'mini',
            label: '小'
          }, {
            value: 'moren',
            label: '默认'
          },],
         value: '',
         show:false,
         pre:true,
         src: require("../assets/logo.png"),
         touxiang: require("../assets/login/toux.jpg"),
         dialogVisible:false,
         dialogVisible2:false,
         form: {
            name: '',
            region: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: ''
          },
         formLabelWidth: '120px' 
      }
  },
  props:{
     msg:{
         type:String,
         default:''   
           }
  },
  watch:{
    value(val){
       this.$store.commit('getsize', val)
    }
  },
  methods:{
    quer(){
      console.log(111)
        this.dialogVisible = true;
     },
    pass(){
        this.dialogVisible2 = true;
     },
    handleCommand(command) {
        this.$router.push({
          path: command,
        })
    },
    btn(){ 

        
        // this.$router.push({path:'/login'}) 
    },
    umen(){
       this.pre = !this.pre
       this.$emit('showUmen',this.pre)
       EventBus.$emit('showUmen', this.pre);
    },
    go() {
      this.$router.go(-1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
/deep/.el-input__inner{
  height: 28px !important;
  line-height: 28px !important;
}
.checkt{
  margin: 0 auto;
  width: 50%;
  div{
      text-align: left;
      span{
      display: inline-block;
      font-size: 14px;
      width: 120px;
      text-align: right;
      margin-right: 40px;
      font-weight: bold;
    }
  }   
}
.el-dropdown-link{
  cursor: pointer;
}
.admin-title>img{
  width: 60px;
  height: 60px;
  border-radius:50%;
  vertical-align: middle;
}
.header-list{
   div{
     color:$font-dcolor;
     i {
        color:$font-dcolor;
     }
   }
   p{
     color:$font-dcolor
   }
}
.admin-title-umen{
    width: 174px;
    height: 174px;
    background: $vice-color;
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
.admin-title{
 
    width: 60px;
    border-radius: 50%;
}
.admin-title-buttom{
   position:absolute;
   top: -18px;
   left: 20px;
}



.title-img{
  float: left;
  width: 210px;
  padding-left: 20px;
  
}
.iconfont{
  cursor: pointer;
}
.title-content{
  display: flex;
  height: 80px;
  flex-flow:  row nowrap;
  justify-content: space-between;
}
.iconfont{
  margin-right:18px;
  vertical-align: middle;
}
.header{
  background: linear-gradient(to bottom right, $main-color,$vices-color);;
}
.header-list{
  display: flex;
}
.header-title{
    height: 80px;
    line-height: 80px;
    box-shadow: 0px 4px 10px $font-vcolr;
    flex-direction: row;
    justify-content: space-between; 
    font-size:18px;
    padding: 0 40px 0px 20px;
}
.umen-list .el-icon-message{
  margin-right:14px;
}
.umen-list{
  color:#333;
}
.header-title>p{
    line-height: 60px;
}
.header-content{
    height: 32px;
    padding:8px;
    display: flex;
}
.top{
   display:flex;
   padding-right: 100px;
}
.top-email{
    line-height: 74px;
    margin-right: 20px; 
    text-align: center;
}
.top-email>a>i{
    font-size: 24px;
    color:$font-dcolor;
}
.title>img{
  width: 40px;
  height: 40px;
  border-radius:50%
}
.title-umen{
    width: 174px;
    height: 174px;
    background: $vice-color;
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
    position: relative;
    width: 40px;
    height: 40px;
    background: #ddd;
    margin:10px;
    border-radius: 50%;
}
.title-buttom{
   position:absolute;
   top: -18px;
   left: 20px;
}
.el-dropdown{
    top: -70px;
    left: 64px;
    width:100px;
    line-height: 20px;
    color:$font-dcolor;
}
.el-dropdown-menu{
    .el-dropdown-menu__item {
          padding-left:40px;
      }
}
</style>
