<template>
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="10%"
    :before-close="handleClose"
  >
  <el-dialog
      width="30%"
      title="内层 Dialog"
      :visible.sync="innerVisible"
      append-to-body>
      <el-upload
              class="upload-demo"
              ref="upload"
              accept="image/png,image/gif,image/jpg,image/jpeg"
              :limit="limit"
              action="http://127.0.0.1:8088/uploadImg"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :auto-upload="false"
              :data="ruleForm2"
              :before-upload = "beforeAvatarUpload"
              :on-success= "onSuccess"
            >
              <el-button slot="trigger" size="small" type="primary"
                >选取文件</el-button
              >
              <el-button
                style="margin-left: 10px;"
                size="small"
                type="success"
                @click="submitUpload"
                >上传到服务器</el-button
              >
              <div slot="tip" class="el-upload__tip">
                只能上传jpg/png文件，且不超过500kb
              </div>
            </el-upload>
    </el-dialog>
    <div class="register-wrapper">
      <div id="register">
        <p class="title">添加食品</p>
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
          <!-- <el-form-item prop="img">
            <el-input
            disabled
              v-model="ruleForm2.img"
              auto-complete="off"
              placeholder="输入图片名称"
            ></el-input>
          </el-form-item> -->
          <!-- <el-form-item prop="img">
            
          </el-form-item> -->

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
        //内层
        innerVisible :false,
       
        limit:1,
      //权限信息
      autoArr: "",
      dialogVisible: false,
      ruleForm2: {
        foodname: "",
        prie: "",
        shopname: "",
        img: ""
      },
      //上传地址
      action:'',

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
      allShop: []
    };
  },
  created() {
    this.dialogVisible = true;
    this.getAllShop();
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
              "/addFood",
              this.ruleForm2
            );
            console.log(res);
            if (res.status == "0") {
                this.$message.success("添加成功");
            //   setTimeout(() => {
                
            //     this.$router.push({
            //       path: "/foodInfo"
            //     });
            //   }, 300);
            //打开内层
            this.dialogVisible = false
            this.innerVisible = true
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
    cancel() {
      this.dialogVisible = false;
      setTimeout(() => {
        this.$router.push("/foodInfo");
      }, 300);
    },

    //获取权限
    async getAutoArr() {
      const { data: res } = await this.$http.get("/getAuthority", {
        params: { id: window.sessionStorage.getItem("id") }
      });
      this.autoArr = res;
      console.log(res);
    },
    //获取所有店铺名
    async getAllShop() {
      const { data: res } = await this.$http.get(`/getAllShop`, {
        params: {}
      });
      console.log(res);
      this.allShop = res;
    },
    //图片文件校验
    beforeAvatarUpload:function(file){

      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      const isPG = (isJPG || isPNG)                                       //限制图片格式为jpg / png
      const isLt2M = file.size / 1024 / 1024 < 2;                         //限制图片大小
      const isSize = new Promise(function(resolve,reject) {
          let width = 600
          let height = 400
          let _URL = window.URL || window.webkitURL
          let img = new Image()
          img.onload = function() {
              let valid = img.width >= width && img.height >= height
              valid ? resolve() : reject();
          }
          img.src = _URL.createObjectURL(file)
      }).then(() => {
          return file;
      },()=>{
          this.$message.error('上传图片像素要大于600*400!');
          return promise.reject();
      })
      if (!isPG) {
          this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!');
      }
      if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
      }
        return isPG && isLt2M && isSize
    },
    onSuccess(v1,file){
        console.log(file.type)
        // this.ruleForm2.img =  Math.random() + file.name
        this.dialogVisible = false
        this.innerVisible = false

    },
    //查询图片名称是否存在
     submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
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
