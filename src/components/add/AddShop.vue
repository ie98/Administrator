<template>
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="10%"
    :before-close="handleClose"
  >
    <div class="register-wrapper">
      <div id="register">
        <p class="title">添加商店</p>
        <el-form
          :model="ruleForm2"
          status-icon
          :rules="rules2"
          ref="ruleForm2"
          label-width="0"
          class="demo-ruleForm"
        >
          <!-- <el-form-item prop="shopid">
            <el-input
              v-model="ruleForm2.shopid"
              auto-complete="off"
              placeholder="请输入店铺ID"
            ></el-input>
          </el-form-item> -->
          <el-form-item prop="shopname">
            <el-input
              
              v-model="ruleForm2.shopname"
              auto-complete="off"
              placeholder="请输入店铺名称"
            ></el-input>
          </el-form-item>
           <el-form-item prop="principal">
            <el-input
              
              v-model="ruleForm2.principal"
              auto-complete="off"
              placeholder="请输入负责人名称"
            ></el-input>
          </el-form-item>
           <el-form-item prop="phone">
            <el-input
              
              v-model="ruleForm2.phone"
              auto-complete="off"
              placeholder="请输入负责人手机号码"
            ></el-input>
          </el-form-item>
          <el-form-item prop="described">
             <el-input
            :rows="5"
            type="textarea"
            v-model="ruleForm2.described"
            placeholder="请输入具体描述"
          ></el-input>
          </el-form-item>
          <el-form-item prop="notice">
             <el-input
            :rows="5"
            type="textarea"
            v-model="ruleForm2.notice"

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
        shopid:'',
        shopname:'',
        described:'',
        notice:''
      },

      rules2: {
        shopname: [
          { require: true, message: "必须填写店铺名", trigger: "blur" },
          { min: 2, max: 10, message: "长度在2到10个字符之间", trigger: "blur" }
        ],
        // shopid: [
        //   { require: true, message: "必须填写店铺ID", trigger: "blur" },
        // //   { min: 4, max: 12, message: "长度在8到24个字符之间", trigger: "blur" }
        // ],
        principal:[
           { require: true, message: "必须填写负责人信息", trigger: "blur" }
        ],
         phone:[
          { require: true, message: "必须填写手机号", trigger: "blur" }
        ]
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
            "/addShop",
            this.ruleForm2
          );
          console.log(res);
          if (res.status == 0) {
            setTimeout(() => {
              this.$message.success("添加成功");
              this.$router.push({
                path: "/shopInfo"
              });
            }, 300);
          } else {
            this.$message.error(res.message);
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
    } else  if(this.ruleForm2.principal == '' || this.ruleForm2.principal == null){
      this.$message.error("负责人不能为空")
       return false
  }else if(this.ruleForm2.shopname == '' || this.ruleForm2.shopname == null){
      this.$message.error("店铺名不能为空")
       return false
  }
  // else if(this.ruleForm2.shopid == '' || this.ruleForm2.shopid == null){
  //     this.$message.error("店铺ID不能为空")
  //      return false
  // }
  else{
      return true
  }
  },
  cancel(){
      this.dialogVisible  = false
      setTimeout(()=>{
          this.$router.push('/shopInfo')
      },300)
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
