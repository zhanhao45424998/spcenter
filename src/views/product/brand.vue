<template>
  <div class="brand">
        <Head title="品牌列表">      
                <div class="">
                    <div class="table-list">
                      <el-button type="primary"  @click="dialogFormVisible = true,cadd()"><i class="iconfont iconxinzeng"> </i>新增品牌</el-button>
                    </div>
                </div>
        </Head>

        <div class="brand-content">   
          <el-table
                v-loading="loading"
                border
                stripe
                id="outTable"  
                ref="multipleTable"             
                tooltip-effect="dark"
                :data="tableData3.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                style="width: 100%"
                :header-cell-style="{background:'#F3F6FB',color:'#606266'}"
                @selection-change="handleSelectionChange">
                <el-table-column
                label="序号"
                align='center'
                type="index"
                width="70">
              </el-table-column>
              <el-table-column
                  prop="name"
                  :show-overflow-tooltip="true"
                  label="品牌名称">
              </el-table-column>
              <el-table-column
                  prop="productcount"
                  :show-overflow-tooltip="true"
                  label="产品数量">
              </el-table-column>
              <el-table-column
                  prop="firstletter"
                   :show-overflow-tooltip="true"
                  label="首字母">
              </el-table-column>
              <el-table-column
                  prop="factorystatus"
                  align="center"
                   :show-overflow-tooltip="true"
                  label="是否为品牌制造商">
                  <template slot-scope="scope">
                  <span v-if="scope.row.factorystatus == 1">是</span>
                  <span v-else>否</span>
	                </template>
              </el-table-column>
              <el-table-column
                  prop="showstatus"
                  align="center"
                   :show-overflow-tooltip="true"
                  label="品牌使用状态">
                  <template slot-scope="scope">
                  <span v-if="scope.row.showstatus == 1" style="color:#409EFF">启用</span>
                  <span v-else style="color:red">停用</span>
	                </template>
              </el-table-column>
              <el-table-column label="操作" align='center' width="250"  fixed="right">
              <template slot-scope="scope">
                  <el-button
                  type="success"
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"><i class="iconfont iconxiugai"></i>编辑</el-button>            
              </template>
              </el-table-column>
          </el-table>
        </div>

        <div class="block">
            <span class="demonstration"></span>
            <el-pagination
            background
            :page-size="pageSize" 
            @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"   
            layout="prev, pager, next"
            :total= tableData3.length>
            </el-pagination>
        </div>
        
        <!-- /新增品牌/ -->
         <el-dialog title="新增品牌" :visible.sync="dialogFormVisible">
            <el-form :model="form" >
               <el-form-item label="品牌名称" :label-width="formLabelWidth">
                  <el-input v-model="form.name" auto-complete="off"></el-input>
               </el-form-item>
               <el-form-item label="首字母" :label-width="formLabelWidth">
                  <el-input v-model="form.firstletter" auto-complete="off"></el-input>
               </el-form-item>
               <el-form-item label="是否是品牌制造商" :label-width="formLabelWidth">
                  <el-select v-model="form.factorystatus" placeholder="请选择活动区域">
                  <el-option label="是" value="1"></el-option>
                  <el-option label="不是" value="0"></el-option>
                  </el-select>
               </el-form-item>
               <el-form-item label="状态" :label-width="formLabelWidth">
                  <el-radio v-model="form.showstatus" :label= 1>启用</el-radio>
                  <el-radio v-model="form.showstatus" :label= 0>停用</el-radio>
               </el-form-item>
               <el-form-item label="排序" :label-width="formLabelWidth">
                   <el-input-number v-model="form.sort" @change="handleChange" :min="0" :max="100" label="描述文字"></el-input-number>
               </el-form-item>
               <el-form-item label="品牌logo" :label-width="formLabelWidth" >
                  <el-upload
                  ref="upload"
                  class="upload-demo"
                  :action="doUpload"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :on-success="handlesuccess"
                  :limit="1"
                  list-type="picture">
                  <el-button size="small" type="primary" >点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                  </el-upload>
               </el-form-item>
               
               <el-form-item label="专区大图" :label-width="formLabelWidth">
                  <el-upload
                  class="upload-demo"
                  :action="doUpload"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :limit="6"
                  :on-success="handlesuccess1"
                  list-type="picture">
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                  </el-upload>
               </el-form-item>
               <el-form-item label="品牌故事" :label-width="formLabelWidth">
                  <el-input type="textarea" v-model="form.brandstory"></el-input>
               </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
               <el-button @click="dialogFormVisible = false">取 消</el-button>
               <el-button type="primary" @click="subupdata(),dialogFormVisible = false">确 定</el-button>
            </div>
         </el-dialog>
         
         <!-- 修改品牌 -->
         <el-dialog title="修改品牌信息" :visible.sync="dialogFormVisible2">
            <el-form :model="form2">
               <el-form-item label="品牌名称" :label-width="formLabelWidth">
                  <el-input v-model="form2.name" ></el-input>
               </el-form-item>
               <el-form-item label="首字母" :label-width="formLabelWidth">
                  <el-input v-model="form2.firstletter"></el-input>
               </el-form-item>
               <el-form-item label="是否是品牌制造商" :label-width="formLabelWidth">
                  <el-radio v-model="form2.factorystatus" :label= 1>是</el-radio>
                  <el-radio v-model="form2.factorystatus" :label= 0>否</el-radio>
               </el-form-item>
               <el-form-item label="状态" :label-width="formLabelWidth">
                  <el-radio v-model="form2.showstatus" :label= 1>启用</el-radio>
                  <el-radio v-model="form2.showstatus" :label= 0>停用</el-radio>
               </el-form-item>
               <el-form-item label="品牌logo" :label-width="formLabelWidth">
                  <el-upload
                  class="upload-demo"
                  :action="doUpload"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove2"
                  :file-list="fileList2"
                   :limit="1"
                  :on-success="handlesuccess2"         
                  list-type="picture">
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                  </el-upload>
               </el-form-item>
               
               <el-form-item label="专区大图" :label-width="formLabelWidth">
                  <el-upload
                  class="upload-demo"
                  :action="doUpload"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :on-success="handlesuccess3"
                  :limit="6"   
                  :file-list="fileList1"
                  list-type="picture">
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                  </el-upload>
               </el-form-item>
               <el-form-item label="品牌故事" :label-width="formLabelWidth">
                  <el-input type="textarea" v-model="form2.brandstory"></el-input>
               </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
               <el-button @click="dialogFormVisible2 = false">取 消</el-button>
               <el-button type="primary" @click="editupdata(),dialogFormVisible2 = false">确 定</el-button>
            </div>
         </el-dialog>
  </div>
