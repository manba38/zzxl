<template>
    <div>
        <el-table :data="PermisstionArr" style="width: 100%; margin-bottom: 20px" row-key="id" border>
            <el-table-column label="名称" prop="name"></el-table-column>
            <el-table-column label="权限值" prop="code"></el-table-column>
            <el-table-column label="修改时间" prop="updateTime"></el-table-column>
            <el-table-column label="操作">
                <template #="{ row }">
                    <el-button type="primary" size="small" @click="addPermisstion(row)"
                        :disabled="row.level == 4 ? true : false">{{
                            row.level == 3 ? '添加功能' : '添加菜单' }}</el-button>
                    <el-button type="primary" size="small" @click="updatePermisstion(row)"
                        :disabled="row.level == 1 ? true : false">编辑</el-button>
                    <el-popconfirm :title="`你确定删除${row.name}?`" width="260px" @confirm="removeMenu(row.id)">
                        <template #reference>
                            <el-button type="primary" size="small" @click=""
                                :disabled="row.level == 1 ? true : false">删除</el-button>
                        </template>
                    </el-popconfirm>

                </template>
            </el-table-column>
        </el-table>
        <el-dialog v-model="dialogVisite" :title="menuData.id ? '更新菜单' : '添加菜单'">
            <el-form model="" rules="" ref="form">
                <el-form-item label="名称" prop="roleName">
                    <el-input placeholder="请你输入菜单名称" v-model="menuData.name"></el-input>
                </el-form-item>
                <el-form-item label="权限" prop="roleName">
                    <el-input placeholder="请你输入权限值" v-model="menuData.code"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button type="primary" size="default" @click="dialogVisite = false">取消</el-button>
                <el-button type="primary" size="default" @click="save">确定</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { reqAddOrUpdateMenu, reqAllPermisstion, reqRemoveMenu } from '../../../api/acl/menu';
import { MenuParams, Permisstion, PermisstionList, PermisstionResponseData } from '../../../api/acl/menu/type';
import { ElMessage } from 'element-plus';

let PermisstionArr = ref<PermisstionList>([]);
let dialogVisite = ref<boolean>(false);
let menuData = reactive<MenuParams>({
    code: "",
    level: 0,
    name: "",
    pid: 0
})

onMounted(() => {
    getHasPermisstion()
})
const getHasPermisstion = async () => {
    let result: PermisstionResponseData = await reqAllPermisstion()
    if (result.code == 200) {
        PermisstionArr.value = result.data
    }
}
const addPermisstion = (row: Permisstion) => {
    Object.assign(menuData, {
        id: 0,
        code: "",
        level: 0,
        name: "",
        pid: 0
    })
    dialogVisite.value = true;
    menuData.level = row.level + 1;
    menuData.pid = (row.id as number)
}
const updatePermisstion = (row: Permisstion) => {
    dialogVisite.value = true;
    Object.assign(menuData, row)
}

const save = async () => {
    let result = await reqAddOrUpdateMenu(menuData);
    if (result.code == 200) {
        dialogVisite.value = false;
        ElMessage({
            type: 'success',
            message: menuData.id ? '更新成功' : '添加成功'
        })
        getHasPermisstion()
    }
}
const removeMenu = async (id: number) => {
    let result = await reqRemoveMenu(id);
    if (result.code == 200) {
        ElMessage({
            type: 'success', message: '删除成功'
        });
        getHasPermisstion()
    }
}
</script>

<style scoped></style>