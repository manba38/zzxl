<template>
    <div>
        <el-form label-width="100px">
            <el-form-item label="SPU名称">
                <el-input placeholder="请你输入SPU名称" v-model="SpuParams.spuName"></el-input>
            </el-form-item>
            <el-form-item label="SPU品牌">
                <el-select v-model="SpuParams.tmId">
                    <el-option v-for="(item) in AllTeadeMark" :key="item.id" :label="item.tmName"
                        :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="SPU描述">
                <el-input type="textarea" aria-placeholder="请你输入SPU描述" v-model="SpuParams.description"></el-input>
            </el-form-item>
            <el-form-item label="SPU图标">
                <el-upload v-model:file-list="imgList" action="/api/admin/product/fileUpload" list-type="picture-card"
                    :on-preview="handlePictureCardPreview" :before-upload="handlerUpload">
                    <el-icon>
                        <Plus />
                    </el-icon>
                </el-upload>

                <el-dialog v-model="dialogVisible">
                    <img w-full :src="dialogImageUrl" style="width: 100%;height:100%;" alt="Preview Image" />
                </el-dialog>
            </el-form-item>
            <el-form-item label="SPU销售属性">
                <el-select v-model="saleAttrIdAndValueName" style="width: 220px;"
                    :placeholder="unSelectSaleAttr.length ? `还未选择${unSelectSaleAttr.length}` : '无'">
                    <el-option :value="`${item.id}:${item.name}`" v-for="(item) in unSelectSaleAttr" :key="item.id"
                        :label="item.name"></el-option>
                </el-select>
                <el-button @click="addSaleAttr" :disabled="saleAttrIdAndValueName ? false : true"
                    style="margin-left: 10px;" type="primary" size="default" icon="Plus">添加属性值</el-button>
                <el-table border style="margin: 10px 0px;" :data="saleAttr">
                    <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
                    <el-table-column label="销售属性名称" width="120px" prop="saleAttrName"></el-table-column>
                    <el-table-column label="销售属性值">
                        <template #="{ row }">
                            <el-tag style="margin:0px 5px; " @close="row.spuSaleAttrValueList.splice(index, 1)"
                                v-for="(item, index) in row.spuSaleAttrValueList" :key="item.id" class="mx-1" closable>
                                {{ item.saleAttrValueName }}
                            </el-tag>
                            <el-input @blur="toLook(row)" v-model="row.saleAttrValue" v-if="row.flag == true"
                                placeholder="请你输入属性值" size="small" style="width: 100px;"></el-input>
                            <el-button @click="toEdit(row)" v-else type="primary" size="small" icon="Plus"></el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="120px">
                        <template #="{ $index }">
                            <el-button type="primary" size="small" icon="Delete"
                                @click="saleAttr.splice($index, 1)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item>
                <el-button :disabled="saleAttr.length > 0 ? false : true" type="primary" size="default"
                    @click="save">保存</el-button>
                <el-button type="primary" size="default" @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { reqAddOrUpdateSpu, reqAllSaleAttr, reqAllTradeMark, reqDpuImageList, reqSpuHassSaleAttr } from '../../../api/product/spu';
import { AllTradeMark, HasSaleAttr, HasSaleAttrResponseData, SaleAttr, SaleAttrResponseData, SaleAttrValue, SpuData, SpuHasImg, SpuImg, Teademark } from '../../../api/product/spu/type';
import { ElMessage } from 'element-plus';



let saleAttrIdAndValueName = ref<string>('');
let $emit = defineEmits(['changescene']);
const cancel = () => {
    $emit('changescene', 0)
}
let AllTeadeMark = ref<Teademark[]>([]);
let imgList = ref<SpuImg[]>([]);
let saleAttr = ref<SaleAttr[]>([]);
let allSaleAttr = ref<HasSaleAttr[]>([]);
let SpuParams = ref<SpuData>(
    {
        category3Id: "",
        description: "",
        spuName: "",
        tmId: '',
        spuImageList: [],
        spuSaleAttrList: [],
    }
)
let dialogImageUrl = ref<string>('');
let dialogVisible = ref<boolean>(false);

