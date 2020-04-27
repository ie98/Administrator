<template>
  <el-card>
          <!-- gutter 间距 -->
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input
            placeholder="请输入内容"
        
            class="input-with-select"
          >
            <el-button
              
              slot="append"
              icon="el-icon-search"
              
            ></el-button>
          </el-input>
        </el-col>
      </el-row>

      <el-table :data="allTagList" border style="width: 100%">
          
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="id" label="ID"> </el-table-column>
        <el-table-column prop="pid" label="父ID">
        </el-table-column>
        <el-table-column prop="level" label="等级"> </el-table-column>
        <el-table-column prop="delete" label="禁用">
           <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="是否禁用"
              placement="top"
              :enterable="false"
            >
              <el-switch
                
                v-model="scope.row.delete"
                @change="forbidden(scope.row)"
              ></el-switch>
            </el-tooltip>
          </template>
           </el-table-column>
        <el-table-column prop="tagname" label="标签名"> </el-table-column>
        <el-table-column label="功能">
          <el-button type="success" label=" ">修改标签名称</el-button>
        </el-table-column>
      </el-table>
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
</template>
<script>
export default {
  data() {
    return {
      //权限信息
      autoArr:'',
      allTagList: [],
       queryInfo: {
        pageNum: 1,
        pageSize: 5
      },
      query: "",
      total: 0,
    };
  },
  created() {
    this.getAllTagList();
  },
  methods: {
        // 监听pageSize改变是触发
    handleSizeChange(newSize) {
      console.log(newSize);
      this.queryInfo.pageSize = newSize;
      this.queryInfo.pageNum = 1;
      this.getAllTagList();
    },
    // 页码值改变触发
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage;
      console.log(newPage);
      this.getAllTagList();
    },
    //获得所有权限信息
    async getAllTagList() {
      const { data: res } = await this.$http.post("/selectAllTag", this.queryInfo);
      console.log(res);
            this.allTagList = res.list;
       this.total = res.num;
      console.log(this.allTagList);
    },
     async forbidden(item) {
      // const { data: res } = await this.$http.put("/updateUserState", item);
      console.log(res);
    },
    //获取权限
//   async getAutoArr(){
//     const { data: res } = await this.$http.get('/getAuthority', {
//       params: {id:window.sessionStorage.getItem('id')}
//     })
//     this.autoArr = res;
//     console.log(res)
//   }
  
  }
};
</script>
