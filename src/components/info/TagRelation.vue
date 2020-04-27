<template>
<div>
  <el-card>
          <!-- gutter 间距 -->
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input
          :disabled = "disabled.add"
            placeholder="请输入内容"
        
            class="input-with-select"
          >
            <el-button
              :disabled = "disabled.add"
              slot="append"
              icon="el-icon-search"
              
            ></el-button>
          </el-input>
        </el-col>
         <el-col :span="4">
        
          <div @click.stop="">
            <el-button :disabled = "disabled.add" type="primary" @click="addTag">添加</el-button>
          </div>
          
        </el-col>
      </el-row>
      <tree-table  :data="allTag" :columns="columns" :selection-type  = "false" :expand-type = "false" show-index border>
          <!-- 是否有效 -->
          <template slot="isok" slot-scope = "scope">
              <i class="el-icon-success" style="color:lightgreen" v-if="scope.row.deleted === false"></i>
              <i class="el-icon-error" style="color:red" v-else></i>
          </template>
          <!-- 标签级别 -->
          <template slot="level" slot-scope = "scope">
              <el-tag size="mini" v-if="scope.row.level === 0">一级</el-tag>
              <el-tag size="mini" type="success" v-else-if="scope.row.level === 1">二级</el-tag>
              <el-tag type="warning" size="mini" v-else-if="scope.row.level === 2">三级</el-tag>
              <el-tag type="danger" size="mini" v-else-if="scope.row.level === 3">四级</el-tag>
              <el-tag type="info" size="mini" v-else-if="scope.row.level >= 4">{{scope.row.level+1}}级</el-tag>
          </template>
           <!-- 操作 -->
          <template slot="opt" slot-scope = "scope">
                 <el-tooltip
              class="item"
              effect="dark"
              content="编辑"
              placement="top"
              :enterable="false"
            >
              <el-button
            
                type="primary"
                icon="el-icon-edit"
                size="small"
              @click="editTag(scope.row)"
              >
              </el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="删除"
              placement="top"
              :enterable="false"
            >
              <el-button
             
                type="danger"
                icon="el-icon-delete"
                size="small"
               @click="deleteTag(scope.row)"
              >
              </el-button>
            </el-tooltip>
          </template>
      </tree-table>
       <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
  </el-card>
<!-- 添加标签对话框 -->
<el-dialog
  title="提示"
  :visible.sync="showAddTag"
  width="30%"
  :before-close="handleClose">
  <el-form ref="addTagForm" :model="tag" label-width="80px">
  <el-form-item label="标签名">
    <el-input v-model="tag.tagname"></el-input>
  </el-form-item>
  <el-form-item label="父标签">
     <!-- <el-input v-model="tag.pid"></el-input> -->
     <el-cascader
    v-model="selectTag"
    :options="selAllTag"
    :props="tagProp"
    expand-trigger="hover"
    @change="handleChange"
    placeholder="一级标签不用选择 "
    :change-on-select="true"
    ></el-cascader>
  </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="showAddTag = false">取 消</el-button>
    <el-button type="primary" @click="confirmAddTag">确 定</el-button>
  </span>
</el-dialog>

