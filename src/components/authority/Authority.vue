<template>
  <div>
       <v-editRole
      v-if="edit.showEdit"
      :role="edit.role"
      @notShowEdit="notShow"
    ></v-editRole>
    <router-view></router-view>
    <el-card>
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
              @click="selectRole"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <router-link to="/addRole"
            ><el-button :disabled = "disabled.add" type="primary">添加</el-button></router-link
          >
        </el-col>
      </el-row>
      <el-table :data="allRole" border style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row
              :class="['bdbottom', i1 === 0 ? 'bdtop' : '', 'vcenter']"
              v-for="(item, i1) in scope.row.authorities"
              :key="item.id"
            >
              <el-col :span="6"
                ><el-tag>{{ item.authorityname }}</el-tag>
                <i class="el-icon-caret-right"></i
              ></el-col>
              <el-col :span="18">
                <el-row>
                  <el-col :span="6" v-for="auto in item.son" :key="auto.id">
                    <el-tag
                      type="success"
                      closable
                      @close="deleteAuthorityByid(scope.row, item, auto)"
                      >{{ auto.authorityname }}</el-tag
                    >
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="id"> </el-table-column>
        <el-table-column prop="name" label="职位"> </el-table-column>
        <el-table-column prop="detail" label="描述"> </el-table-column>
        <el-table-column label="功能">
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
                @click="editRole(scope.row)"
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
                @click="deleteRole(scope.row)"
              >
              </el-button>
            </el-tooltip>
            <el-button
            :disabled="disabled.update"
              type="success"
              label=" "
              @click="showSetRightDialog(scope.row)"
              >修改权限</el-button
            >
          
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
      title="提示"
      :visible.sync="showSetRightDialogVisible"
      width="40%"
      :before-close="SetRightDialoghandleClose"
    >
      <!-- 树形空间 -->
      <el-tree
        :data="allAuthorityList"
        :default-checked-keys="defKeys"
        :props="treeProps"
        show-checkbox
        node-key="authorityid"
        default-expand-all
        ref="treeRef"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showSetRightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotRights">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import EditRole from "../edit/EditRole";
