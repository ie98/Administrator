<template>
  <el-dialog
    title="提示"
    width="30%"
    :visible.sync="dialogVisible"
    :before-close="handleClose"
  >
    <div class="register-wrapper">
      <div id="register">
        <p class="title">123</p>
        <el-form
          :model="ruleForm2"
          status-icon
          :rules="rules2"
          ref="ruleForm2"
          label-width="0"
          class="demo-ruleForm"
        >
          <el-form-item prop="username">
            <el-input
              v-model="ruleForm2.username"
              auto-complete="off"
              placeholder="请输如用户名"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              
              v-model="ruleForm2.password"
              auto-complete="off"
              placeholder="输入密码"
            ></el-input>
          </el-form-item>

          <el-form-item>
              
            <el-select v-model="ruleForm2.college" style="width:100%" placeholder="请选择专业院校">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
         
          <el-form-item prop="grade">
              
            <el-select v-model="ruleForm2.grade"  style="width:100%" placeholder="请选择年级">
              <el-option :label="16" :value="16"> </el-option>
              <el-option :label="17" :value="17"> </el-option>
              <el-option :label="18" :value="18"> </el-option>
              <el-option :label="19" :value="19"> </el-option>
              <el-option :label="20" :value="20"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="phone">
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
    props:['user'],
  data() {
   
    return {
        dialogVisible:true,
        notshow:false,
      ruleForm2: {
        username: "",
        password: "",
        checkPass: "",
        college: "",
        grade: 16,
        phone: ""
      },
      rules2: {
        // pass: [{ validator: validatePass, trigger: "change" }],
        username: [
          { require: true, message: "必须填写用户名", trigger: "blur" },
          { min: 4, max: 12, message: "长度在4到12个字符之间", trigger: "blur" }
        ],
        passwors: [
          { require: true, message: "必须填写密码", trigger: "blur" },
          { min: 4, max: 12, message: "长度在8到24个字符之间", trigger: "blur" }
        ],
        college: [
          { require: true, message: "必须选择院校", trigger: "blur" }
        ],
        phone:[
          { require: true, message: "必须填写手机号", trigger: "blur" }
        ]
      },
      flag: true,
      options: [
        {
          value: "计算机",
          label: "计算机"
        },
        {
          value: "软件工程",
          label: "软件工程"
        },
        {
          value: "电气",
          label: "电气"
        },
        {
          value: "网络通信",
          label: "网络通信"
        },
        {
          value: "信息安全",
          label: "信息安全"
        }
      ]
    };
  },
  created(){

      console.log("123")
       console.log(this.user)
      console.log(this.$route)

      this.ruleForm2 = this.user

  },

  methods: {

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
            "/editUser",
            this.ruleForm2
          );
          console.log(res);
          if (res.status == "10011") {
            setTimeout(() => {
              this.$message.success(res.message);
                this.$emit('notShowEdit',this.notshow)
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
    } else  if(this.ruleForm2.username == '' || this.ruleForm2.username == null){
      this.$message.error("用户名不能为空")
       return false
  }else if(this.ruleForm2.password == '' || this.ruleForm2.password == null){
      this.$message.error("密码不能为空")
       return false
  }else if(this.ruleForm2.college == '' || this.ruleForm2.college == null){
      this.$message.error("学院不能为空")
       return false
  }else if(this.ruleForm2.grade == '' || this.ruleForm2.grade == null){
      this.$message.error("年级不能为空")
       return false
  }else{
      return true
  }
  },
  cancel(){
    //   this.dialogVisible  = false
    //   setTimeout(()=>{
    //       this.$router.push('/userInfo')
    //   },300)
    this.$emit('notShowEdit',this.notshow)
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
