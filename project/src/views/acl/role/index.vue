<template>
    <el-card style="height: 80px;">
        <el-form :inline="true" class="form">
            <el-form-item laebl="职位搜索">
                <el-input placeholder="请你输入搜索职位关键字" v-model="keyword"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="defalut" :disabled="keyword ? false : true"
                    @click="search">搜索</el-button>
                <el-button typr="primary" size="defalut" @click="reset">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card style="margin: 10px 0px;">
        <el-button type="primary" size="default" @click="addRole">添加职位</el-button>
        <el-table style="margin: 10px 0px" border :data="allRole" @selection-change="">
            <el-table-column label="#" align="center" type="index"></el-table-column>
            <el-table-column label="ID" align="center" prop="id"></el-table-column>
            <el-table-column label="职位名称" align="center" prop="roleName" show-overflow-tooltip></el-table-column>
            <el-table-column label="创建时间" align="center" prop="createTime" show-overflow-tooltip></el-table-column>
            <el-table-column label="更新时间" align="center" prop="updateTime" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" width="300px" align="center">
                <template #="{ row }">
                    <el-button type="primary" size="small" icon="User" @click="setPermissition(row)">分配权限</el-button>
                    <el-button type="primary" size="small" icon="Edit" @click="updateRole(row)">编辑</el-button>

                    <el-popconfirm :title="`你确定删除${row.roleName}?`" width="260px" @confirm="removeRole(row.id)">
                        <template #reference>
                            <el-button type="primary" size="small" icon="Delete">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
    <el-dialog v-model="dialogVisite" :title="RoleParams.id ? '更新职位' : '添加职位'">
        <el-form :model="RoleParams" :rules="rules" ref="form">
            <el-form-item label="职位名称" prop="roleName">
                <el-input placeholder="请你输入职位名称" v-model="RoleParams.roleName"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button type="primary" size="default" @click="dialogVisite = false">取消</el-button>
            <el-button type="primary" size="default" @click="save">确认</el-button>
        </template>
    </el-dialog>
    <el-drawer v-model="drawer">
        <template #header>
            <h4>查看商品的详情</h4>
        </template>
        <template #default>
            <el-tree ref="tree" :data="menuArr" show-checkbox node-key="id" default-expand-all
                :default-checked-keys="selectArr" :props="defaultProps" />
        </template>
        <template #footer>
            <el-button type="primary" size="default" @click="drawer = false">取消</el-button>
            <el-button type="primary" size="default" @click="handler">确定</el-button>
        </template>
    </el-drawer>

    <el-pagination @current-change="getHasRole" @size-change="getHasRole" :pager-count="9" v-model:current-page="pageNo"
        v-model:page-size="pageSize" :page-sizes="[5, 7, 9, 10]" :background="true"
        layout="prev, pager, next,jumper,->,sizes,total" :total="total" />
</template>

<script setup lang="ts">
import { nextTick, onMounted, reactive, ref } from 'vue';
import { RoleResponseData, Records, RoleData, MeunResponseData } from '../../../api/acl/role/type';
import { reqAddOrUpdateRole, reqAllMenuList, reqAllRoleList, reqRemoveRole, reqSerPermisstion, } from '../../../api/acl/role';
import userLayOutSettingStore from '../../../store/modules/types/setting';
import { ElMessage } from 'element-plus';

let pageNo = ref<number>(1);
let pageSize = ref<number>(10);
let keyword = ref<string>('');
let allRole = ref<Records>([]);
let total = ref<number>(0);
let dialogVisite = ref<boolean>(false);
let form = ref<any>();
let tree = ref<any>();
let menuArr = ref<any>([])
let selectArr = ref<number[]>([])
let RoleParams = reactive({
    roleName: '',
    id: 0

})
let drawer = ref<boolean>(false)
let settingStore = userLayOutSettingStore();
onMounted(() => {
    getHasRole();
});

const getHasRole = async () => {
    let result: RoleResponseData = await reqAllRoleList(pageNo.value, pageSize.value, keyword.value);

    // 首先检查 result.code 是否为 200，确保 data 属性存在
    if (result.code === 200 && result.data) {
        total.value = result.data.total;
        allRole.value = result.data.records;
        console.log(result);
    } else {
        // 处理错误情况，例如 result.code 不为 200 或 result.data 未定义
        console.error('Failed to fetch role list:', result.message);
    }
};
const search = () => {
    getHasRole();
    keyword.value = ''
}
const reset = () => {
    settingStore.refsh = !settingStore.refsh
}

const addRole = () => {
    dialogVisite.value = true,
        Object.assign(RoleParams, {
            roleName: ''
        });
    nextTick(() => {
        form.value.clearValidate({
            roleName: '',
            id: 0
        })
    })
}

const updateRole = (row: RoleData) => {
    dialogVisite.value = true;
    Object.assign(RoleParams, row)
}
const validatorRoleName = (_rule: any, value: any, callBack: any) => {
    if (value.trim().length > 2) {
        callBack()
    } else {
        callBack(new Error('职位名称至少两位'))
    }
}
const rules = {
    roleName: [
        { required: true, trigger: 'blur', validator: validatorRoleName }
    ]
}
const save = async () => {
    await form.value.validate();
    let result: any = await reqAddOrUpdateRole(RoleParams);
    if (result.code == 200) {
        ElMessage({ type: 'success', message: RoleParams.id ? '更新成功' : '添加成功' });
        dialogVisite.value = false;
        getHasRole()
    }
}
const setPermissition = async (row: RoleData) => {

    Object.assign(RoleParams, row);

    let result: MeunResponseData = await reqAllMenuList(RoleParams.id);
    console.log(result)
    if (result.code == 200) {
        menuArr.value = result.data;
        drawer.value = true;
        selectArr.value = filterSelectArr(menuArr.value, [])
    }

}
const defaultProps = {
    children: 'children',
    label: 'name',
}
const filterSelectArr = (allData: any, initArr: any) => {
    allData.forEach((item: any) => {
        console.log(item.select)
        if (item.select && item.level == 4) {
            initArr.push(item.id)
        }
        if (item.children && item.children.length > 0) {
            filterSelectArr(item.children, initArr)
        }
    })
    return initArr;
}

const handler = async () => {
    const roleId = RoleParams.id;
    let arr = tree.value.getCheckedKeys();
    let arr1 = tree.value.getHalfCheckedKeys();
    let permissionId = arr.concat(arr1);
    let result: any = await reqSerPermisstion(roleId, permissionId);
    if (result.code == 200) {
        drawer.value = false;
        ElMessage({ type: 'success', message: '分配权限成功' });
        window.location.reload()
    }
}

const removeRole = async (id: number) => {
    let result: any = await reqRemoveRole(id);
    if (result.code == 200) {
        ElMessage({ type: 'success', message: '删除成功' })
        getHasRole()
    }
}
</script>

<style scoped>
.form {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
