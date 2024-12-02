<template>
    <div>
        <el-form label-width="100px">
            <el-form-item label="SKU名称">
                <el-input placeholder="SKU名称" v-model="skuParams.skuName"></el-input>
            </el-form-item>
            <el-form-item label="价格(元)">
                <el-input placeholder="价格(元)" type="number" v-model="skuParams.price"></el-input>
            </el-form-item>
            <el-form-item label="重量(g)">
                <el-input placeholder="重量(g)" type="number" v-model="skuParams.weight"></el-input>
            </el-form-item>
            <el-form-item label="SKU描述">
                <el-input placeholder="SKU描述" type="textarea" v-model="skuParams.skuDesc"></el-input>
            </el-form-item>
            <el-form-item label="平台属性">
                <el-form :inline="true">
                    <el-form-item v-for="(item) in attrArr" :key="item.id" :label="item.attrName" style="width: 200px;">
                        <el-select v-model="item.attrIdAndValueId">
                            <el-option :value="`${item.id}:${attrValue.id}`" v-for="(attrValue) in item.attrValueList"
                                :key="attrValue.id" :label="attrValue.valueName"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-form-item>
            <el-form-item label="销售属性">
                <el-form :inline="true">
                    <el-form-item :label="item.saleAttrName" v-for="(item) in saleArr" :key="item.key"
                        style="width: 300px;">
                        <el-select v-model="item.saleIdAndValueId">
                            <el-option :value="`{item.id}:${saleAttrValue.id}`"
                                v-for="(saleAttrValue) in item.spuSaleAttrValueList" :key="saleAttrValue.id"
                                :label="saleAttrValue.saleAttrValueName"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-form-item>
            <el-form-item label="图片名称">
                <el-table border :data="imgArr" ref="table">
                    `<el-table-column type="selection" width="80px" align="center"></el-table-column>
                    <el-table-column label="图片">
                        <template #="{ row }">
                            <img :src="row.imgUrl" alt="" style="width: 100px;height: 100px;">
                        </template>
                    </el-table-column>
                    <el-table-column label="名称" prop="imgName"></el-table-column>
                    <el-table-column label="操作">
                        <template #="{ row }">
                            <el-button type="primagry" size="small" @click="handler(row)">设置默认</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="default" @click="save">保存</el-button>
                <el-button type="primary" size="default" @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { reqAttr } from '../../../api/product/attr';
import { reqAddSku, reqDpuImageList, reqSpuHassSaleAttr } from '../../../api/product/spu';
import { SkuData } from '../../../api/product/spu/type';
import { ElMessage } from 'element-plus';
let skuParams = reactive<SkuData>({
    category3Id: "",
    spuId: "",
    tmId: "",
    skuName: "",
    price: "",
    weight: "",
    skuDesc: "",
    skuAttrValueList: [
        {
            attrId: "",
            valueId: "",
        },
    ],
    skuSaleAttrValueList: [
        {
            saleAttrId: "",
            saleAttrValueId: ""
        }
    ],
    skuDefaultImg: "",
})
let $emit = defineEmits(['changeScene']);
let table = ref<any>();
let attrArr = ref<any>([]);
let saleArr = ref<any>([]);
let imgArr = ref<any>([]);
const handler = (row: any) => {
    imgArr.value.forEach((item: any) => {
        table.value.toggleRowSelection(item, false);
    });
    table.value.toggleRowSelection(row, true);
    skuParams.skuDefaultImg = row.imgUrl
}

const cancel = () => {
    $emit('changeScene', 0)
}

const initSkuData = async (c1Id: number | string, c2Id: number | string, spu: any) => {
    skuParams.category3Id = spu.category3Id;
    skuParams.spuId = spu.id;
    skuParams.tmId = spu.tmId;

    let result: any = await reqAttr(c1Id, c2Id, spu.category3Id);
    let result1: any = await reqSpuHassSaleAttr(spu.id);
    let result2: any = await reqDpuImageList(spu.id);
    attrArr.value = result.data;
    saleArr.value = result1.data;
    imgArr.value = result2.data
}

const save = async () => {
    skuParams.skuAttrValueList = attrArr.value.reduce((prev: any, next: any) => {
        if (next.attrIdAndValueId) {
            let [attrId, valueId] = next.attrIdAndValueId.split(':');
            prev.push({
                attrId,
                valueId
            })
        }
        return prev;
    }, []);
    skuParams.skuSaleAttrValueList = saleArr.value.reduce((prev: any, next: any) => {
        console.log('当前处理的销售属性:', next); // 打印当前处理的销售属性对象
        if (next.saleIdAndValueId) {
            // 确保正确地分割字符串，并且正确地引用 next.id
            let [saleAttrId, saleAttrValueId] = next.saleIdAndValueId.replace(/{item.id}/g, next.id).split(':');
            console.log('解析后的saleAttrId和saleAttrValueId:', saleAttrId, saleAttrValueId); // 打印解析后的ID
            if (saleAttrId && saleAttrValueId) { // 确保两个ID都存在
                prev.push({
                    saleAttrId: saleAttrId,
                    saleAttrValueId: saleAttrValueId
                });
                console.log('当前累加器prev:', prev); // 打印当前累加器的状态
            }
        }
        return prev;
    }, []);
    console.log('最终的skuSaleAttrValueList:', skuParams.skuSaleAttrValueList); // 打印最终结果
    let result: any = await reqAddSku(skuParams);
    if (result.code == 200) {
        ElMessage({
            type: 'success',
            message: '添加SKU成功'
        })
        $emit('changeScene', { flag: 0, params: '' })
    } else {
        ElMessage({
            type: 'error',
            message: '添加SKU失败'
        })
    }
}



defineExpose({
    initSkuData
})
</script>

<style scoped></style>