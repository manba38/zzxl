<template>
    <div>
        <!-- 引入全局组件三级选择 -->
        <Category :scene="scene"></Category>
        <el-card style="margin: 10px 0px;">
            <div v-show="scene == 0"> <el-button @click="addAttr" type="primary" size="dafault" icon="Plus"
                    :disabled="categoryStore.c3Id ? false : true">添加属性</el-button>
                <el-table border style="margin: 10px 0px;" :data="attrArr">
                    <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
                    <el-table-column label="属性名称" width="120px" prop="attrName"></el-table-column>
                    <el-table-column label="属性值名称">
                        <template #="{ row }">
                            <el-tag style="margin: 5px" v-for="(item) in row.attrValueList" :key="item.id">{{
                                item.valueName }}</el-tag>

                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="120px">
                        <template #="{ row }">
                            <el-button type="primary" size="small" icon="Edit" @click="updateAttr(row)"></el-button>

                            <el-popconfirm :title="`你确定删除${row.attrName}?`" width="200px" @confirm="deleteAttr(row.id)">
                                <template #reference>
                                    <el-button type="primary" size="small" icon="Delete"></el-button>
                                </template>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div v-show="scene == 1">
                <el-form :inline="true">
                    <el-form-item label="属性名称">
                        <el-input placeholder="请你输入属性名称" v-model="attrParams.attrName"></el-input>
                    </el-form-item>
                </el-form>
                <el-button @click="addAttrValue" :disabled="attrParams.attrName ? false : true" type="primary"
                    size="default" icon="Plus">添加属性值</el-button>
                <el-button type="primary" size="default" @click="cancel">取消</el-button>
                <el-table border style="margin: 10px 0px;" :data="attrParams.attrValueList">
                    <el-table-column label="序号" width="80px" type="index" align="center"></el-table-column>
                    <el-table-column label="属性值名称">
                        <template #="{ row, $index }">
                            <el-input :ref="(vc: any) => inputArr[$index] = vc" v-if="row.flag"
                                @blur="tolook(row, $index)" size="small" placeholder="请你输入属性值名称"
                                v-model="row.valueName"></el-input>
                            <div v-else @click="toEdit(row, $index)">{{ row.valueName }}</div>
                            <!-- <el-input placeholder="请你输入属性值名称" v-model="row.valueName"></el-input> -->
                        </template>
                    </el-table-column>
                    <el-table-column label="属性值操作">
                        <template #="{ $index }">
                            <el-button @click="attrParams.attrValueList.splice($index, 1)" type="primary" size="small"
                                icon="Delete"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button type="primary" size="default" @click="save"
                    :disabled="attrParams.attrValueList.length > 0 ? false : true">保存</el-button>
                <el-button type="primary" size="default" @click="cancel">取消</el-button>

            </div>
        </el-card>
    </div>

</template>

<script setup lang="ts">
import { nextTick, reactive, ref, watch } from 'vue';
import useCaregoryStore from '../../../store/modules/types/category';
import { AttrResponseData, Attr, AttrValue } from '../../../api/product/attr/type';
import { reqAddOrUpdateAttr, reqAttr, reqRemoveAttr } from '../../../api/product/attr';
import { ElMessage } from 'element-plus';

let inputArr = ref<any>([]);
let categoryStore = useCaregoryStore();
let attrArr = ref<Attr[]>([]);
let scene = ref<number>(0);
let attrParams = reactive<Attr>({
    attrName: "",
    attrValueList: [],
    categoryId: '',
    categoryLevel: 3,
})
watch(() => categoryStore.c3Id, () => {
    attrArr.value = [];
    if (!categoryStore.c3Id) return;
    getArr()
})

const getArr = async () => {
    const { c1Id, c2Id, c3Id } = categoryStore;

    let result: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id);
    if (result.code == 200) {
        attrArr.value = result.data;
    }
}

const addAttr = () => {
    Object.assign(attrParams, {
        attrName: "",
        attrValueList: [],
        categoryId: '',
        categoryLevel: 3
    })
    scene.value = 1;
    attrParams.categoryId = categoryStore.c3Id
}
const updateAttr = (row: Attr) => {
    scene.value = 1;
    Object.assign(attrParams, JSON.parse(JSON.stringify(row)))

}

const cancel = () => {
    scene.value = 0;
}
const addAttrValue = () => {
    attrParams.attrValueList.push({
        valueName: '',
        flag: true,
    });
    nextTick(() => {
        inputArr.value[attrParams.attrValueList.length - 1].focus();
    })
}
const save = async () => {
    let result: any = await reqAddOrUpdateAttr(attrParams);
    if (result.code == 200) {
        scene.value = 0;
        ElMessage({
            type: 'success',
            message: attrParams.id ? '修改成功' : '添加成功'
        })
        getArr()
    } else {
        ElMessage({
            type: 'error',
            message: attrParams.id ? '修改失败' : '添加失败'
        })
    }
}
const tolook = (row: AttrValue, $index: number) => {

    if (row.valueName.trim() == '') {

        attrParams.attrValueList.splice($index, 1)
        ElMessage({
            type: 'error',
            message: '属性值不能为空'
        })
        return;
    }
    let repeat = attrParams.attrValueList.find((item) => {
        if (item != row) {
            return item.valueName === row.valueName;
        }
    });
    if (repeat) {
        attrParams.attrValueList.splice($index, 1)
        ElMessage({
            type: 'error',
            message: '属性值不能重复'
        })
    }

    row.flag = false;
}

const toEdit = (row: AttrValue, $index: number) => {
    row.flag = true;
    nextTick(() => {
        inputArr.value[$index].focus();
    })
}
const deleteAttr = async (attrId: number) => {
    let result: any = await reqRemoveAttr(attrId);
    if (result.code == 200) {
        ElMessage({
            type: 'success',
            message: '删除成功'
        })
        getArr();
    } else {
        ElMessage({
            type: 'error',
            message: '删除失败'
        })
    }

}



</script>

<style scoped></style>
