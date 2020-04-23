<template>
  <el-dialog
    title="提示"
    width="1%"
    :visible.sync="dialogVisible"
    :before-close="handleClose"
  >
 <div class="register-wrapper">
      <div id="register">
        <p class="title">编辑</p>
        <el-form
          :model="ruleForm2"
          status-icon
          :rules="rules2"
          ref="ruleForm2"
          label-width="0"
          class="demo-ruleForm"
        >
  
    <el-form-item prop="foodname">
            <el-input
              v-model="ruleForm2.foodname"
              auto-complete="off"
              placeholder="请输如食品名"
            ></el-input>
          </el-form-item>
          <el-form-item prop="price">
            <el-input
              v-model="ruleForm2.price"
              auto-complete="off"
              placeholder="输入价格"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-select
              v-model="ruleForm2.shopname"
              style="width:100%"
              placeholder="请选择店铺"
            >
              <el-option
                v-for="item in allShop"
                :key="item.value"
                :label="item.shopname"
                :value="item.shopname"
              >
              </el-option>
            </el-select>
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
    props:['food'],
  data() {
   
    return {
      allShop:[],
      //权限信息
      autoArr:'',
        dialogVisible:true,
        notshow:false,
     ruleForm2: {
        foodname: "",
        prie: "",
        shopname: "",
        img: ""
      },
     rules2: {
    
        foodname: [
          { require: true, message: "必须填写食品名", trigger: "blur" },
          { min: 1, max: 10, message: "长度在1到10个字符之间", trigger: "blur" }
        ],
        shopname: [
          { require: true, message: "必须填写店铺名", trigger: "blur" },
        ],
        price: [{ require: true, message: "必须填写价格", trigger: "blur" }],
        img: [{ require: true, message: "必须填写图片名", trigger: "blur" }]
      },
      flag: true,
   
    };
  },
  created(){

      // console.log("123")
      //  console.log(this.user)
      // console.log(this.$route)

      this.ruleForm2 = this.food
      this.getAllShop()

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
            "/editFood",
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
    if (
        this.ruleForm2.foodname == "" ||
        this.ruleForm2.foodname == null
      ) {
        this.$message.error("食品名不能为空");
        return false;
      } else if (
        this.ruleForm2.price == "" ||
        this.ruleForm2.price == null
      ) {
        this.$message.error("价格不能为空");
        return false;
      } else if (
        this.ruleForm2.shopname == "" ||
        this.ruleForm2.shopname == null
      ) {
        this.$message.error("店铺名不能为空");
        return false;
      }  else {
        return true;
      }
    },
  cancel(){
    //   this.dialogVisible  = false
    //   setTimeout(()=>{
    //       this.$router.push('/userInfo')
    //   },300)
    this.$emit('notShowEdit',this.notshow)
  },
  //获取权限
  async getAutoArr(){
    const { data: res } = await this.$http.get('/getAuthority', {
      params: {id:window.sessionStorage.getItem('id')}
    })
    this.autoArr = res;
    console.log(res)
  },
    async getAllShop() {
      const { data: res } = await this.$http.get(`/getAllShop`, {
        params: {}
      });
      console.log(res);
      this.allShop = res;
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
