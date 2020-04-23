<template>
  <el-card>
      <el-table :data="allAuthorityList" border style="width: 100%">
          
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="id" label="id"> </el-table-column>
        <el-table-column prop="authorityname" label="权限名称">
        </el-table-column>
        <el-table-column prop="authorityid" label="权限id"> </el-table-column>
        <el-table-column prop="path" label="路径"> </el-table-column>
        <el-table-column prop="autograde" label="权限等级"> </el-table-column>
        <el-table-column label="功能">
          <el-button type="success" label=" ">修改权限</el-button>
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
      allAuthorityList: [],
       queryInfo: {
        pageNum: 1,
        pageSize: 5
      },
      query: "",
      total: 0,
    };
  },
  created() {
    this.getAllAuthorityList();
  },
  methods: {
        // 监听pageSize改变是触发
    handleSizeChange(newSize) {
      console.log(newSize);
      this.queryInfo.pageSize = newSize;
      this.queryInfo.pageNum = 1;
      this.getAllAuthorityList();
    },
    // 页码值改变触发
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage;
      console.log(newPage);
      this.getAllAuthorityList();
    },
    //获得所有权限信息
    async getAllAuthorityList() {
      const { data: res } = await this.$http.post("/getAllAuthorityList", this.queryInfo);
      console.log(res);
            this.allAuthorityList = res.list;
       this.total = res.num;
      console.log(this.allAuthorityList);
    },
    //获取权限
  async getAutoArr(){
    const { data: res } = await this.$http.get('/getAuthority', {
      params: {id:window.sessionStorage.getItem('id')}
    })
    this.autoArr = res;
    console.log(res)
  }
  
  }
};
</script>
