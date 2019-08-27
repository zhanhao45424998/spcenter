<template>
  <div id="productattributes">
        <Head title="品牌列表">      
                <div class="">
                    <div class="table-list">
                      <el-button type="primary"  @click="dialogFormVisible = true"><i class="iconfont iconxinzeng"> </i>新增属性</el-button>
                    </div>
                </div>
        </Head>
        
        <div class="productattributes-content">   
          <el-table
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
                  prop="product_count"
                  :show-overflow-tooltip="true"
                  label="产品数量">
              </el-table-column>
              <el-table-column
                  prop="first_letter"
                   :show-overflow-tooltip="true"
                  label="首字母">
              </el-table-column>
              <el-table-column
                  prop="factory_status"
                  align="center"
                   :show-overflow-tooltip="true"
                  label="是否为品牌制造商">
                  <template slot-scope="scope">
                  <span v-if="scope.row.factory_status == 1">是</span>
                  <span v-else>否</span>
	                </template>
              </el-table-column>
              <el-table-column
                  prop="show_status"
                  align="center"
                   :show-overflow-tooltip="true"
                  label="品牌使用状态">
                  <template slot-scope="scope">
                  <span v-if="scope.row.factory_status == true" style="color:#409EFF">启用</span>
                  <span v-else style="color:red">停用</span>
	                </template>
              </el-table-column>
              <el-table-column label="操作" align='center' width="250"  fixed="right">
              <template slot-scope="scope">
                  <el-button
                  type="success"
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"><i class="iconfont iconxiugai"></i>编辑</el-button> 
                  <el-button
                  style="margin-left:20px;"
                  type="danger"
                  size="mini"
                  @click="handleDelete(scope.$index, scope.row)"><i class="iconfont iconshanchu"> </i>删除</el-button>                    
              </template>
              </el-table-column>
          </el-table>
        </div>

        <el-dialog title="新增属性" :visible.sync="dialogFormVisible">
            <el-form :model="form">
               <el-form-item label="属性名称" :label-width="formLabelWidth">
                  <el-input v-model="form.name" auto-complete="off"></el-input>
               </el-form-item>
               <el-form-item label="属性选择类型" :label-width="formLabelWidth">
                  <el-select v-model="form.region" placeholder="请选择">
                  <el-option label="唯一" value="0"></el-option>
                  <el-option label="单选" value="1"></el-option>
                  <el-option label="多选" value="2"></el-option>
                  </el-select>
               </el-form-item>
                <el-form-item label="属性录入方式" :label-width="formLabelWidth">
                  <el-select v-model="form.region" placeholder="请选择">
                  <el-option label="手工录入" value="0"></el-option>
                  <el-option label="列表选取" value="1"></el-option>
                  </el-select>
               </el-form-item>
               <el-form-item label="可选值使用逗号隔开" :label-width="formLabelWidth">
                  <el-checkbox v-model="form.checked"></el-checkbox>
               </el-form-item>
               <el-form-item label="状态" :label-width="formLabelWidth">
                  <el-switch
                    v-model="form.value2"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                  </el-switch>
               </el-form-item>
               <el-form-item label="品牌logo" :label-width="formLabelWidth">
                  <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :file-list="fileList2"
                  list-type="picture">
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                  </el-upload>
               </el-form-item>
               
               <el-form-item label="专区大图" :label-width="formLabelWidth">
                  <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :file-list="fileList2"
                  list-type="picture">
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                  </el-upload>
               </el-form-item>
               <el-form-item label="品牌故事" :label-width="formLabelWidth">
                  <el-input type="textarea" v-model="form.desc"></el-input>
               </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
               <el-button @click="dialogFormVisible = false">取 消</el-button>
               <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
     
  </div>
</template>

<script>
import Head from '@/components/head/head'

export default {
  name: 'productattributes',
  components:{ Head },
  data(){
      return{
        fileList2: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
        currentPage: 1, // 当前页码
        total: 20, // 总条数
        pageSize: 4, // 每页的数据条数  
        dialogFormVisible: false,
        dialogFormVisible2: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          checked:true,
          value2:true,
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '160px',
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
  computed:{

  },


  watch: {

  },  
  methods:{
      handleRemove(file, fileList) {
        console.log(file, fileList);
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
      //修改
      handleEdit(index, row) {
        console.log(index, row);
        this.dialogFormVisible2 = true;
        this.form2 = row;
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
  },
}
</script>

<style scoped lang="scss">
.productattributes{
  .productattributes-title{
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
  .productattributes-content{
    width: 100% 
  }
}
</style>
