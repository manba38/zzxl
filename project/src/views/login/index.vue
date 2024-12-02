<template>
    <div class="login_container">
        <el-row>
            <el-col :span="12" :xs="0"></el-col>
            <el-col :span="12" :xs="24">
                <el-form class="login_form" :model="loginForm" :rules="rules" ref="loginForms">
                    <h1>Hello</h1>
                    <h2>欢迎来到zxl的测试</h2>
                    <el-form-item prop="username">
                        <el-input :prefix-icon="User" v-model="loginForm.username">
                            账号名
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" :prefix-icon="Lock" v-model="loginForm.password" show-password>
                            密码
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button :loading="loading" type="primary" class="login_btn" @click="login">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts">
import { User, Lock } from '@element-plus/icons-vue';
import { reactive, ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { ElNotification } from 'element-plus';
// 引入获取当前时间的函数
import { getTime } from '../../utils/time';
// 引入用户相关的小仓库
import useUserStore from '../../store/modules/user';
export default {
    setup() {
        // 定义变量控制按钮加载效果
        const loading = ref(false);
        // 引入用户相关的小仓库
        const useStore = useUserStore();
        // 获取路由器
        const $router = useRouter();
        //获得el-form组件
        const loginForms = ref(); // 确保使用ref()声明loginForms
        // 获取路由对象
        const $route = useRoute();
        const validatorUserName = (_rule: any, value: any, callback: any) => {
            if (value.length >= 5) {
                callback();
            } else {
                callback(new Error('账号长度至少五位'))
            }
        };
        const validatorPassword = (_rule: any, value: any, callback: any) => {
            if (value.length >= 6) {
                callback();
            } else {
                callback(new Error('密码长度至少六位'))
            }
        };
        // 收集账号与密码的数据
        const loginForm = reactive({
            username: 'admin',
            password: '111111'
        });
        const rules = reactive({
            username: [{ trigger: 'change', validator: validatorUserName }],
            password: [{ trigger: 'change', validator: validatorPassword }]
        });
        // 登录按钮回调
        const login = async () => {
            // 保证表单校验通过再进行
            await loginForms.value.validate();

            try {
                loading.value = true;
                await useStore.userLogin(loginForm);
                // 编程式导航跳转到展示数据首页
                // 判断登录的时候,路由路径当中是否有query参数,如果有就往query参数跳转,没有就跳转到首页
                let redirect = $route.query.redirect;
                $router.push({ path: redirect as string });
                // 登录成功提示信息
                ElNotification({
                    type: 'success',
                    message: '登录成功',
                    title: `Hi, ${getTime()}好`
                });
            } catch (error) {
                // 登录失败的提示信息
                ElNotification({
                    type: 'error',
                    message: (error as Error).message
                });
            } finally {
                // 登录成功加载失败效果也消失
                loading.value = false;
            }
        };

        return {
            User,
            Lock,
            loginForm,
            rules,
            login,
            loading,
            loginForms // 确保返回loginForms以便在模板中使用
        };
        onMounted(() => {
            // 这里应该可以访问到el-form的实例
        });
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