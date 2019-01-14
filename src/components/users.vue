<template>
    <div class="user-container">
        <!-- 顶部面包屑 -->
        <el-row>
            <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                    <myBreadcrumb :level2="level2" :level3="level3"></myBreadcrumb>
                </div>
            </el-col>
        </el-row>
        <!-- 操纵框 -->
        <el-row>
            <el-col :span="8">
                <div class="grid-content bg-purple-dark">
                    <el-input placeholder="请输入内容">
                        <template slot="append">
                            <i class="el-icon-search"></i>
                        </template>
                    </el-input>
                </div>
            </el-col>
            <el-col :span="2">
                <div class="grid-content bg-purple-dark">
                    <el-button type="success" plain>添加用户</el-button>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-table :data='userList' border style="width: 100%">
                <el-table-column type="index" label="#" width="50">
                </el-table-column>
                <el-table-column prop="username" label="姓名" width="150">
                </el-table-column>
                <el-table-column prop="email" label="邮箱" width='500'>
                </el-table-column>
                <el-table-column prop="mobile" label="手机" width='500'>
                </el-table-column>
                <el-table-column prop="mg_state" label="状态" width='200'>
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="更改">
                    <template slot-scope="scope">
                        <el-button type="primary" plain size="mini" icon="el-icon-edit"></el-button>
                        <el-button type="danger" plain size="mini" icon="el-icon-delete"></el-button>
                        <el-button type="warning" plain size="mini" icon="el-icon-check"></el-button>
                    </template>
                </el-table-column>

            </el-table>
        </el-row>
        <el-row>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageData.pagenum" :page-sizes="[5,4,3,2,1]"
                :page-size="pageData.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total" style="margin-top:40px">
            </el-pagination>
        </el-row>

    </div>
</template>
<script>
    export default {
        data() {
            return {
                level2: "用户管理",
                level3: "用户列表",
                pageData: {
                    query: '',
                    pagenum: 1,
                    pagesize: 10
                },
                total: 0,
                userList: []
            };
        },
        methods: {
            handleSizeChange(val) {
                this.pageData.pagesize = val;
                this.$axios.get('users', {
                    params: this.pageData
                }).then(res => {
                    this.userList = res.data.data.users;
                    this.total = res.data.data.total
                    console.log(res);
                })
            },
            handleCurrentChange(val) {
                this.pageData.pagenum = val;
                this.$axios.get('users', {
                    params: this.pageData
                }).then(res => {
                    this.userList = res.data.data.users;
                    this.total = res.data.data.total
                    console.log(res);
                })
            }
        },
        created() {
            this.$axios.get('users', {
                params: this.pageData
            }).then(res => {
                this.userList = res.data.data.users;
                this.total = res.data.data.total
                console.log(res);
            })
        },
    };
</script>
<style lang="scss">
    .user-container {
        background-color: #b3c0d1;
    }

    .el-row {
        line-height: 60px;
    }

    .el-button--success {
        margin-top: 2px;
    }

    .el-breadcrumb__separator {
        color: white;
    }

    th {
        line-height: 20px;
    }
</style>