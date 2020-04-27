<template>
  <div>
    <v-editAdmin v-if="edit.showEdit" :admin='edit.admin' @notShowEdit='notShow'></v-editAdmin>
    <router-view></router-view>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <!-- gutter 间距 -->
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input
            placeholder="请输入内容"
            v-model="query"
            class="input-with-select"
          >
            <el-button
            :disabled="disabled.select"
              slot="append"
              icon="el-icon-search"
              @click="selectAdmin"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <router-link v-if="disabled.add == false" to="/addAdmin"
            ><el-button :disabled="disabled.add" type="primary">添加</el-button></router-link
          >
        </el-col>
      </el-row>

      <!-- 用户列表区 -->
      <el-table
        class="table"
        border
        stripe
        :data="allAdmin"
        style="width: 100%;"
      >
        <el-table-column type="index"></el-table-column>
<el-table-column prop="username" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="authority" label="权限" width="180">
            </el-table-column>
            <el-table-column prop="shopname" label="店铺名称" width="180">
            </el-table-column>
            <el-table-column prop="status" label="职位" width="180">
            </el-table-column>
            <el-table-column prop="phone" label="手机号码" width="180">
            </el-table-column>
            <el-table-column prop="password" label="密码" width="180">
            </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="是否禁用"
              placement="top"
              :enterable="false"
            >
              <el-switch
              :disabled="disabled.forbidden"
           
                v-model="scope.row.state"
                @change="forbidden(scope.row)"
              ></el-switch>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="编辑"
              placement="top"
              :enterable="false"
            >
              <el-button
                :disabled="disabled.update"
                type="primary"
                icon="el-icon-edit"
                size="small"
                @click="editAdmin(scope.row)"
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
              :disabled="disabled.delete"
                type="danger"
                icon="el-icon-delete"
                size="small"
                @click="deleteAdmin(scope.row)"
              >
              </el-button>
            </el-tooltip>
          </template>
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
  </div>
</template>
<script>
import EditAdmin  from "../edit/EditAdmin";
export default {
  components: {
    "v-editAdmin": EditAdmin
  },

  data() {
    return {
//权限信息
      autoArr:'',
      //是否显示
      disabled: {
        add: true,
        delete: true,
        update: true,
        select: true,
        forbidden: true
      },
      edit: {
        showEdit: false,
        admin:{}
      },

      queryInfo: {
        pageNum: 1,
        pageSize: 5
      },
      query: "",
      allAdmin: [],
      total: 0,
      as: true
    };
  },
  created() {
    this.selectAllAdmin();
    this.getAutoArr()
  },
  methods: {
    async selectAllAdmin() {
      const { data: res } = await this.$http.post("/selectAllAdmin", this.queryInfo);
      console.log(res);
      this.allAdmin = res.list
       this.total = res.num;

    },
      
    async selectAdmin() {
      const { data: res } = await this.$http.get("/selectAdmin", {
        params: { query: this.query }
      });
      if (res != null) {
        this.allAdmin = [];
        this.allAdmin.push(res);
        console.log(res);
      } else {
        this.$message.error("没有这个人");
      }
    },
    // 监听pageSize改变是触发
    handleSizeChange(newSize) {
      console.log(newSize);
      this.queryInfo.pageSize = newSize;
      this.queryInfo.pageNum = 1;
      this.selectAllAdmin();
    },
    // 页码值改变触发
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage;
      console.log(newPage);
      this.selectAllAdmin();
    },
    editAdmin(item){
      console.log(this.edit.admin)
      this.edit.showEdit = false
      this.edit.admin = item
      this.edit.showEdit = true
      console.log(this.edit.admin)
    },
    async deleteAdmin(item) {
      const confirmResult = await this.$confirm(
        "将永久删除该用户！是否继续？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).catch(err => err);
      if (confirmResult == "cancel") return this.$message.info("已取消删除");

      console.log(item);
      const { data: res } = await this.$http.delete(`/admin/${item.id}`);
      if (res.status == 10009) {
        this.selectAllAdmin();
        return this.$message.success("删除成功！！");
      }
      return this.$message.error("删除失败！！");
      console.log(res);
    },
    async forbidden(item) {
      const { data: res } = await this.$http.put("/updateAdminState", item);
      console.log(res);
    },
    notShow(bool){
      console.log("123")
     this.edit.showEdit = bool
    },
   //获取权限
    async getAutoArr() {
      const { data: res } = await this.$http.get("/getAuthorityString", {
        params: { id: window.sessionStorage.getItem("id") }
      });
      this.autoArr = res;
      console.log(res);
      var strs = new Array(); //定义一数组
      strs = res.split(","); //字符分割
      for (var i = 0; i < strs.length; i++) {
        if(strs[i] == '201'){
              this.disabled.select = false
        }else if(strs[i] == '202'){
              this.disabled.update = false
        }else if(strs[i] == '203'){
              this.disabled.add = false
        }else if(strs[i] == '204'){
              this.disabled.delete = false
        }else if(strs[i] == '205'){
              this.disabled.forbidden = false
        }
      }
    }
  }
};
</script>
<style scoped></style>