const initHasSpuData = async (spu: SpuData) => {
    SpuParams.value = spu;

    let result: AllTradeMark = await reqAllTradeMark();
    let result1: SpuHasImg = await reqDpuImageList((spu.id as number));
    let result2: SaleAttrResponseData = await reqSpuHassSaleAttr((spu.id as number));
    let result3: HasSaleAttrResponseData = await reqAllSaleAttr();

    AllTeadeMark.value = result.data;
    imgList.value = result1.data;
    saleAttr.value = result2.data;
    allSaleAttr.value = result3.data;
    imgList.value = result1.data.map(item => {
        return {
            name: item.imgName,
            url: item.imgUrl
        }
    })

}

const handlePictureCardPreview = (file: any) => {
    dialogImageUrl.value = file.url;
    dialogVisible.value = true
}
const handlerUpload = (file: any) => {
    // 检查文件类型是否为允许的图片格式
    if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/gif') {
        // 检查文件大小是否小于3MB
        if (file.size / 1024 / 1024 < 3) {
            return true;
        } else {
            // 如果文件大小超过3MB，显示错误消息
            ElMessage({
                type: 'error',
                message: '上传文件务必小于3MB'
            });
            return false;
        }
    } else {
        // 如果文件类型不允许，显示错误消息
        ElMessage({
            type: 'error',
            message: '上传文件务必为PNG|JPG|GIF格式'
        });
        return false;
    }
}
let unSelectSaleAttr = computed(() => {
    let unSelectArr = allSaleAttr.value.filter(item => {
        return saleAttr.value.every(item1 => {
            return item.name != item1.saleAttrName;
        });
    })
    return unSelectArr
})
const addSaleAttr = () => {
    const [baseSaleAttrId, saleAttrName] = saleAttrIdAndValueName.value.split(':')
    let newSaleAttr: SaleAttr = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: []
    }
    saleAttr.value.push(newSaleAttr)
    saleAttrIdAndValueName.value = '';
}
const toEdit = (row: SaleAttr) => {
    row.flag = true;
    row.saleAttrValue = ''
}
const toLook = (row: SaleAttr) => {
    const { baseSaleAttrId, saleAttrValue } = row;
    let newSaleAttrValue: SaleAttrValue = {
        baseSaleAttrId,
        saleAttrValueName: (saleAttrValue as string)
    }
    if ((saleAttrValue as string).trim() == '') {
        ElMessage({
            type: 'error',
            message: '属性值不能为空'
        })
        return
    }
    let repeat = row.spuSaleAttrValueList.find(item => {
        return item.saleAttrValueName == saleAttrValue;
    })
    if (repeat) {
        ElMessage({
            type: 'error',
            message: '属性值重复'
        })
        return;
    }
    row.spuSaleAttrValueList.push(newSaleAttrValue);
    row.flag = false;
}
const save = async () => {
    SpuParams.value.spuImageList = imgList.value.map((item: any) => {
        return {
            imgName: item.name,
            imgUrl: (item.response && item.response.data) || item.url
        }
    });
    SpuParams.value.spuSaleAttrList = saleAttr.value;
    let result = await reqAddOrUpdateSpu(SpuParams.value);
    if (result.code == 200) {
        ElMessage({
            type: 'success',
            message: SpuParams.value.id ? '更新成功' : '添加成功'
        })
        $emit('changescene', 0)
    } else {
        ElMessage({
            type: 'error',
            message: SpuParams.value.id ? '更新失败' : '添加失败'
        })
    }
}
const initAddSpu = async (c3Id: number | string) => {
    Object.assign(SpuParams.value, {
        category3Id: "",
        description: "",
        spuName: "",
        tmId: '',
        spuImageList: [],
        spuSaleAttrList: [],
    });
    imgList.value = [];
    saleAttr.value = [];
    saleAttrIdAndValueName.value = '';
    SpuParams.value.category3Id = c3Id;
    let result: AllTradeMark = await reqAllTradeMark();
    let result1: HasSaleAttrResponseData = await reqAllSaleAttr();
    AllTeadeMark.value = result.data;
    allSaleAttr.value = result1.data;

}

defineExpose({ initHasSpuData, initAddSpu })
</script>