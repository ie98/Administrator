<template>
  <el-dialog
    width="1%"
    :visible.sync="dialogVisible"
    :before-close="handleClose"
    center
  >
    <div class="register-wrapper">
      <div id="register">
        <p class="title">编辑</p>
        <el-form
          :model="ruleForm2"
          status-icon
          :rules="rules2"
          ref="ruleForm2"
          label-width="80px"
          class="demo-ruleForm"
         
        
        >
          <el-form-item label="用户名" required prop="username">
            <el-input
              v-model="ruleForm2.username"
              auto-complete="off"
              placeholder="请输如用户名"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" required prop="password">
            <el-input
              v-model="ruleForm2.password"
              auto-complete="off"
              placeholder="输入密码"
            ></el-input>
          </el-form-item>

          <el-form-item label="店铺名" required prop="shopname">
            <el-select
              v-model="ruleForm2.shopname"
              style="width:100%"
              placeholder="请选择所在店铺"
            >
              <el-option
                v-for="item in allShop"
                :key="item.id"
                :label="item.shopname"
                :value="item.shopname"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="职位" required prop="status">
            <el-input
              v-model="ruleForm2.status"
              auto-complete="off"
              placeholder="请输入职位"
            ></el-input>
          </el-form-item>
          <el-form-item label="手机号" required prop="phone">
            <el-input
              v-model="ruleForm2.phone"
              placeholder="请输入手机号"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="submitForm('ruleForm2')"
              >注册</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: ["admin"],
  data() {
    return {
      //权限信息
      autoArr: "",
      dialogVisible: true,
      notshow: false,
      ruleForm2: {
        username: "",
        password: "",
        status: "",
        shopname: "",
        authority: 4,
        phone: "",
        shopid: ""
      },

      rules2: {
        username: [
          { require: true, message: "必须填写用户名", trigger: "blur" },
          { min: 4, max: 12, message: "长度在4到12个字符之间", trigger: "blur" }
        ],
        passwors: [
          { require: true, message: "必须填写密码", trigger: "blur" },
          { min: 4, max: 12, message: "长度在8到24个字符之间", trigger: "blur" }
        ],
        status: [{ require: true, message: "必须填写职位", trigger: "blur" }],
        shopname: [
          { require: true, message: "必须选择店铺名称", trigger: "blur" }
        ],
        phone: [{ require: true, message: "必须填写手机号", trigger: "blur" }]
      },
      flag: true,
      //所有商店名称
      allShop: []
    };
  },
  created() {
    // console.log("123")
    //  console.log(this.admin)
    // console.log(this.$route)
    this.getAllShop();
    this.ruleForm2 = this.admin;
  },

  methods: {
    async getAllShop() {
      const { data: res } = await this.$http.get(`/getAllShop`, {
        params: {}
      });
      console.log(res);
      this.allShop = res;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    submitForm(formName) {
      if (this.check()) {
        this.$refs[formName].validate(async valid => {
          if (valid) {
            const { data: res } = await this.$http.post(
              "/editAdmin",
              this.ruleForm2
            );
            console.log(res);
            if (res.status == "10011") {
              setTimeout(() => {
                this.$message.success(res.message);
                this.$emit("notShowEdit", this.notshow);
              }, 300);
            } else {
              this.$message(res.message);
            }
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      }
    },

    check() {
      if (!/^1[3456789]\d{9}$/.test(this.ruleForm2.phone)) {
        this.$message.error("手机号码有误，请重填");
        return false;
      } else if (
        this.ruleForm2.username == "" ||
        this.ruleForm2.username == null
      ) {
        this.$message.error("用户名不能为空");
        return false;
      } else if (
        this.ruleForm2.password == "" ||
        this.ruleForm2.password == null
      ) {
        this.$message.error("密码不能为空");
        return false;
      } else if (this.ruleForm2.status == "" || this.ruleForm2.status == null) {
        this.$message.error("职位不能为空");
        return false;
      } else if (
        this.ruleForm2.shopname == "" ||
        this.ruleForm2.shopname == null
      ) {
        this.$message.error("店铺名称不能为空");
        return false;
      } else {
        return true;
      }
    },
    cancel() {
      //   this.dialogVisible  = false
      //   setTimeout(()=>{
      //       this.$router.push('/userInfo')
      //   },300)
      this.$emit("notShowEdit", this.notshow);
    },
    //获取权限
    async getAutoArr() {
      const { data: res } = await this.$http.get("/getAuthority", {
        params: { id: window.sessionStorage.getItem("id") }
      });
      this.autoArr = res;
      console.log(res);
    }
  }
};
</script>

<style scoped>

.loading-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: #aedff8;
  display: flex;
  align-items: center;
  justify-content: center;
}
.register-wrapper img {
  position: absolute;
  z-index: 1;
}
.register-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}
#register {
  max-width: 340px;
  margin: 60px auto;
  background: #fff;
  padding: 20px 40px;
  border-radius: 10px;
  position: relative;
  z-index: 9;
}
.title {
  font-size: 26px;
  line-height: 50px;
  font-weight: bold;
  margin: 10px;
  text-align: center;
}
.el-form-item {
  text-align: center;
}
.login {
  margin-top: 10px;
  font-size: 14px;
  line-height: 22px;
  color: #1ab2ff;
  cursor: pointer;
  text-align: left;
  text-indent: 8px;
  width: 160px;
}
.login:hover {
  color: #2c2fd6;
}
.code >>> .el-form-item__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.code button {
  margin-left: 20px;
  width: 140px;
  text-align: center;
}
.el-button--primary:focus {
  background: #409eff;
  border-color: #409eff;
  color: #fff;
}
</style>
