<template>
    <div class="product">
          <el-row type="flex" justify="" >
              <el-col :span="4">
   <!-- <router-link :to="'/product/' + info.id" class="product-main"  > -->
   <div class="product-main">
            <img :src="info.image" style=" height:100px ; width : 80%"  >
            <h4>{{ info.name }}</h4>
            <div > <el-input-number v-model="info.num" @change="handleChange" :min="0" :max="10" size="small" label="描述文字"></el-input-number></div>
            <div class="product-cost">¥ {{ info.cost }}</div>
            <!-- <div class="product-add-cart" @click.prevent="handleCart">加入购物车</div> -->
        <!-- </router-link> -->
   </div>
              </el-col>
               <el-col :span="4">
   <!-- <router-link :to="'/product/' + info.id" class="product-main"  > -->
   <div class="product-main">
            <img :src="info.image" style=" height:100px ; width : 100px"  >
            <h4>{{ info.name }}</h4>
            <div > <el-input-number v-model="info.num" @change="handleChange" :min="0" :max="10" size="small" label="描述文字"></el-input-number></div>
            <div class="product-cost">¥ {{ info.cost }}</div>
            <!-- <div class="product-add-cart" @click.prevent="handleCart">加入购物车</div> -->
        <!-- </router-link> -->
   </div>
              </el-col>
               <el-col :span="4">
   <!-- <router-link :to="'/product/' + info.id" class="product-main"  > -->
   <div class="product-main">
            <img :src="info.image" style=" height:100px ; width : 100px"  >
            <h4>{{ info.name }}</h4>
            <div > <el-input-number v-model="info.num" @change="handleChange" :min="0" :max="10" size="small" label="描述文字"></el-input-number></div>
            <div class="product-cost">¥ {{ info.cost }}</div>
            <!-- <div class="product-add-cart" @click.prevent="handleCart">加入购物车</div> -->
        <!-- </router-link> -->
   </div>
              </el-col>
               <el-col :span="4">
   <!-- <router-link :to="'/product/' + info.id" class="product-main"  > -->
   <div class="product-main">
            <img :src="info.image" style=" height:100px ; width : 100px"  >
            <h4>{{ info.name }}</h4>
            <div > <el-input-number v-model="info.num" @change="handleChange" :min="0" :max="10" size="small" label="描述文字"></el-input-number></div>
            <div class="product-cost">¥ {{ info.cost }}</div>
            <!-- <div class="product-add-cart" @click.prevent="handleCart">加入购物车</div> -->
        <!-- </router-link> -->
   </div>
              </el-col>
               <el-col :span="4">
   <!-- <router-link :to="'/product/' + info.id" class="product-main"  > -->
   <div class="product-main">
            <img :src="info.image" style=" height:100px ; width : 100px"  >
            <h4>{{ info.name }}</h4>
            <div > <el-input-number v-model="info.num" @change="handleChange" :min="0" :max="10" size="small" label="描述文字"></el-input-number></div>
            <div class="product-cost">¥ {{ info.cost }}</div>
            <!-- <div class="product-add-cart" @click.prevent="handleCart">加入购物车</div> -->
        <!-- </router-link> -->
   </div>
              </el-col>
               <el-col :span="4">
   <!-- <router-link :to="'/product/' + info.id" class="product-main"  > -->
   <div class="product-main">
            <img :src="info.image" style=" height:100px ; width : 100px"  >
            <h4>{{ info.name }}</h4>
            <div > <el-input-number v-model="info.num" @change="handleChange" :min="0" :max="10" size="small" label="描述文字"></el-input-number></div>
            <div class="product-cost">¥ {{ info.cost }}</div>
            <!-- <div class="product-add-cart" @click.prevent="handleCart">加入购物车</div> -->
        <!-- </router-link> -->
   </div>
              </el-col>
              
            
              
          </el-row>
                  <el-row type="flex" justify="" >
              <el-col :span="4">
   <!-- <router-link :to="'/product/' + info.id" class="product-main"  > -->
   <div class="product-main">
            <img :src="info.image" style=" height:100px ; width : 100px"  >
            <h4>{{ info.name }}</h4>
            <div > <el-input-number v-model="info.num" @change="handleChange" :min="0" :max="10" size="small" label="描述文字"></el-input-number></div>
            <div class="product-cost">¥ {{ info.cost }}</div>
            <!-- <div class="product-add-cart" @click.prevent="handleCart">加入购物车</div> -->
        <!-- </router-link> -->
   </div>
              </el-col>
               <el-col :span="4">
   <!-- <router-link :to="'/product/' + info.id" class="product-main"  > -->
   <div class="product-main">
            <img :src="info.image" style=" height:100px ; width : 100px"  >
            <h4>{{ info.name }}</h4>
            <div > <el-input-number v-model="info.num" @change="handleChange" :min="0" :max="10" size="small" label="描述文字"></el-input-number></div>
            <div class="product-cost">¥ {{ info.cost }}</div>
            <!-- <div class="product-add-cart" @click.prevent="handleCart">加入购物车</div> -->
        <!-- </router-link> -->
   </div>
              </el-col>
               <el-col :span="4">
   <!-- <router-link :to="'/product/' + info.id" class="product-main"  > -->
   <div class="product-main">
            <img :src="info.image" style=" height:100px ; width : 100px"  >
            <h4>{{ info.name }}</h4>
            <div > <el-input-number v-model="info.num" @change="handleChange" :min="0" :max="10" size="small" label="描述文字"></el-input-number></div>
            <div class="product-cost">¥ {{ info.cost }}</div>
            <!-- <div class="product-add-cart" @click.prevent="handleCart">加入购物车</div> -->
        <!-- </router-link> -->
   </div>
              </el-col>
               <el-col :span="4">
   <!-- <router-link :to="'/product/' + info.id" class="product-main"  > -->
   <div class="product-main">
            <img :src="info.image" style=" height:100px ; width : 100px"  >
            <h4>{{ info.name }}</h4>
            <div > <el-input-number v-model="info.num" @change="handleChange" :min="0" :max="10" size="small" label="描述文字"></el-input-number></div>
            <div class="product-cost">¥ {{ info.cost }}</div>
            <!-- <div class="product-add-cart" @click.prevent="handleCart">加入购物车</div> -->
        <!-- </router-link> -->
   </div>
              </el-col>
               <el-col :span="4">
   <!-- <router-link :to="'/product/' + info.id" class="product-main"  > -->
   <div class="product-main">
            <img :src="info.image" style=" height:100px ; width : 100px"  >
            <h4>{{ info.name }}</h4>
            <div > <el-input-number v-model="info.num" @change="handleChange" :min="0" :max="10" size="small" label="描述文字"></el-input-number></div>
            <div class="product-cost">¥ {{ info.cost }}</div>
            <!-- <div class="product-add-cart" @click.prevent="handleCart">加入购物车</div> -->
        <!-- </router-link> -->
   </div>
              </el-col>
               <el-col :span="4">
   <!-- <router-link :to="'/product/' + info.id" class="product-main"  > -->
   <div class="product-main">
            <img :src="info.image" style=" height:100px ; width : 100px"  >
            <h4>{{ info.name }}</h4>
            <div > <el-input-number v-model="info.num" @change="handleChange" :min="0" :max="10" size="small" label="描述文字"></el-input-number></div>
            <div class="product-cost">¥ {{ info.cost }}</div>
            <!-- <div class="product-add-cart" @click.prevent="handleCart">加入购物车</div> -->
        <!-- </router-link> -->
   </div>
              </el-col>
              
            
              
          </el-row>
                  <el-row type="flex" justify="" >
              <el-col :span="4">
   <!-- <router-link :to="'/product/' + info.id" class="product-main"  > -->
   <div class="product-main">
            <img :src="info.image" style=" height:100px ; width : 100px"  >
            <h4>{{ info.name }}</h4>
            <div > <el-input-number v-model="info.num" @change="handleChange" :min="0" :max="10" size="small" label="描述文字"></el-input-number></div>
            <div class="product-cost">¥ {{ info.cost }}</div>
            <!-- <div class="product-add-cart" @click.prevent="handleCart">加入购物车</div> -->
        <!-- </router-link> -->
   </div>
              </el-col>
               <el-col :span="4">
   <!-- <router-link :to="'/product/' + info.id" class="product-main"  > -->
   <div class="product-main">
            <img :src="info.image" style=" height:100px ; width : 100px"  >
            <h4>{{ info.name }}</h4>
            <div > <el-input-number v-model="info.num" @change="handleChange" :min="0" :max="10" size="small" label="描述文字"></el-input-number></div>
            <div class="product-cost">¥ {{ info.cost }}</div>
            <!-- <div class="product-add-cart" @click.prevent="handleCart">加入购物车</div> -->
        <!-- </router-link> -->
   </div>
              </el-col>
               <el-col :span="4">
   <!-- <router-link :to="'/product/' + info.id" class="product-main"  > -->
   <div class="product-main">
            <img :src="info.image" style=" height:100px ; width : 100px"  >
            <h4>{{ info.name }}</h4>
            <div > <el-input-number v-model="info.num" @change="handleChange" :min="0" :max="10" size="small" label="描述文字"></el-input-number></div>
            <div class="product-cost">¥ {{ info.cost }}</div>
            <!-- <div class="product-add-cart" @click.prevent="handleCart">加入购物车</div> -->
        <!-- </router-link> -->
   </div>
              </el-col>
               <el-col :span="4">
   <!-- <router-link :to="'/product/' + info.id" class="product-main"  > -->
   <div class="product-main">
            <img :src="info.image" style=" height:100px ; width : 100px"  >
            <h4>{{ info.name }}</h4>
            <div > <el-input-number v-model="info.num" @change="handleChange" :min="0" :max="10" size="small" label="描述文字"></el-input-number></div>
            <div class="product-cost">¥ {{ info.cost }}</div>
            <!-- <div class="product-add-cart" @click.prevent="handleCart">加入购物车</div> -->
        <!-- </router-link> -->
   </div>
              </el-col>
               <el-col :span="4">
   <!-- <router-link :to="'/product/' + info.id" class="product-main"  > -->
   <div class="product-main">
            <img :src="info.image" style=" height:100px ; width : 100px"  >
            <h4>{{ info.name }}</h4>
            <div > <el-input-number v-model="info.num" @change="handleChange" :min="0" :max="10" size="small" label="描述文字"></el-input-number></div>
            <div class="product-cost">¥ {{ info.cost }}</div>
            <!-- <div class="product-add-cart" @click.prevent="handleCart">加入购物车</div> -->
        <!-- </router-link> -->
   </div>
              </el-col>
               <el-col :span="4">
   <!-- <router-link :to="'/product/' + info.id" class="product-main"  > -->
   <div class="product-main">
            <img :src="info.image" style=" height:100px ; width : 100px"  >
            <h4>{{ info.name }}</h4>
            <div > <el-input-number v-model="info.num" @change="handleChange" :min="0" :max="10" size="small" label="描述文字"></el-input-number></div>
            <div class="product-cost">¥ {{ info.cost }}</div>
            <!-- <div class="product-add-cart" @click.prevent="handleCart">加入购物车</div> -->
        <!-- </router-link> -->
   </div>
              </el-col>
              
            
              
          </el-row>
     
    </div>
</template>
<script>
    export default {
        props: {
           
        },
        data () {
            return {
                colors: {
                    '白色': '#ffffff',
                    '金色': '#dac272',
                    '蓝色': '#233472',
                    '红色': '#f2352e'
                },
             info: {
                image:require('../assets/imgs/asd.jpg'),
                id:1,
                name:'西瓜',
                color:'#dac272',
                cost:15.5,
                num:0

            },
            
            }
        },
        methods: {
            handleCart () {
                this.$store.commit('addCart', this.info.id);
            },
            handleChange(value) {
        console.log(value);
      }
        }
    };
</script>
<style scoped>
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
        background: #fff;
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
    }
    .product-main:hover h4{
        color: #0070c9;
    }
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