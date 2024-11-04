<template>
    <div class="login_container">
        <el-row>
            <el-col :span="12" :xs="0"></el-col>
            <el-col :span="12" :xs="24">
                <el-form class="login_form">
                    <h1>Hello</h1>
                    <h2>欢迎来到zxl的测试</h2>
                    <el-form-item>
                        <el-input :prefix-icon="User" v-model="loginForm.username">
                            账号名
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input type="password" :prefix-icon="Lock" v-model="loginForm.password" show-password>
                            密码
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="login_btn" @click="login">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts">
import { User, Lock } from '@element-plus/icons-vue';
import { reactive } from 'vue';

export default {
    setup() {
        const loginForm = reactive({
            username: 'admin',
            password: '111111'
        });

        const login = () => {
            console.log('登录', loginForm);
        };

        return {
            User,
            Lock,
            loginForm,
            login  // 确保 login 方法被返回
        };
    }
}
</script>

<style lang="scss" scoped>
.login_container {
    width: 100%;
    height: 100vh;
    background: url('@/assets/images/background.jpg') no-repeat;
    background-size: cover;
}
.login_form {
    background: url("@/assets/images/login_form.png") no-repeat;
    background-size: cover;
    position: relative;
    top: 30vh;
    padding: 30px;
    width: 80%;
}
h1 {
    color: aliceblue;
    font-size: 50px;
}
h2 {
    color: aliceblue;
    font-size: 20px;
    margin: 10px;
}
.login_btn {
    width: 100%;
}
</style>