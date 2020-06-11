<template>
  <el-container>
    <el-aside width="250px">
      <div class="aside-title">
        <img :src="headerImg" alt />
        <span>外卖商家中心</span>
      </div>
      <el-menu
        :default-active="this.$route.path"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#2F4F4F"
        text-color="#fff"
        active-text-color="#ffd04b"
        router="true"
        unique-opened
      >
        <div v-for="item  in selectGroup" :key="item.index">
          <el-submenu v-if="item.children" :index="item.index">
            <template slot="title">
              <i :class="item.icls"></i>
              <span>{{ item.title }}</span>
            </template>
            <!-- 二级儿子标题 -->
            <el-menu-item v-for="child in item.children" :key="child.index" :index="child.index">
              <i :class="child.icls"></i>
              <span slot="title">{{ child.title }}</span>
            </el-menu-item>
          </el-submenu>
          <!-- menu-item: 一级选项卡，不带展开 -->
          <el-menu-item v-else :index="item.index">
            <i :class="item.icls"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </div>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="item in this.$route.meta" :key="item">{{item}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="header-right">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              您好！{{acc}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">个人中心</el-dropdown-item>
              <el-dropdown-item command="b">注销</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <router-link v-if="linkflag" to="/">请登录</router-link>
          <img :src="headerImg" alt />
        </div>
      </el-header>
      <el-main>
        <!-- 二级路由窗口 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>


<script>
import { api_token, api_mySelf } from "../api/apis";
export default {
  data() {
    return {
      flag: false,
      linkflag: false,
      acc: "",
      myrole: "",
      headerImg: "",
      treelist: [
        {
          index: "/index/home",
          icls: "el-icon-menu",
          title: "后台首页",
          role: ["super", "normal"]
        },
        {
          index: "/index/order",
          icls: "el-icon-menu",
          title: "订单管理",
          role: ["super", "normal"]
        },
        {
          index: "/index/shopadd",
          icls: "el-icon-s-goods",

          title: "商品管理",
          children: [
            {
              index: "/index/shoplist",
              icls: "el-icon-s-goods",
              title: "商品列表"
            },
            {
              index: "/index/shopsort",
              icls: "el-icon-s-goods",
              title: "商品分类"
            },
            {
              index: "/index/shopadd",
              icls: "el-icon-s-goods",
              title: "添加商品"
            }
          ],
          role: ["super"]
        },
        {
          index: "/index/storerun",
          icls: "el-icon-menu",
          title: "店铺管理",
          role: ["super"]
        },
        {
          index: "storerun",
          icls: "el-icon-user-solid",
          title: "账号管理",
          children: [
            {
              index: "/index/accountlist",
              icls: "el-icon-user-solid",
              title: "账号列表"
            },
            {
              index: "/index/addaccount",
              icls: "el-icon-user-solid",
              title: "账号添加"
            },
            {
              index: "/index/setpwd",
              icls: "el-icon-user-solid",
              title: "修改密码"
            }
          ],
          role: ["super"]
        },
        {
          index: "sale",
          icls: "el-icon-s-marketing",
          title: "销售统计",
          children: [
            { index: "/index/StatisticsGoods", icls: "el-icon-s-marketing", title: "商品统计" },
            { index: "/index/StatisticsOrder", icls: "el-icon-s-marketing", title: "订单统计" }
          ],
          role: ["super"]
        }
      ]
    };
  },
  methods: {
    handleCommand(command) {
      //个人中心和注销弹框
      if (command == "a") {
        this.$router.push("/index/myself"); //跳转到个人中心
      } else {
        this.$router.push("/");
        localStorage.removeItem("token"); //清除token
      }
    }
  },
  computed: {
    selectGroup() {
      return this.treelist.filter(item => item.role.includes(this.myrole));
    }
  },
  created() {
    this.myrole = localStorage.getItem("group"); //获取权限
    let mytoken = localStorage.getItem("token"); //取出保存到本地的token
    this.acc = localStorage.getItem("user"); //取出当前用户名
    api_token(mytoken).then(res => {
      if (res.data.code == 0) {
        this.flag = true;
        this.linkflag = false;
      } else {
        this.flag = false;
        this.linkflag = true;
      }
    });

    //请求个人信息拿到头像图片
    api_mySelf(localStorage.getItem("ID")).then(res => {
      this.headerImg = res.data.accountInfo.imgUrl;
    });
  }
};
</script>

<style scoped>
.el-container {
  height: 100%;
}
.el-header {
  background-color: #ffffff;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #2f4f4f;
  color: #333;
  height: 100%;
}
.el-menu {
  border: none;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
}
.aside-title {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}
.aside-title > img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 5px 15px 5px 0;
}
.el-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header-right {
  display: flex;
  justify-content: center;
  align-items: center;
}
.header-right > img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 0 20px;
}
</style>