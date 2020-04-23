<template>
  <div>
    <v-editFood
      v-if="edit.showEdit"
      :food="edit.food"
      @notShowEdit="notShow"
    ></v-editFood>
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
              @click="selectFood"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <router-link to="/addFood"
            ><el-button :disabled = "disabled.add" type="primary">添加</el-button></router-link
          >
        </el-col>
      </el-row>

      <!-- 用户列表区 -->
      <el-table
        class="table"
        border
        stripe
        :data="allFood"
        style="width: 100%;"
      >
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="id" label="id"> </el-table-column>
        <el-table-column prop="foodid" label="食品ID"> </el-table-column>
        <el-table-column prop="foodname" label="食品名称"> </el-table-column>
        <el-table-column prop="price" label="价格"> </el-table-column>
        <el-table-column prop="shopname" label="商店名称"> </el-table-column>
          <el-table-column prop="img" label="图片名称"> </el-table-column>
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
                v-model="scope.row.forbid"
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
                @click="editFood(scope.row)"
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
                @click="deleteFood(scope.row)"
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
import EditFood from "../edit/EditFood";
export default {
  components: {
    "v-editFood": EditFood
  },

  data() {
    return {
      //权限信息
      autoArr: "",
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
        food: {}
      },

      queryInfo: {
        pageNum: 1,
        pageSize: 5
      },
      query: "",
      allFood: [],
      total: 0,
      as: true
    };
  },
  created() {
    this.selectAllFood();
    this.getAutoArr()
  },
  methods: {
    async selectAllFood() {
      const { data: res } = await this.$http.post(
        "/selectAllFood",
        this.queryInfo
      );
      console.log(res);
      this.allFood = res.list;
      this.total = res.num;
      console.log(this.allFood);
      // this.showAllAdmin = false;
      // this.showAllUser = true;
      // this.showAllRecord = false;
    },
    async selectFood() {
      const { data: res } = await this.$http.get("/selectFood", {
        params: { query: this.query }
      });
      if (res != null) {
        this.allFood = [];
        for (let index = 0; index < res.length; index++) {
          this.allFood.push(res[index]);
          console.log(res[index]);
          console.log(this.allFood);
        }
        this.allFood.push(res);
        console.log("allFood");
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
      this.selectAllFood();
    },
    // 页码值改变触发
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage;
      console.log(newPage);
      this.selectAllFood();
    },
    editFood(item) {
      console.log(this.edit.food);
      this.edit.showEdit = false;
      this.edit.food = item;
      this.edit.showEdit = true;
      console.log( this.edit.showEdit)
      console.log(this.edit.food);
    },
    async deleteFood(item) {
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
      const { data: res } = await this.$http.delete(`/food/${item.id}`);
      if (res.status == 0) {
        this.selectAllFood();
        return this.$message.success("删除成功！！");
      }
      return this.$message.error("删除失败！！");
      console.log(res);
    },
    async forbidden(item) {
      const { data: res } = await this.$http.put("/updateFoodState", item);
      console.log(res);
    },
    notShow(bool) {
      console.log("123");
      this.edit.showEdit = bool;
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
        if(strs[i] == '101'){
              this.disabled.select = false
        }else if(strs[i] == '102'){
              this.disabled.update = false
        }else if(strs[i] == '103'){
              this.disabled.add = false
        }else if(strs[i] == '104'){
              this.disabled.delete = false
        }else if(strs[i] == '105'){
              this.disabled.forbidden = false
        }
      }
    }
  }
};
</script>
<style scoped></style>