</template>

<script>

import Head from '@/components/head/head'
import API from '@/api/brand'
export default {
  name: 'HospitalAdmin',
  components:{ Head },
  props: {
    msg: String
  },
  data(){
      return{
        loading: false,
        doUpload:'/api/basicdata/uploadImg.do',
        fileList1: [],
        fileList2: [],
        fileList3: [],
        fileList4: [],
        currentPage: 1, // 当前页码
        total: 20, // 总条数
        pageSize: 6, // 每页的数据条数  
        dialogFormVisible: false,
        dialogFormVisible2: false,
        form1:{
           name: '',
           firstletter:'',
           factorystatus:'',
           showstatus:1,
           logo:'',
           sort:0,
           bigpic:'',
           brandstory:'',
        },
        form2:{},
        form: {},
        formLabelWidth: '140px',
        tableData3: [],
      }
  },
  mounted(){
    this.getMsg()
  },
  methods:{
      //新增品牌
      cadd(){
          this.form = "";
          this.form = this.form1; 
      },
      subupdata(){         
          let data = this.form;
          data.usertoken = '123456';
          data.servicecode = "11100";
          console.log('data',data)
          API.addprojuct(data).then(res=>{
            if(res.success_Info == "success"){
              console.log('11')
                this.$message({
                showClose: true,
                message: '新增品牌成功',
                type: 'success'
              });
               this.getMsg();     
            }else{
               this.$message({
                showClose: true,
                message: `新增失败，${res.wrong_Info}`,
                type: 'error'
              });
               this.getMsg();     
            }
           
           
          })
      },     
      //修改触发时
      handleEdit(index, row) {
        this.dialogFormVisible2 = true;
        this.fileList1 = [], this.fileList2 = [];
        this.form2 = Object.assign({},row);
        console.log('adf',this.form2)
        if(this.form2.logo.length>0){
          let src = this.form2.logo;
          this.fileList2 = [{name:'',url:src,id:this.form2.id}]
        }
        if(this.form2.bigpic.length>0){
             let src1 = this.form2.bigpic.split(',') ;
             let arr = []
             src1.forEach((v,k)=>{
                arr.push({url:v,name:'',id:this.form2.id})
              })
             this.fileList1 = arr
        }
      },
      //删除logo图片
      handleRemove2(file, fileList){
          if(file.id){
            let data = {id:file.id,bigpic:file.url}
            data.usertoken = '123456';
            data.servicecode = "11100";
            data.pictype = 1;
            API.deleteImg(data).then(res=>{
              this.form2.logo = "";
              this.fileList2 = []; 
              // this.getMsg();
          })
          }else{
              this.form2.logo = "";
              this.fileList2 = []; 
          }
         
      },
      //删除专区大图
      handleRemove(file, fileList) {
            if(file.id){
                let uids = file.uid;
                let uidz = file.url;
                let arr = this.form2.bigpic.split(",");
                   console.log('arr',arr)
                for (var i = 0; i < arr.length; i++) {
        　　       if (arr[i] == uidz) {
            　　　      arr.splice(i, 1); 
            　　　　      i--; 
                   }  
                };
                let arrw = arr.join();
                this.form2.bigpic = arrw;
                console.log('11',this.form2)
                let data = {id:file.id,bigpic:file.url}
                data.usertoken = '123456';
                data.servicecode = "11100";
                data.pictype = 2; 
                API.deleteImg(data).then(res=>{
                      API.getMsg({usertoken:'123456',servicecode:"11100"}).then(res=>{
                            this.tableData3 = res.data.message;
                            console.log('table',this.tableData3)
                        })
                  });
            }
            else {
                let arr = [];
                fileList.forEach(res=>{
                  arr.push(res.url) 
                })
                let arrw = arr.join();
                this.form2.bigpic = arrw;
            }   
      },
      
      //提交修改
      editupdata(){
          let {bigpic,brandstory,id,factorystatus,firstletter,logo,name,showstatus,sort} = this.form2;
          let data = {bigpic,brandstory,id,factorystatus,firstletter,logo,name,showstatus,sort};
          data.usertoken = '123456';
          data.servicecode = "11100";
          API.addprojuct(data).then(res=>{
             this.getMsg();
          })    
      },
      //新增logo图片返回操作
      handlesuccess(response, file, fileList){
        if(response){
          this.form1.logo = response.pageresult.data.message
        }
      },
      //修改提交logo返回操作
      handlesuccess2(response, file, fileList){
        if(response){
          this.form2.logo = response.pageresult.data.message;
          this.fileList2 =  [{name:'',url:file.url}];        
          if(fileList.length>1){
            this.handleRemove2(fileList[0]);
          }
          console.log('f2',this.fileList2)
        }
      },
      //修改提交bigpic返回操作
      handlesuccess3(response, file, fileList){
          if(response){
          response.url = response.pageresult.data.message 
          response.name = ""; 
          let arr = this.form2.bigpic.split(',')
          arr.push(response.pageresult.data.message);
          this.form2.bigpic = arr.join(',')
          console.log('adsf',arr)
          }
      },
      // 新增专区大图
      handlesuccess1(response, file, fileList){
          let arr = [];
          fileList.forEach(item=>{
            arr.push(item.response.pageresult.data.message)
          })    
          arr = arr.join(',');
          this.form1.bigpic = String(arr) 
      },
  
      //获取品牌信息
      getMsg(){
        this.fileList1 = [];
        this.fileList2 = [];
        this.loading = true;
        let usertoken = '123456',
            servicecode = "11100";
        API.getMsg({usertoken,servicecode}).then(res=>{
            this.tableData3 = res.data.message;
            console.log('res12',this.tableData3)    
            this.loading = false;
          })
      }, 
      onExceed(file){
          this.fileList3 = [
            {
              name: file[0].name
            }
        ]
      },
     
      handlePreview(file) {
        console.log(file);
      },
      
      //分頁
      handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.currentPage = 1;
            this.pageSize = val;
      },
      handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.currentPage = val;
      },

      getval(data){
          let list = this.tableData3;
          list.forEach(v => {
            //  console.log(v.address)
             if(data.indexOf(v.address)){
               console.log(v.address)
             }
          });
      },
    
      //删除
      handleDelete(index,row){
         this.$confirm('此操作将永久删除该医院, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(index,row)
          this.tableData3.splice(index,1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      //
      handleSelectionChange(val) {
            this.multipleSelection = val;
            console.log(val)
      }, 

      handleChange(value) {
        console.log(value);
      } 

    
     },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.table-list{
  display: flex;
  div{
    margin-right: 20px;
  }
}
.block{
    margin-top:20px;
    text-align: right;
}
// .el-table{
//     font-size: 16px;
// }
.brand{
  .brand-title{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #dfdfdf;
    p {
        font-size: 20px;

      } 
    }
  .brand-content{
    width: 100% 
  }
}
/deep/ .el-upload-list__item {
      transition: none !important;
    }
</style>
