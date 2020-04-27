<template>
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="10%"
    :before-close="handleClose"
  >
    <div class="register-wrapper">
      <div id="register">
        <p class="title">添加用户</p>
        <el-form
          :model="ruleForm2"
          status-icon
          :rules="rules2"
          ref="ruleForm2"
          label-width="0"
          class="demo-ruleForm"
        >
        <el-form-item prop="name">
            <el-input
              v-model="ruleForm2.name"
            
              placeholder="请输如角色名"
            ></el-input>
          </el-form-item>
          <el-form-item prop="detail">
            <el-input
              v-model="ruleForm2.detail"
        
              placeholder="输入描述"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="submitForm('ruleForm2')"
              >添加</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
 
    return {
      //权限信息
      autoArr:'',
      dialogVisible: false,
      ruleForm2: {
        name: "",
        detail:""
      },

       rules2: {
    
        name: [
          { require: true, message: "必须填写角色名", trigger: "blur" },
          { min: 1, max: 10, message: "长度在1到8个字符之间", trigger: "blur" }
        ],
      },
      flag: true,
     
    };
  },
  created(){
    this.dialogVisible = true
  },
  methods: {
    // addUserconfirm(){
    //     this.dialogVisible = false
    //     setTimeout(() => {
    //   this.$router.push('/userInfo')
    // }, 300)
    // },
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
            "/addRole",
            this.ruleForm2
          );
          console.log(res);
          if (res.status == "0") {
            setTimeout(() => {
              this.$message.success("添加成功");
              this.$router.push({
                path: "/authority"
              });
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
    if (
        this.ruleForm2.name == "" ||
        this.ruleForm2.name == null
      ) {
        this.$message.error("角色名不能为空");
        return false;
      }  else {
        return true;
      }
    },
  cancel(){
      this.dialogVisible  = false
      setTimeout(()=>{
          this.$router.push('/authority')
      },300)
  },



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
