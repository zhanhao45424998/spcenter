<template>
  <div id="productstyle">
     <Head title="商品分类树">      
                <div class="">
                    <div class="table-list">
                      <el-button type="primary"  @click="dialogFormVisible = true"><i class="iconfont iconxinzeng"> </i>新增分类</el-button>
                    </div>
                </div>
     </Head>
     <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" v-loading="loading"></el-tree>

     <el-dialog title="新增类别" :visible.sync="dialogFormVisible">
            <el-form :model="form">
               <el-form-item label="分类名称" :label-width="formLabelWidth">
                  <el-input v-model="form.name" auto-complete="off"></el-input>
               </el-form-item>
               <el-form-item label="类别等级" :label-width="formLabelWidth">
                  <el-select v-model="form.region" placeholder="请选类别等级">
                  <el-option label="1级" value="1"></el-option>
                  <el-option label="2级" value="2"></el-option>
                  </el-select>
               </el-form-item>
               <el-form-item label="父级类别" :label-width="formLabelWidth" v-if="form.region==2">
                  <el-select v-model="form.resource" placeholder="请选类别">
                  <el-option label="类别1" value="1"></el-option>
                  <el-option label="类别2" value="2"></el-option>
                  </el-select>
               </el-form-item>
               <el-form-item label="是否显示在导航栏" :label-width="formLabelWidth">
                  <el-switch
                    v-model="form.date2"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                  </el-switch>
               </el-form-item>
               <el-form-item label="状态" :label-width="formLabelWidth">
                  <el-switch
                    v-model="form.value2"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                  </el-switch>
               </el-form-item>
               <el-form-item label="分类图标" :label-width="formLabelWidth">
                   <el-upload
                        class="upload-demo"
                        :action="doUpload"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :file-list="fileList2"
                        list-type="picture">
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
               </el-form-item> 
               <el-form-item label="分类描述" :label-width="formLabelWidth">
                  <el-input type="textarea" v-model="form.desc"></el-input>
               </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
               <el-button @click="dialogFormVisible = false">取 消</el-button>
               <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
     </el-dialog>

     <el-dialog title="修改类别属性" :visible.sync="dialogFormVisible2">
            <el-form :model="form1">
               <el-form-item label="分类名称" :label-width="formLabelWidth">
                  <el-input v-model="form1.name" auto-complete="off"></el-input>
               </el-form-item>
               <el-form-item label="是否显示在导航栏" :label-width="formLabelWidth">
                  <el-radio v-model="form1.navstatus" :label= 1>是</el-radio>
                  <el-radio v-model="form1.navstatus" :label= 0>否</el-radio>              
               </el-form-item>
                <el-form-item label="类别等级" :label-width="formLabelWidth">
                  <el-radio v-model="form1.level" :label= 0>一级</el-radio>  
                  <el-radio v-model="form1.level" :label= 1>二级</el-radio>      
               </el-form-item>
               <el-form-item label="显示状态" :label-width="formLabelWidth">
           
                  <el-radio v-model="form1.showstatus" :label= 0>不显示</el-radio>  
                  <el-radio v-model="form1.showstatus" :label= 1>显示</el-radio>      
           
               </el-form-item>
               <el-form-item label="分类图标" :label-width="formLabelWidth" >
                   <el-upload
                        class="upload-demo"
                        :action="doUpload"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :file-list="fileList"
                        :limit="1"   
                        list-type="picture">
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
               </el-form-item> 
               <el-form-item label="分类描述" :label-width="formLabelWidth">
                  <el-input type="textarea" v-model="form1.description"></el-input>
               </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
               <el-button @click="dialogFormVisible2 = false">取 消</el-button>
               <el-button type="primary" @click="dialogFormVisible2 = false">确 定</el-button>
            </div>
     </el-dialog>
  </div>
</template>

<script>
import Head from '@/components/head/head'
import API from '@/api/productstyle'


export default {
  name: 'productstyle',
  components: { Head },
    data() {
      return {
        loading:false,
        doUpload:'/api/basicdata/uploadImg.do',
        tableData:{},
        fileList: [],
        fileList2:[],
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          value2:true,
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        form1:{

        },
        formLabelWidth: '140px',
        dialogFormVisible:false,  
        dialogFormVisible2:false,  
        data: [
        {
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            asd:'asdads',
          }]
        }, 
        {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
          }, 
          {
            label: '二级 2-2',
          }]
        }, 
        {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
          }, 
          {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'name'
        }
      };
    },
    mounted(){
      this.getMsg();
    },
    methods: {
      getMsg(){
          this.loading = true;
          let data = {usertoken:'123456',servicecode:'11104'}
          API.getMsg(data).then(res=>{
            let obj = res.data.message;
            let arr = [];
            let children = [];
            for(let i in obj) {
              arr.push(obj[i][0]);
              children.push(obj[i].slice(1))
            } 
            for(let a in arr){   
               for(let b in children){
                  arr[a].children = children[a]
               } 
            }
            this.data = arr
            this.loading=false
            console.log('aaa',this.data)
          })
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleNodeClick(data) {
        this.form1 = "";
        this.fileList =[];
        this.form1 = Object.assign({},data);
        console.log('data',this.form1);
        this.dialogFormVisible2 = true;
        if(this.form1.icon !=""){
          let src = this.form1.icon;
          this.fileList = [{name:'',url:src,id:this.form1.id}]
        }else{
          
        }
      }
    },
    computed:{

    },


    watch: {

    },  

}
</script>

<style scoped lang="scss">
/deep/ .el-upload-list__item {
      transition: none !important;
    }
</style>
