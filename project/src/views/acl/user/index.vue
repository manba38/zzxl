<template>
    <el-card style="height: 80px;">
        <el-form :inline="true" class="form">
            <el-form-item laebl="用户名">
                <el-input placeholder="请你输入搜索用户名" v-model="keyword"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="defalut" :disabled="keyword ? false : true"
                    @click="search">搜索</el-button>
                <el-button typr="primary" size="defalut" @click="reset">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card style="margin: 10px 0px;">
        <el-button type="primary" size="default" @click="addUser">添加用户</el-button>
        <el-button type="primary" size="default" :disabled="selectIdArr.length ? false : true"
            @click="deleteSelectUser">批量删除</el-button>
        <el-table style="margin: 10px 0px" border :data="userArr" @selection-change="selectChange">
            <el-table-column type="selection" align="center"></el-table-column>
            <el-table-column label="#" align="center" type="index"></el-table-column>
            <el-table-column label="ID" align="center" prop="id"></el-table-column>
            <el-table-column label="用户名字" align="center" prop="username" show-overflow-tooltip></el-table-column>
            <el-table-column label="用户名称" align="center" prop="name" show-overflow-tooltip> </el-table-column>
            <el-table-column label="用户角色" align="center" prop="roleName" show-overflow-tooltip></el-table-column>
            <el-table-column label="创建时间" align="center" prop="createTime" show-overflow-tooltip></el-table-column>
            <el-table-column label="更新时间" align="center" prop="updateTime" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" width="300px" align="center">
                <template #="{ row }">
                    <el-button type="primary" size="small" icon="User" @click="setRole(row)">分配角色</el-button>
                    <el-button type="primary" size="small" icon="Edit" @click="updateUser(row)">编辑</el-button>

                    <el-popconfirm :title="`你确定删除${row.username}?`" width="260px" @confirm="deletUser(row.id)">
                        <template #reference>
                            <el-button type="primary" size="small" icon="Delete">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
    <el-drawer v-model="drawer">
        <template #header>
            <h4>查看商品的详情</h4>
        </template>
        <template #default>
            <el-form :model="userParams" :rules="rules" ref="formRef">
                <el-form-item label="用户姓名" prop="username">
                    <el-input placeholder="请您输入用户姓名" v-model="userParams.username"></el-input>
                </el-form-item>
                <el-form-item label="用户昵称" prop="name">
                    <el-input placeholder="请您输入用户昵称" v-model="userParams.name"></el-input>
                </el-form-item>
                <el-form-item label="用户密码" prop="password" v-if="!userParams.id">
                    <el-input placeholder="请您输入用户密码" v-model="userParams.password"></el-input>
                </el-form-item>
            </el-form>
        </template>
        <template #footer>
            <el-button type="primary" size="default" @click="cancel">取消</el-button>
            <el-button type="primary" size="default" @click="save">确定</el-button>


        </template>
    </el-drawer>
    <el-drawer v-model="drawer1">
        <template #header>
            <h4>分配角色(职位)</h4>
        </template>
        <template #default>
            <el-form>
                <el-form-item label="用户姓名">
                    <el-input v-model="userParams.username" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="职位列表">
                    <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate"
                        @change="handleCheckAllChange">全选</el-checkbox>
                    <el-checkbox-group v-model="userRole" @change="handleCheckedCitiesChange">
                        <el-checkbox v-for="(role, index) in allRole " :key="index" :label="role">{{ role.roleName
                            }}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
        </template>
        <template #footer>
            <el-button type="primary" size="default" @click="drawer1 = false">取消</el-button>
            <el-button type="primary" size="default" @click="confirmClick">确定</el-button>


        </template>
    </el-drawer>
    <el-pagination @current-change="getHasUser" @size-change="getHasUser" :pager-count="9" v-model:current-page="pageNo"
        v-model:page-size="pageSize" :page-sizes="[5, 7, 9, 10]" :background="true"
        layout="prev, pager, next,jumper,->,sizes,total" :total="total" />
</template>