</div>
</template>
<script>
export default {
  data() {
    return {
      //添加Tag
      showAddTag:false,
      tag:{
        pid:'0',
        tagname:''
      },
      //tag的prop 用来指定级联选择器的配置对象
      tagProp:{
        value:'id',
        label:'tagname',
        children:'children',
        multiple: true,
         checkStrictly: true
      
      },
      //级联选择器渲染的数组
      selAllTag:[],
      //选择的父标签
      selectTag:[],
       //是否显示
      disabled: {
        add: true,
        delete: true,
        update: true,
        select: true,
        forbidden: true
      },
        //标签等级
      //权限信息
      autoArr:'',
      allAuthorityList: [],
       queryInfo: {
        pageNum: 1,
        pageSize: 5
      },
      query: "",
      total: 0,
      allTag:[],
      columns:[
         
          {
              label:'分类名称',
              prop:'tagname'
          }
          ,
          {
              label:'标签ID',
              prop:'id',
              width:'150px'
          },
          {
              label:'父标签ID',
              prop:'pid',
              width:'150px'
          },
          {
              label:'是否有效',
            //   prop:'deleted',
              //定义为模板列
              type:'template',
              //作用域插槽名
              template:'isok'
          },
           {
              label:'标签级别',
            //   prop:'deleted',
              //定义为模板列
              type:'template',
              //作用域插槽名
              template:'level'
          },
           {
              label:'操作',
            //   prop:'deleted',
              //定义为模板列
              type:'template',
              //作用域插槽名
              template:'opt'
          }
      ],
       queryInfo: {
        pageNum: 1,
        pageSize: 5
      },
      query: "",
      total: 0,
    };
  },
  created() {
     this.getAutoArr()
    this.getTagTree();
  },
  methods: {
     
    //获得所有标签信息
    async getTagTree() {
      const { data: res } = await this.$http.post("/getTagTree",this.queryInfo);
      console.log(res);
      this.allTag = res.list
      this.total = res.num
      
      
      
    //         this.allAuthorityList = res.list;
    //    this.total = res.num;
    //   console.log(this.allAuthorityList);
    },
     //修改操作
    editTag(){},
    //删除操作
    deleteTag(){},
     // 监听pageSize改变是触发
    handleSizeChange(newSize) {
      console.log(newSize);
      this.queryInfo.pageSize = newSize;
      this.queryInfo.pageNum = 1;
      this.getTagTree();
    },
    // 页码值改变触发
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage;
      console.log(newPage);
      this.getTagTree();
    },
  //获取权限
    async getAutoArr() {
   this.reset()
      const { data: res } = await this.$http.get("/getAuthorityString", {
        params: { id: window.sessionStorage.getItem("id") }
      });
      this.autoArr = res;
      console.log(res);
      var strs = new Array(); //定义一数组
      strs = res.split(","); //字符分割
      for (var i = 0; i < strs.length; i++) {
        if(strs[i] == '901'){
              this.disabled.add = false
              
        }else if(strs[i] == '902'){
              this.disabled.forbidden = false
            
        }else if(strs[i] == '903'){
              this.disabled.update = false
             
        }else if(strs[i] == '904'){
              this.disabled.select = false
           
        }
      }
    },
    //重置权限
     reset(){
      this.disabled.add = true
       this.disabled.delete = true
        this.disabled.update = true
        this.disabled.select = true
        this.disabled.forbidden = true
       
    },
    async addTag(){
      const { data: res } = await this.$http.post(`selectAllTagNotQuery`, {})

      this.selAllTag = res
      // console.log()
      this.deleteLeafChildren(this.selAllTag)
      console.log(this.selAllTag)
        this.showAddTag = true
    },
    //确定添加
    async confirmAddTag(){
        this.$refs.addTagForm.validate( async valid =>{
          if(!valid)
          return this.$message.error("输入有误！！")
          console.log("11111111111111111")
          console.log(this.selectTag)
          console.log(this.selectTag.length)
          console.log("11111111111111111")
            if(this.selectTag.length !==0){
              this.tag.pid = this.selectTag[0][this.selectTag[0].length-1]
              // console.log("777777777777")
              // console.log(this.selAllTag[this.selAllTag.length-1])
              // console.log("777777777777")
              console.log(this.tag.pid)
            }else{
              this.tag.pid = 0
            }
           const { data: res } = await this.$http.post(`/addTag/${this.tag.tagname}/${this.tag.pid}`, {})
           console.log(res)
           if(res.status !== 0){
             return this.$message.error(res.message)
           }
           this.showAddTag = false
             this.$message.success("添加成功！！")
            this.getTagTree()
          //   var timer = setTimeout(()=>{
          //     console.log("router")
          //  this.$router.go(0);
          //   },300)
          
        })
       
   
   },
    handleClose(){
      this.selectTag = []
    },
//级联选择器项发生变化
    handleChange(){
      console.log(this.selectTag)
    },
  //级联选择器动态加载数据
  // lazyLoadFunc(node, resolve){
  //   if(node.children.length === 0)

  // }
  //递归删除叶子节点的children
    deleteLeafChildren(value){
         value.forEach(element => {
        
        if(element.children.length === 0){
          // $delete(element,'children')
          console.log(element)
          this.$delete(element,'children')
        }
        else{
          this.deleteLeafChildren(element.children)
        }
      })
    }
  }
};
</script>
<style scoped>
.el-input{
    margin-bottom: 15px !important;
}
</style>
