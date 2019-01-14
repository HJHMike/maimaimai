<template>
    <div class="loginContainer">
        <div class="loginForm">
            <el-form label-position="top" label-width="80px" :model="formData" :rules="rules" ref="formData">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="formData.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop='password'>
                    <el-input v-model="formData.password" prop="password" type='password'></el-input>
                </el-form-item>
                <el-button class="login-btn" type="danger" @click="submitForm('formData')">登录</el-button>
            </el-form>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'app',
        data() {
            return {
                formData: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'change' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'change' }
                    ],

                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post('login', this.formData).then(res => {
                            if (res.data.meta.status === 200) {
                                // 成功记录token
                                window.sessionStorage.setItem('token',res.data.data.token);
                                // 使用编程式导航
                                this.$router.push('/');
                            } 
                        }).catch(err => {
                            this.$message.error(res.data.meta.msg);
                            return false;
                        })
                    } else {
                        this.$message.error('请正确输入用户名和密码');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style lang="scss">
    .loginContainer {
        height: 100%;
        background-color: #324152;
        display: flex;
        justify-content: center;
        align-items: center;
        .loginForm {
            width: 580px;
            padding: 40px;
            background-color: #ffffff;
            border-radius: 10px;
            .login-btn {
                width: 100%;
            }
        }
    }
</style>