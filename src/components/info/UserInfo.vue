<template>
  <div>
    <v-editUser
      v-if="edit.showEdit"
      :user="edit.user"
      @notShowEdit="notShow"
    ></v-editUser>
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
              slot="append"
              icon="el-icon-search"
              @click="selectUser"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <router-link to="/addUser"
            ><el-button type="primary">添加</el-button></router-link
          >
        </el-col>
      </el-row>

      <!-- 用户列表区 -->
      <el-table
        class="table"
        border
        stripe
        :data="allUser"
        style="width: 100%;"
      >
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="username" label="姓名"> </el-table-column>
        <el-table-column prop="id" label="id"> </el-table-column>
        <el-table-column prop="college" label="学院"> </el-table-column>
        <el-table-column prop="grade" label="年级"> </el-table-column>
        <el-table-column prop="password" label="密码"> </el-table-column>
        <el-table-column prop="phone" label="手机号"> </el-table-column>

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
                type="primary"
                icon="el-icon-edit"
                size="small"
                @click="editUser(scope.row)"
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
                @click="deleteUser(scope.row)"
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
import EditUser from "../edit/EditUser";
export default {
  components: {
    "v-editUser": EditUser
  },

  data() {
    return {
      edit: {
        showEdit: false,
        user: {}
      },

      queryInfo: {
        pageNum: 1,
        pageSize: 5
      },
      query: "",
      allUser: [],
      total: 0,
      as: true
    };
  },
  created() {
    this.selectAllUser();
  },
  methods: {
    async selectAllUser() {
      const { data: res } = await this.$http.post(
        "/selectAllUser",
        this.queryInfo
      );
      console.log(res);
      this.allUser = res.users;
      this.total = res.num;
      console.log(this.allUser);
      // this.showAllAdmin = false;
      // this.showAllUser = true;
      // this.showAllRecord = false;
    },
    async selectUser() {
      const { data: res } = await this.$http.get("/selectUser", {
        params: { query: this.query }
      });
      if (res != null) {
        this.allUser = [];
        for (let index = 0; index < res.length; index++) {
          this.allUser.push(res[index]);
          console.log(res[index]);
          console.log(this.allUser);
        }
        this.allUser.push(res);
        console.log("allUser");
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
      this.selectAllUser();
    },
    // 页码值改变触发
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage;
      console.log(newPage);
      this.selectAllUser();
    },
    editUser(item) {
      console.log(this.edit.user);
      this.edit.showEdit = false;
      this.edit.user = item;
      this.edit.showEdit = true;
      console.log(this.edit.user);
    },
    async deleteUser(item) {
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
      const { data: res } = await this.$http.delete(`/user/${item.id}`);
      if (res.status == 10009) {
        this.selectAllUser();
        return this.$message.success("删除成功！！");
      }
      return this.$message.error("删除失败！！");
      console.log(res);
    },
    async forbidden(item) {
      const { data: res } = await this.$http.put("/updateUserState", item);
      console.log(res);
    },
    notShow(bool) {
      console.log("123");
      this.edit.showEdit = bool;
    }
  }
};
</script>
<style scoped></style>
