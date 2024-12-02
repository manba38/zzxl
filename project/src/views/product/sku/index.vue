<template>
    <div>
        <el-card>
            <el-table border style="margin: 10px 0px;" :data="skuArr">
                <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
                <el-table-column label="名称" show-overflow-tooltip width="170px" prop="skuName"></el-table-column>
                <el-table-column label="描述" show-overflow-tooltip width="170px" prop="skuDesc"></el-table-column>
                <el-table-column label="图片" width="170px">
                    <template #="{ row }">
                        <img :src="row.skuDefaultImg" alt="" style="width: 100px;height: 100px;">
                    </template>
                </el-table-column>
                <el-table-column label="重量" width="170px" prop="weight"></el-table-column>
                <el-table-column label="价格" width="170px" prop="price"></el-table-column>
                <el-table-column label="操作" width="280px" fixed="right">
                    <template #="{ row }">
                        <el-button type="primary" size="small" :icon="row.isSale == 1 ? 'Bottom' : 'Top'"
                            @click="updateSale(row)"></el-button>
                        <el-button type="primary" size="small" icon="edit" @click="updateSku"></el-button>
                        <el-button type="primary" size="small" icon="info-filled" @click="findSku(row)"></el-button>

                        <el-popconfirm :title="`你确定删除${row.skuName}?`" width="200px" @confirm="removeSku(row.id)">
                            <template #reference>
                                <el-button type="primary" size="small" icon="delete"></el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination :pager-count="9" v-model:current-page="pageNo" v-model:page-size="pageSize"
                :page-sizes="[10, 20, 30, 40]" :background="true" layout="prev, pager, next, jumper, ->, sizes, total"
                :total="total" @current-change="getHasSku" @size-change="getHasSku" />

            <el-drawer v-model="drawer">
                <template #header>
                    <h4>查看商品的详情</h4>
                </template>
                <template #default>
                    <div>
                        <el-row style="margin: 10px 0px;">
                            <el-col :span="6">名称</el-col>
                            <el-col :span="18">{{ skuInfo.skuName }}</el-col>
                        </el-row>
                        <el-row style="margin: 10px 0px;">
                            <el-col :span="6">描述</el-col>
                            <el-col :span="18">{{ skuInfo.skuDesc }}</el-col>
                        </el-row>
                        <el-row style="margin: 10px 0px;">
                            <el-col :span="6">价格</el-col>
                            <el-col :span="18">{{ skuInfo.price }}</el-col>
                        </el-row>
                        <el-row style="margin: 10px 0px;">
                            <el-col :span="6">平台属性</el-col>
                            <el-col :span="18">
                                <el-tag style="margin: 5px" v-for="item in skuInfo.skuAttrValueList" :key="item.id">{{
                                    item.valeName }}</el-tag>
                            </el-col>
                        </el-row>
                        <el-row style="margin: 10px 0px;">
                            <el-col :span="6">销售属性</el-col>
                            <el-col :span="18">
                                <el-tag style="margin: 5px" v-for="item in skuInfo.skuAttrValueList" :key="item.id">{{
                                    item.saleAttrValueName }}</el-tag>
                            </el-col>
                        </el-row>
                        <el-row style="margin: 10px 0px;">
                            <el-col :span="6">商品图片</el-col>
                            <el-col :span="18">
                                <el-carousel :interval="4000" type="card" height="200px">
                                    <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
                                        <img :src="item.imgUrl" alt="" style="width: 100%;height: 100%;">
                                    </el-carousel-item>
                                </el-carousel>
                            </el-col>
                        </el-row>
                    </div>
                </template>
                <template #footer>

                </template>
            </el-drawer>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { SkuResponseData } from '../../../api/product/sku/type';
import { reqCancelSale, reqRemoveSku, reqSaleSku, reqSkuInfo, reqSkuList } from '../../../api/product/sku';
import { SkuData } from '../../../api/product/spu/type';
import { ElMessage } from 'element-plus';

let pageNo = ref<number>(1);
let pageSize = ref<number>(10);
let total = ref<number>(0);
let skuArr = ref<SkuData[]>([]);
let drawer = ref<boolean>(false);
let skuInfo = ref<any>({})
onMounted(() => {
    getHasSku();
});

const getHasSku = async () => {
    let result: SkuResponseData = await reqSkuList(pageNo.value, pageSize.value);
    if (result.code == 200) {
        skuArr.value = result.data.records; // 假设返回的数据中包含records字段
        total.value = result.data.total; // 假设返回的数据中包含total字段
    }

};

const updateSale = async (row: SkuData) => {
    if (row.isSale == 1) {
        await reqCancelSale((row.id as number))
        ElMessage({
            type: 'success',
            message: '下架成功'
        });
        getHasSku()
    } else {
        await reqSaleSku((row.id as number));
        ElMessage({
            type: 'success',
            message: '上架成功'
        });
        getHasSku()
    }
}

const updateSku = () => {
    ElMessage({
        type: 'success',
        message: '我正在努力研发中'
    })
}

const findSku = async (row: SkuData) => {
    drawer.value = true
    let result: any = await reqSkuInfo((row.id as number));
    skuInfo.value = result.data;
}
// const handler = (num: number) => {
//     pageNo.value = num;
//     getHasSku()
// }
const removeSku = async (id: number) => {
    let result: any = await reqRemoveSku(id);
    if (result.code == 200) {
        ElMessage({
            type: 'success',
            message: '删除成功'
        })
        getHasSku()
    }
}


</script>

<style scoped>
.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>