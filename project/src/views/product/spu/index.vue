<template>
    <div>
        <category :scene="scene"></category>
        <el-card style="margin: 10px 0px;">
            <div v-show="scene == 0">
                <el-button @click="addSpu" type="primary" size="default" icon="Plus"
                    :disabled="categoryStore.c3Id ? false : true">添加SPU</el-button>
                <el-table style="margin: 10px 0px;" border :data="records">
                    <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
                    <el-table-column label="SPU名称" prop="spuName"></el-table-column>
                    <el-table-column label="SPU描述" prop="description" show-overflow-tooltip></el-table-column>
                    <el-table-column label="SPU操作">
                        <template #="{ row }">
                            <el-button type="primary" size="small" icon="Plus" title="添加SKU"
                                @click="addSku(row)"></el-button>
                            <el-button type="primary" size="small" icon="Edit" title="修改SKU"
                                @click="updateSpu(row)"></el-button>
                            <el-button type="primary" size="small" icon="view" title="查看SKU列表"
                                @click="findSku(row)"></el-button>
                            <el-popconfirm :title="`你确定删除${row.spuName}?`" width="200px" @confirm="deleteSpu(row)">
                                <template #reference>
                                    <el-button type="primary" size="small" icon="Delete" title="删除SPU"></el-button>
                                </template>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination @current-change="getHasSpu" :pager-count="9" v-model:current-page="pageNo"
                    v-model:page-size="pageSize" :page-sizes="[3, 5, 7, 9]" :background="true"
                    layout="prev, pager, next,jumper,->,sizes,total" :total="total" @size-change="getHasSpu" />
            </div>
            <SpuForm ref="spu" v-show="scene == 1" @changescene="changeScene"></SpuForm>
            <SkuForm ref="sku" v-show="scene == 2" @changeScene="changeScene"></SkuForm>
            <el-dialog title="SKU列表" v-model="show">
                <el-table border :data="skuArr">
                    <el-table-column label="SKU名字" prop="skuName"></el-table-column>
                    <el-table-column label="SKU价格" prop="price"></el-table-column>
                    <el-table-column label="SKU重量" prop="weight"></el-table-column>
                    <el-table-column label="SKU图片">
                        <template #="{ row }">
                            <img :src="row.imgUrl" style="width: 100px;height: 100px">

                        </template>
                    </el-table-column>

                </el-table>
            </el-dialog>
        </el-card>
    </div>
</template>

<script setup lang="ts">

import { onBeforeUnmount, ref, watch } from 'vue';
import useCaregoryStore from '../../../store/modules/types/category';
import { reqHasSpu, reqRemoveSpu, reqSkuList } from '../../../api/product/spu';
import { HasSpuResponseData, Records, SkuData, SkuInfoData, SpuData } from '../../../api/product/spu/type';
import SpuForm from './spuForm.vue';
import SkuForm from './skuForm.vue';
import { ElMessage } from 'element-plus';

let show = ref<boolean>(false);
let sku = ref<any>();
let categoryStore = useCaregoryStore();
let scene = ref<number>(0);
let pageNo = ref<number>(1);
let pageSize = ref<number>(3);
let records = ref<Records>([]);
let total = ref<number>(0);
let spu = ref<any>();
let skuArr = ref<SkuData[]>([]);
watch(() => categoryStore.c3Id, () => {
    if (!categoryStore.c3Id) return;
    getHasSpu()
});
const getHasSpu = async () => {
    let result: HasSpuResponseData = await reqHasSpu(pageNo.value, pageSize.value, categoryStore.c3Id)
    if (result.code == 200) {
        records.value = result.data.records;
        total.value = result.data.total
    }
}
const addSpu = () => {
    scene.value = 1;
    spu.value.initAddSpu(categoryStore.c3Id)
}
const changeScene = (num: number) => {
    scene.value = num;
    getHasSpu()
}
const updateSpu = (row: SpuData) => {
    scene.value = 1;
    spu.value.initHasSpuData(row)
}

const addSku = (row: SpuData) => {
    scene.value = 2;
    sku.value.initSkuData(categoryStore.c1Id, categoryStore.c2Id, row);

}
const findSku = async (row: SpuData) => {
    let result: SkuInfoData = await reqSkuList((row.id as number));
    if (result.code == 200) {
        skuArr.value = result.data;
        show.value = true;
    }
}
const deleteSpu = async (row: SpuData) => {
    let result: any = await reqRemoveSpu((row.id as number | string));
    if (result.code == 200) {
        ElMessage({
            type: 'success',
            message: '删除成功'
        })
        getHasSpu()
    } else {
        ElMessage({
            type: 'error',
            message: '删除失败'
        })
    }
}
onBeforeUnmount(() => {
    categoryStore.$reset();
})
</script>

<style scoped></style>