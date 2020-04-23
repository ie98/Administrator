<template>
  <div>
    <!-- <v-editUser
      v-if="edit.showEdit"
      :user="edit.user"
      @notShowEdit="notShow"
    ></v-editUser>
    <router-view></router-view> -->
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
              @click="selectRecord"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <router-link to="/addUser"
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
        :data="allRecord"
        style="width: 100%;"
      >
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="username" label="姓名"> </el-table-column>
        <el-table-column prop="id" label="id"> </el-table-column>
        <el-table-column prop="college" label="学院"> </el-table-column>
        <el-table-column prop="grade" label="年级"> </el-table-column>
        <el-table-column prop="allpeople" label="所有人名称"> </el-table-column>
        <el-table-column prop="phone" label="手机号"> </el-table-column>
        <el-table-column prop="indate" label="入座时间"> </el-table-column>

        <el-table-column prop="remarks" label="详情">
          <template slot-scope="scope">
            {{ scope.row.subRemarks }}
            <span v-if="scope.row.showRemarks" size="mini" type="success" class="spanFont" @click="showRemarks(scope.row)">more</span>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="编辑详情"
              placement="top"
              :enterable="false"
            >
              <el-button
                :disabled="disabled.update"
                type="primary"
                icon="el-icon-edit"
                size="small"
                @click="editRemarks(scope.row)"
                >详情
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
                @click="deleteRecord(scope.row)"
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
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-form>
        <el-form-item prop="detail">
          <el-input
            :rows="5"
            type="textarea"
            v-model="ruleForm.remarks"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="remarksConfirm">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="详情"
      :visible.sync="fullRemarks"
      width="50%"
      :before-close="handleClose"
    >
      <el-form>
        <el-form-item prop="detail">
          <el-input
            :rows="5"
            type="textarea"
            v-model="ruleForm.remarks"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="fullRemarks = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //查询关键字
      query: "",
      //分页信息
      queryInfo: {
        pageNum: 1,
        pageSize: 5
      },
      total: 0,
      //权限显示
      disabled: {
        add: true,
        delete: true,
        update: true,
        select: true,
        detail: true
      },
      allRecord: [],
      dialogVisible: false,
      ruleForm: {
        id: "",
        remarks: ""
      },
      fullRemarks: false
    };
  },
  created() {
    this.selectAllRecord();
    this.getAutoArr();
  },
  methods: {
    async selectAllRecord() {
      const { data: res } = await this.$http.post(
        "/selectAllRecord",
        this.queryInfo
      );
      console.log(res);
      console.log("124567897946");
      console.log(res);

        for (let index = 0; index < res.length; index++) {
              res[index].indate = this.timestampToTime (res[index].indate)
          }
      this.allRecord = res.list;
      this.total = res.num;
      for (let index = 0; index < this.allRecord.length; index++) {
        if(this.allRecord[index].remarks == null || this.allRecord[index].remarks == "" ) {
          this.allRecord[index].remarks = ''
          this.allRecord[index].showRemarks = false
        }

       else{
        this.allRecord[index].subRemarks = this.allRecord[index].remarks.slice(0, 8) + "。。。";
         this.allRecord[index].showRemarks = true
       }

      }
    },
    //搜索记录
    async selectRecord() {
      const { data: res } = await this.$http.get("/selectRecord", {
        params: { query: this.query }
      });
      if (res != null) {
        this.allRecord = [];
        for (let index = 0; index < res.length; index++) {
          this.allRecord.push(res[index]);
          console.log(res[index]);
          console.log(this.allRecord);
        }
        this.allUser.push(res);
        console.log("allRecord");
        console.log(res);
      } else {
        this.$message.error("没有这个人的记录");
      }
    },
    //----毫秒值转时间
    timestampToTime(cjsj) {
      var date = new Date(cjsj); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate() + " ";
      var h = date.getHours() + ":";
      var m = date.getMinutes() + ":";
      var s = date.getSeconds();
      return Y + M + D + h + m + s;
    },
    //编辑remarks
    editRemarks(value) {
      this.dialogVisible = true;
      this.ruleForm.id = value.id;
      this.ruleForm.remarks = value.remarks;
      console.log(value.remarks);
    },
    async remarksConfirm() {
      const { data: res } = await this.$http.post(
        `/editRemarks`,
        this.ruleForm
      );
      console.log(res);
      this.dialogVisible = false;
      this.selectAllRecord();
    },
    //显示所有remarks
    showRemarks(value) {
      this.ruleForm.remarks = value.remarks;
      this.fullRemarks = true
    },
    async deleteRecord(item) {
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
      const { data: res } = await this.$http.delete(`/record/${item.id}`);
      if (res.status == 0) {
        this.selectAllRecord();
        return this.$message.success("删除成功！！");
      }
      return this.$message.error("删除失败！！");
      console.log(res);
    },
    selectUser() {},
    handleClose() {},
    // 监听pageSize改变是触发
    handleSizeChange(newSize) {
      console.log(newSize);
      this.queryInfo.pageSize = newSize;
      this.queryInfo.pageNum = 1;
      this.selectAllRecord();
    },
    // 页码值改变触发
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage;
      console.log(newPage);
      this.selectAllRecord();
    },
    async getAutoArr() {
      const { data: res } = await this.$http.get("/getAuthorityString", {
        params: { id: window.sessionStorage.getItem("id") }
      });
      this.autoArr = res;
      console.log(res);
      var strs = new Array(); //定义一数组
      strs = res.split(","); //字符分割
      for (var i = 0; i < strs.length; i++) {
        if (strs[i] == "101") {
          this.disabled.select = false;
        } else if (strs[i] == "404") {
          this.disabled.update = false;
        } else if (strs[i] == "403") {
          this.disabled.add = false;
        } else if (strs[i] == "401") {
          this.disabled.delete = false;
        } else if (strs[i] == "405") {
          this.disabled.detail = false;
        }
      }
    }
  }
};
</script>
<style scoped></style>
