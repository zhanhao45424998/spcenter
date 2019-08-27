<template>
  <div id="productcategory">
     <Head title="类别管理">      
            <div class="">
                <div class="table-list">
                <el-button type="primary"  @click="dialogFormVisible = true"><i class="iconfont iconxinzeng"> </i>新增类别</el-button>
                </div>
            </div>
     </Head>
     <div>
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
                  label="类别名称">
              </el-table-column>
              <el-table-column
                  prop="attributecount"
                  :show-overflow-tooltip="true"
                  label="属性数量">
              </el-table-column>
              <el-table-column
                  prop="paramcount"
                  :show-overflow-tooltip="true"
                  label="参数数量">
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

     <div>
         <el-dialog title="新增类别" :visible.sync="dialogFormVisible">
            <el-form :model="form" >
               <el-form-item label="类别名称" :label-width="formLabelWidth">
                  <el-input v-model="form.name" auto-complete="off"></el-input>
               </el-form-item>
               <el-form-item label="首字母" :label-width="formLabelWidth">
                  <el-input v-model="form.firstletter" auto-complete="off"></el-input>
               </el-form-item>
            </el-form>   
            <div slot="footer" class="dialog-footer">
               <el-button @click="dialogFormVisible = false">取 消</el-button>
               <el-button type="primary" @click="subupdata(),dialogFormVisible = false">确 定</el-button>
            </div>
         </el-dialog>
         
         <el-dialog title="修改类别" :visible.sync="dialogFormVisible2">
            <el-form :model="form1" >
               <el-form-item label="类别名称" :label-width="formLabelWidth">
                  <el-input v-model="form1.name" auto-complete="off"></el-input>
               </el-form-item>
               <el-form-item label="首字母" :label-width="formLabelWidth">
                  <el-input v-model="form1.firstletter" auto-complete="off"></el-input>
               </el-form-item>
               <el-form-item label="商品ID" :label-width="formLabelWidth" >
                  <el-input v-model="form1.id" auto-complete="off" :disabled="true"></el-input>
               </el-form-item>
            </el-form>   
            <div slot="footer" class="dialog-footer">
               <el-button @click="dialogFormVisible2 = false">取 消</el-button>
               <el-button type="primary" @click="editupdata(),dialogFormVisible2 = false">确 定</el-button>
            </div>
         </el-dialog>
     </div>
  </div>
</template>

<script>
import Head from '@/components/head/head'
import API from '@/api/productcategory'
export default {
  name: 'productstyle',
  components: { Head },
    data() {
      return {
          loading :false,
          dialogFormVisible:false,
          dialogFormVisible2:false,
          form1:{},
          form:{
            name:'',
            firstletter:''
          },
          formLabelWidth:"140px",
          fileList2: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
          currentPage: 1, // 当前页码
          total: 20, // 总条数
          pageSize: 4, // 每页的数据条数  
          tableData3: [ 
             {
               name: '泰州市中医院分院',
               first_letter: '2010305',
               factory_status: 0,
               show_status:false,
               product_count: '普陀区',
               product_comment_count: '上海市普陀区金沙江路 1513 弄',          
             }, 
             {
               name: '泰州市中医院分院',
               first_letter: '2010305',
               factory_status: 1,
               show_status:true,
               product_count: '普陀区',
               product_comment_count: '上海市普陀区金沙江路 1513 弄',          
             },
             {
               name: '泰州市中医院分院',
               first_letter: '2010305',
               factory_status: 1,
               show_status:false,
               product_count: '普陀区',
               product_comment_count: '上海市普陀区金沙江路 1513 弄',          
             },
             {
               name: '泰州市中医院分院',
               first_letter: '2010305',
               factory_status: 0,
               show_status:true,
               product_count: '普陀区',
               product_comment_count: '上海市普陀区金沙江路 1513 弄',          
             },
             {
               name: '泰州市中医院分院',
               first_letter: '2010305',
               factory_status:1,
               show_status:true,
               product_count: '普陀区',
               product_comment_count: '上海市普陀区金沙江路 1513 弄',          
             },
         ]
      }
    },
    mounted(){
        this.getMsg();
    },
    methods: {     
      subupdata(){
        let data = this.form;
        data.usertoken = "123456";
        data.servicecode = "11101";
        API.addMsg(data).then(res=>{
           console.log('add',res)
           this.getMsg();
        })
      },
      editupdata(){
         let data = {id:this.form1.id,name:this.form1.name,firstletter:this.form1.firstletter};
         data.usertoken = "123456";
         data.servicecode = "11101";
         API.addMsg(data).then(res=>{
           console.log('edit',res)
           this.getMsg();
        }) 
      },
      getMsg(){
         this.loading = true;
         let data = {servicecode:'11101',usertoken:'123456'}
         API.getMsg(data).then(res=>{
             this.tableData3 = res.data.message;
             this.loading = false;
         })
      },

      handleEdit(index, row) {
         this.dialogFormVisible2 = true;
         this.form1 = "";
         this.form1 = Object.assign({},row);
      },

      handleSelectionChange(val) {
            this.multipleSelection = val;
            console.log(val)
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
 
    },
    computed:{

    },


    watch: {

    },  

}
</script>

<style scoped lang="scss">
.block{
    margin-top:20px;
    text-align: right;
}
</style>
