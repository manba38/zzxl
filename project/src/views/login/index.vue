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
import useUserStore from '../../store/modules/user';
import { useRouter } from 'vue-router';
import { ElNotification } from 'element-plus';
import { getTime } from '../../utils/time';

export default {
    setup() {
        const validatorUserName = (rule: any, value: any, callback: any) => {
            if (value.length >= 5) {
                callback();
            } else {
                callback(new Error('账号长度至少五位'))
            }
        };
        const validatorPassword = (rule: any, value: any, callback: any) => {
            if (value.length >= 6) {
                callback();
            } else {
                callback(new Error('密码长度至少六位'))
            }
        };
        const loginForm = reactive({
            username: 'admin',
            password: '111111'
        });
        const rules = reactive({
            username: [{ trigger: 'change', validator: validatorUserName }],
            password: [{ trigger: 'change', validator: validatorPassword }]
        });
        const loading = ref(false);
        const useStore = useUserStore();
        const $router = useRouter();
        const loginForms = ref(); // 确保使用ref()声明loginForms

        onMounted(() => {
            console.log(loginForms.value); // 这里应该可以访问到el-form的实例
        });

        const login = async () => {
            // 保证表单校验通过再进行
            await loginForms.value.validate();

            try {
                loading.value = true;
                await useStore.userLogin(loginForm);
                $router.push('/');
                ElNotification({
                    type: 'success',
                    message: '登录成功',
                    title: `Hi, ${getTime()}好`
                });
            } catch (error) {
                ElNotification({
                    type: 'error',
                    message: (error as Error).message
                });
            } finally {
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