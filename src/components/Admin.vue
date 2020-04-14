<template>
  <div>
    <el-container>
      <el-header class="header">
        <el-menu
          class="el-menu-demo"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
        >
          <el-menu-item index="1">处理中心</el-menu-item>
          <el-submenu index="2">
            <template slot="title">用户信息</template>
            <el-menu-item index="/adminInfo" 
              >管理员信息</el-menu-item
            >
            <el-menu-item index="/userInfo" 
              >普通用户信息</el-menu-item
            >
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">座位中心</template>
            <el-menu-item index="/recordInfo" 
              >抢座记录</el-menu-item
            >
          </el-submenu>

          <el-menu-item index="4"
            ><a href="https://www.ele.me" target="_blank"
              >订单管理</a
            ></el-menu-item
          >
           <el-menu-item index="5">
             <router-link to='/case'>订单管理</router-link>
            </el-menu-item
          >
        </el-menu>
        <span> Admin</span>
        </el-header
      >

      <el-main style=" height:1000px ; background:#D0D0D0">
        <router-view></router-view>
        <!-- <div v-if="showtable">
        
          <el-table
            v-if="showAllAdmin"
            :data="allAdmin"
            border
            style="width: 100%;"
          >
            <el-table-column prop="username" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="authority" label="权限" width="180">
            </el-table-column>
            <el-table-column prop="shopname" label="店铺名称" width="180">
            </el-table-column>
            <el-table-column prop="phone" label="手机号码" width="180">
            </el-table-column>
          </el-table>
          <el-table
            v-if="showAllRecord"
            :data="allRecord"
            border
            style="width: 100%;"
          >
            <el-table-column prop="username" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="college" label="学院" width="180">
            </el-table-column>
            <el-table-column prop="grade" label="年级" width="180">
            </el-table-column>
            <el-table-column prop="allpeople" label="所有人名称" width="180">
            </el-table-column>
            <el-table-column prop="location" label="位置" width="180">
            </el-table-column>
            <el-table-column prop="sit" label="座位" width="180">
            </el-table-column>
            <el-table-column prop="phone" label="联系方式" width="180">
            </el-table-column>
            <el-table-column prop="remarks" label="备注" width="180">
            </el-table-column>
            <el-table-column label="操作" width="120">
              <template>
                <el-button type="text" size="small" @click="updateRemarks()">
                  修改备注
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div> -->
        <!-- <div v-if="showfoods">
          <el-row>
  <el-col :span="4">

   <div class="product-main">
     <h4>天庭水果铺</h4>
            <img :src="info.image" style=" height:100px ; width : 80%"  >
            <h4>{{ info.name }}</h4>
            
            <div > <el-input-number v-model="info.num"  :min="0" :max="10" size="small" label="描述文字"></el-input-number></div>
            <div class="product-cost">¥ {{ info.cost }}</div>
        
   </div>

  </el-col>

</el-row>
        </div> -->

      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {

      showAllUser: false,
      showAllAdmin: false,
      showAllRecord: false,
      showtable:true,
      showfoods:true,
      allUser: [],
      allAdmin: [],
      allRecord: [],
      foodDetail:
        {
          imgurl: '../assets/imgs/logo.png' ,
          price : 15.5,
          foodname:'西瓜',
          detail:'清凉解暑',
          shopname: '天庭水果铺'
        },
          info: {
                image:require('D:/vueProject/vue_proj_01/src/assets/imgs/asd.jpg'),
                id:1,
                name:'西瓜',
                color:'#dac272',
                cost:15.5,
                num:0
            }
      
    };
  },
  methods: {
    async selectAllAdmin() {
      const { data: res } = await this.$http.post("/selectAllAdmin", {});
      console.log(res);
      this.allAdmin = res;
      this.showAllAdmin = true;
      this.showAllUser = false;
      this.showAllRecord = false;
    },

    async selectAllRecord() {
      const { data: res } = await this.$http.post("/selectAllRecord", {});
      console.log(res);
      this.allRecord = res;
      console.log(this.allRecord);
      this.showAllAdmin = false;
      this.showAllUser = false;
      this.showAllRecord = true;
    },
    updateRemarks() {},
  },
};

</script>
<style scoped>
.header {
  width: 100%;
  margin: 0;
  padding: 0;
}
.table {
  margin: 0 auto;
}
  .product{
        width: 100%;
        float: left;
    }
    .product-main{
        display: block;
        margin: 16px;
        padding: 16px;
        border: 1px solid #dddee1;
        border-radius: 6px;
        overflow: hidden;
        background: #AEDD81;
        text-align: center;
        position: relative;
    }
    .product-main img{
        width: 100%;
    }
    h4{
        color: #222;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 13px;
    }
    /* .product-main:hover h4{
        color: #0070c9;
    } */
    .product-color{
        display: block;
        width: 16px;
        height: 16px;
        border: 1px solid #dddee1;
        border-radius: 50%;
        margin: 6px auto;
    }
    .product-cost{
        color: #de4037;
        margin-top: 6px;
    }
    .product-add-cart{
        display: none;
        padding: 4px 8px;
        background: #2d8cf0;
        color: #fff;
        font-size: 12px;
        border-radius: 3px;
        cursor: pointer;
        position: absolute;
        top: 5px;
        right: 5px;
    }
    .product-main:hover .product-add-cart{
        display: inline-block;
    }
</style>