<script setup lang="ts">
import { nextTick, onMounted, reactive, ref } from 'vue';
import { reqAddOrUpdateUser, reqAllRole, reqRemoveUser, reqSelectUser, reqSetUserRole, reqUserInfo } from '../../../api/acl/user';
import { AllRole, AllRoleResponseData, SetRoleData, User, UserResponseData } from '../../../api/acl/user/type';
import { Records } from '../../../api/product/spu/type';
import { ElMessage } from 'element-plus';
import userLayOutSettingStore from '../../../store/modules/types/setting';
let drawer1 = ref<boolean>(false)
let formRef = ref<any>();
let pageNo = ref<number>(1);
let pageSize = ref<number>(5);
let total = ref<number>(0);
let userArr = ref<Records>([]);
let drawer = ref<boolean>(false);
let selectIdArr = ref<User[]>([]);
let keyword = ref<string>('');
let userParams = reactive<User>({
    username: '',
    name: '',
    password: '',
})
let settingStore = userLayOutSettingStore();
onMounted(() => {
    getHasUser()
})
const getHasUser = async () => {

    let result: UserResponseData = await reqUserInfo(pageNo.value, pageSize.value, keyword.value);
    if (result.code == 200) {
        total.value = result.data.total;
        userArr.value = result.data.records;
    }
}
const addUser = () => {
    drawer.value = true;
    Object.assign(userParams, {
        username: '',
        name: '',
        password: '',
        id: 0
    });
    nextTick(() => {
        formRef.value.clearValidate()
    })
}
const updateUser = (row: any) => {
    drawer.value = true;
    Object.assign(userParams, row);
    nextTick(() => {
        formRef.value.clearValidate()
    })
}
const save = async () => {
    await formRef.value.validate()
    let result: any = await reqAddOrUpdateUser(userParams);
    if (result.code == 200) {
        drawer.value = false;
        ElMessage({ type: 'success', message: userParams.id ? '更新成功' : '添加成功' })
        getHasUser();
        window.location.reload()
    } else {
        drawer.value = false;
        ElMessage({ type: 'error', message: userParams.id ? '更新失败' : '添加失败' })
    }
}
const cancel = () => {
    drawer.value = false
}
const validatorUsername = (_rule: any, value: any, callBack: any) => {
    if (value.trim().length >= 5) {
        callBack()
    } else {
        callBack(new Error('用户名字至少五位'))
    }
}
const validatorname = (_rule: any, value: any, callBack: any) => {
    if (value.trim().length >= 5) {
        callBack()
    } else {
        callBack(new Error('用户昵称至少五位'))
    }
}
const validatorpassword = (_rule: any, value: any, callBack: any) => {
    if (value.trim().length >= 6) {
        callBack()
    } else {
        callBack(new Error('用户密码至少六位'))
    }
}
const rules = {
    username: [{ required: true, trigger: 'blur', validator: validatorUsername }],
    name: [{ required: true, trigger: 'blur', validator: validatorname }],
    password: [{ required: true, trigger: 'blur', validator: validatorpassword }]
}
const setRole = async (row: User) => {

    Object.assign(userParams, row);
    let result: AllRoleResponseData = await reqAllRole((userParams.id as number));
    if (result.code == 200) {
        allRole.value = result.data.allRolesList;
        userRole.value = result.data.assignRoles;
        drawer1.value = true;
    }

}
let checkAll = ref<boolean>(false);
let allRole = ref<AllRole>([]);
let userRole = ref<AllRole>([]);

const isIndeterminate = ref<boolean>(true);
const handleCheckAllChange = (val: boolean) => {
    userRole.value = val ? allRole.value : [];
    isIndeterminate.value = false;
}
const handleCheckedCitiesChange = (value: string[]) => {
    const checkedCount = value.length;
    checkAll.value = checkedCount === allRole.value.length
    isIndeterminate.value = !(checkedCount === allRole.value.length)
}

const confirmClick = async () => {
    let data: SetRoleData = {
        userId: (userParams.id as number),
        roleIdList: userRole.value.map(item => {
            return (item.id as number)
        })
    };
    let result: any = await reqSetUserRole(data);
    if (result.code == 200) {
        ElMessage({ type: 'success', message: '分配职务成功' });
        drawer1.value = false;
        getHasUser()
    }
}
const deletUser = async (userId: number) => {

    let result: any = await reqRemoveUser(userId);
    if (result.code == 200) {
        ElMessage({ type: 'success', message: '删除成功' })
        getHasUser()
    }
}

const selectChange = (value: any) => {
    selectIdArr.value = value;
}
const deleteSelectUser = async () => {
    let idsList: any = selectIdArr.value.map(item => {
        return item.id
    });
    let result: any = await reqSelectUser(idsList);
    if (result.code == 200) {
        ElMessage({ type: 'success', message: '删除成功' })
        getHasUser()
    }
}
const search = () => {
    getHasUser();
    keyword.value = ''
}
const reset = () => {
    settingStore.refsh = !settingStore.refsh
}
</script>

<style scoped>
.form {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
