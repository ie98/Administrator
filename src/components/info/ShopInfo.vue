<template>
  <div>
    <v-editShop
      v-if="edit.showEdit"
      :shop="edit.shop"
      @notShowEdit="notShow"
    ></v-editShop>
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
              @click="selectShop"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <router-link v-if="disabled.add == false" to="/addShop"
            ><el-button :disabled="disabled.add" type="primary"
              >添加</el-button
            ></router-link
          >
        </el-col>
      </el-row>

      <!-- 用户列表区 -->
      <el-table
        class="table"
        border
        stripe
        :data="allShop"
        style="width: 100%;"
      >
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="id" label="id"> </el-table-column>
        <!-- <el-table-column prop="shopid" label="商店ID"> </el-table-column> -->
        <el-table-column prop="shopname" label="商店名称"> </el-table-column>
        <el-table-column prop="principal" label="负责人"> </el-table-column>
        <el-table-column prop="phone" label="手机号"> </el-table-column>
        <el-table-column prop="described" label="商店描述">
          <template slot-scope="scope">
            {{ scope.row.subDescribed }}
            <span
            v-if="scope.row.showButtonDes"
              size="mini"
              class="spanFont"
              @click="showDescribed(scope.row)"
              >more</span
            >
          </template>
        </el-table-column>
        <el-table-column prop="notice" label="提示消息">
          <template slot-scope="scope">
            {{ scope.row.subNotice }}
            <span v-if="scope.row.showButtonNotice" size="mini" class="spanFont" @click="showNotice(scope.row)"
              >more</span
            >
          </template>
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
                @click="editShop(scope.row)"
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
                @click="deleteShop(scope.row)"
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
    <el-dialog
      title="详情"
      :visible.sync="fullRemarks"
      width="50%"
      :before-close="handleClose"
    >
      <el-form>
        <el-form-item prop="detail">
          <el-input :rows="5" type="textarea" v-model="full"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="fullRemarks = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import EditShop from "../edit/EditShop";
export default {
  components: {
    "v-editShop": EditShop
  },

  data() {
    return {
      //完整信息
      fullRemarks: false,
      full: "",
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
        shop: {}
      },

      queryInfo: {
        pageNum: 1,
        pageSize: 5
      },
      query: "",
      allShop: [],
      total: 0,
      as: true
    };
  },
  created() {
    this.selectAllShop();
    this.getAutoArr();
  },
  methods: {
    async selectAllShop() {
      const { data: res } = await this.$http.post(
        "/selectAllShop",
        this.queryInfo
      );

      console.log(res);
      this.allShop = res.list;
      this.total = res.num;
      for (let index = 0; index < this.allShop.length; index++) {
        if (
          this.allShop[index].described == null ||
          this.allShop[index].described == ""
        ) {
          this.allShop[index].described = "";
          this.allShop[index].showButtonDes = false;
        } else {
          this.allShop[index].subDescribed =
            this.allShop[index].described.slice(0, 15) + "...";
          this.allShop[index].showButtonDes = true;
        }

        if (
          this.allShop[index].notice == null ||
          this.allShop[index].notice == ""
        ) {
          this.allShop[index].notice = "";
          this.allShop[index].showButtonNotice = false;
        } else {
          this.allShop[index].subNotice =
            this.allShop[index].notice.slice(0, 15) + "...";
          this.allShop[index].showButtonNotice = true;
        }
      
      }
      console.log(this.allShop);
      // this.showAllAdmin = false;
      // this.showAllUser = true;
      // this.showAllRecord = false;
    },
    async selectShop() {
      const { data: res } = await this.$http.get("/selectShop", {
        params: { query: this.query }
      });
      if (res != null) {
        this.allShop = [];
        for (let index = 0; index < res.length; index++) {
          this.allShop.push(res[index]);
          console.log(res[index]);
          console.log(this.allShop);
        }
        this.allShop.push(res);
        console.log("allShop");
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
      this.selectAllShop();
    },
    // 页码值改变触发
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage;
      console.log(newPage);
      this.selectAllShop();
    },
    editShop(item) {
      console.log(this.edit.shop);
      this.edit.showEdit = false;
      this.edit.shop = item;
      this.edit.showEdit = true;
      console.log(this.edit.shop);
    },
    async deleteShop(item) {
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
      const { data: res } = await this.$http.delete(`/shop/${item.id}`);
      if (res.status == 0) {
        this.selectAllShop();
        return this.$message.success("删除成功！！");
      }
      return this.$message.error("删除失败！！");
      console.log(res);
    },
    async forbidden(item) {
      const { data: res } = await this.$http.put("/updateShopState", item);
      console.log(res);
    },
    notShow(bool) {
      console.log("123");
      this.edit.showEdit = bool;
      this.selectAllShop()
    },
    //显示完整信息
    showDescribed(value) {
      this.full = value.described;
      this.fullRemarks = true;
    },
    showNotice(value) {
      this.full = value.notice;
      this.fullRemarks = true;
    },
    handleClose() {
      this.fullRemarks = false;
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
        if (strs[i] == "401") {
          this.disabled.add = false;
        } else if (strs[i] == "402") {
          this.disabled.delete = false;
        } else if (strs[i] == "403") {
          this.disabled.update = false;
        } else if (strs[i] == "404") {
          this.disabled.select = false;
        } else if (strs[i] == "405") {
          this.disabled.forbidden = false;
        }
      }
    },
    reset(){
      this.disabled.add = true
       this.disabled.delete = true
        this.disabled.update = true
        this.disabled.select = true
        this.disabled.forbidden = true
       
    }
  }
};
</script>
<style scoped>

</style>