export default {
  components: {
    "v-editRole": EditRole
  },

  data() {
    return {
      //查询 分页
        queryInfo: {
        pageNum: 1,
        pageSize: 5
      },
      query: "",
      total: 0,
      //权限信息
      autoArr: "",
      //是否显示
      disabled: {
       
        delete: true,
        update: true,
        add:true
       
      },
      authority: [],
      allRole: [],
      RII: {
        role: {},
        fatherId: "",
        sonId: ""
      },
      //修改角色
        edit: {
        showEdit: false,
        user: {}
      },
      //默认选中
      defKeys: [],
      //分配权限对话框
      showSetRightDialogVisible: false,
      allAuthorityList: [],
      //树形控件属性绑定
      treeProps: {
        children: "son",
        label: "authorityname"
      },
      updateAuto:{
         //当前选中的role的id
      roleId:'',
      //修改后的权限
      newAuthority:''
      }
     

    };
  },
  created() {
    this.selectAllAutonrityInfo();
    this.getAutoArr()
  },
  methods: {
      // 监听pageSize改变是触发
    handleSizeChange(newSize) {
      console.log(newSize);
      this.queryInfo.pageSize = newSize;
      this.queryInfo.pageNum = 1;
      this.selectAllAutonrityInfo();
    },
    // 页码值改变触发
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage;
      console.log(newPage);
      this.selectAllAutonrityInfo();
    },
    //全部角色和权限
    async selectAllAutonrityInfo() {
      const { data: res } = await this.$http.post(
        "/selectAllRoleAndAuthority",
        this.queryInfo
      );
      this.allRole = res.list;
       this.total = res.num;
      console.log(res);
    },
    async getAuthorityById(item) {
      console.log(item);
      const { data: res } = await this.$http.get("/getAuthority", {
        params: { id: item.id }
      });
      this.authority = res;
      console.log(res);
    },
    //删除角色
     async deleteRole(item) {
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
      const { data: res } = await this.$http.delete(`/role/${item.id}`);
      if (res.status == 0) {
        this.selectAllAutonrityInfo();
        return this.$message.success("删除成功！！");
      }
      return this.$message.error("删除失败！！");
      console.log(res);
    },
    //修改角色信息
      editRole(item) {
      // console.log(this.edit.user);
      this.edit.showEdit = false;
      this.edit.role = item;
      this.edit.showEdit = true;
      // console.log(this.edit.user);
    },
    //查找角色
       async selectRole() {
      const { data: res } = await this.$http.get("/selectRole", {
        params: { query: this.query }
      });
      if (res != null) {
        this.allUser = [];
        for (let index = 0; index < res.length; index++) {
          this.allRole.push(res[index]);
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
    //删除权限
    async deleteAuthorityByid(v1, v2, v3) {
      if(this.disabled.delete == true){
          return this.$message.error("没有删除的权限")
      }
       
      console.log(v1);
      console.log(v2);
      const confirmResult = await this.$confirm(
        "此操作将永久删除该文件, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).catch(err => err);

      if (confirmResult !== "confirm") {
        return this.$message.info("已取消删除操作。");
      }
      this.RII.role = v1;
      this.RII.fatherId = v2.authorityid;
      this.RII.sonId = v3.authorityid;
      console.log(this.RII);
      const { data: res } = await this.$http.post(
        "/deleteAuthorityByid",
        this.RII
      );
      console.log(res);
      if (res.meta.status == 0) {
        this.$message.success("删除成功！");
        // this.selectAllAutonrityInfo()  //全部刷新
        v1.authorities = res.authorities; //局部刷新
        this.disabled.update = true
        this.disabled.delete = true
        this.getAutoArr()

      } else{
        
         return this.$message.success("删除失败！");
      }
    },
    //分配权限
    showSetRightDialog(values) {
      this.updateAuto.roleId = values.id
      this.allAuthorityTree();
      console.log(this.allAuthorityList);
      console.log(values.authorities.length)
      for (var index = 0; index < values.authorities.length; index++) {
        console.log('33333333')
        this.getLeafKeys(values.authorities[index], this.defKeys);
      }
      console.log('111111111')
      console.log(this.defKeys)
      this.showSetRightDialogVisible = true;
    },
    //关闭分配权限弹框
    SetRightDialoghandleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.defKeys = []
          done();
        })
        .catch(_ => {});
    },
    //获取全部权限信息
    async allAuthorityTree() {
      const { data: res } = await this.$http.post("/allAuthorityTree", {});
      this.allAuthorityList = res;
      console.log(this.allAuthorityList);
    },
    getLeafKeys(node, arr) {
      console.log(node.son.length);
      if (node.son.length == 0) {
        arr.push(node.authorityid);
      }
      node.son.forEach(item => {
       this.getLeafKeys(item, arr)
      });
    },
    //分配权限
    async allotRights(){
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys()
        ]
        
      console.log(keys)
      const idStr = keys.join(',') 
      console.log(idStr)
      this.updateAuto.newAuthority = idStr
      const { data: res } = await this.$http.post('/updateAuthority', this.updateAuto)
      console.log(res)
      if(res.status == 0){
        this.$message.success("修改成功")
        this.showSetRightDialogVisible = false
         this.selectAllAutonrityInfo()
         this.defKeys = []
         this.getAutoArr()

      }
    },
    //接收子组件传递参数
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
        if(strs[i] === '301'){
              this.disabled.update = false
              console.log('301')
        }else
        if(strs[i] == '303'){
              this.disabled.delete = false
              console.log('303')
        }else
         if(strs[i] == '304'){
              this.disabled.add = false
              console.log('304')
        }
      }
    }
  }
};
</script>
<style scoped>
.el-tag {
  margin: 7px;
}
.bdtop {
  border-top: 1px solid #eee;
}
.bdbottom {
  border-bottom: 1px solid #eee;
}
.vcenter {
  display: flex;
  align-items: center;
}
</style>
