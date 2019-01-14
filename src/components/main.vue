<template>
    <div class="container">
        <el-container>
            <el-header>
                <el-row>
                    <el-col :span="21" class="title">
                        <div class="grid-content bg-purple-light">买买买后台管理系统</div>
                    </el-col>
                    <el-col :span="3">
                        <div class="grid-content bg-purple">
                            <el-button type="danger" @click='logout'>退出</el-button>
                        </div>
                    </el-col>
                </el-row>
            </el-header>
            <el-container>
                <el-aside width="220px">
                    <el-menu default-active="2" class="el-menu-vertical-demo" background-color="#545c64"
                        text-color="#fff" active-text-color="#ffd04b" router>
                        <el-submenu v-for="(item, index) in menuList" :key="item.id" :index="item.order+''">
                            <template slot="title" class="">
                                <i class="el-icon-location"></i>
                                <span>{{item.authName}}</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item v-for="(item2, index2) in item.children" :key="item2.id" :index="'/'+item2.path">
                                    <i class="el-icon-menu"></i>{{item2.authName}}</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>

    </div>
</template>
<script>
    export default {
        name: 'main',
        data() {
            return {
                menuList: [],
            }
        },

        methods: {
            logout() {
                // 注册在原型上的方法
                this.$confirm("你真的要退出吗?", "提示", {
                    confirmButtonText: "退出",
                    cancelButtonText: "再看看",
                    type: "warning"
                })
                    .then(() => {
                        // 清除token
                        window.sessionStorage.removeItem("token");
                        // 编程式导航
                        this.$router.push("login");
                        // 成功
                        this.$message({
                            type: "success",
                            message: "已退出"
                        });
                    })
                    .catch(() => {
                        // 取消
                        this.$message({
                            type: "info",
                            message: "取消退出"
                        });
                    });
            }
        },

        created() {
            this.$axios
                .get("menus").then(res => {
                    // console.log(res);
                    this.menuList = res.data.data;
                });
        }

    }
</script>
<style scoped>
    .el-header,
    .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        line-height: 160px;
    }

    body>.el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }

    .el-container {
        height: 100%;
    }

    .container {
        height: 100%;
    }

    .title {
        font-size: 30px;
        color: white;
    }

    .el-submenu {
        text-align: left;
    }
</style>