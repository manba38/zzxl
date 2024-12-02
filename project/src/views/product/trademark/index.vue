<template>
    <div>
        <el-card class="box-card" style="max-width: 100%">
            <el-button type="primary" size="default" icon="Plus" @click="addTradeMark"
                v-has="`btn.Trademark.add`">添加品牌</el-button>
            <el-table style="margin:10px 0px" border :data="trademarkArr">
                <el-table-column prop="date" label="序号" width="80px" align="center" type="index" />
                <el-table-column prop="name" label="品牌名称">
                    <template #="{ row }">
                        <pre style="color: black;">{{ row.tmName }}</pre>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="品牌LOGO">
                    <template #="{ row }">
                        <img :src="row.logoUrl.startsWith('http') ? row.logoUrl : 'http://' + row.logoUrl" alt=""
                            style="width: 100px;height:100px ;">
                    </template>
                </el-table-column>
                <el-table-column prop="caozuo" label="品牌操作">
                    <template #="{ row }">
                        <el-button type="primary" size="small" icon="Edit" @click="updateTradeMark(row)"></el-button>
                        <el-popconfirm :title="`您确定要删除${row.tmName}?`" width="250px" icon="Delete"
                            @confirm="removeTradeMark(row.id)">
                            <template #reference>
                                <el-button type="primary" size="small" icon="Delete"></el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @size-change="gethasTrademark" @current-change="gethasTrademark" :pager-count="9"
                v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[3, 5, 7, 9]" :background="true"
                layout="prev, pager, next,jumper,->,sizes,total" :total="total" />
        </el-card>
        <el-dialog v-model="dialogFormVisible" :title="trademarkParams.id ? '修改品牌' : '添加品牌'">
            <el-form style="width:80%" :model="trademarkParams" :rules="rules" ref="formRef">
                <el-form-item label="品牌名称" label-width="100px" prop="tmName">
                    <el-input placeholder="请您输入品牌名称" v-model="trademarkParams.tmName"></el-input>
                </el-form-item>
                <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
                    <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload" :show-file-list="false"
                        :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button type="primary" size="default" @click="cnancel">取消</el-button>
                <el-button type="primary" size="default" @click="confirm">确认</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, reactive, ref } from 'vue';
import { reqAddOruPDATEtRADEMARK, reqDeleteTrademark, reqHasTradmark } from '../../../api/product/trademark';
import { Records, TradeMark, TradeMarkResponseData } from '../../../api/product/trademark/type';
import { ElMessage, UploadProps } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';

let pageNo = ref<number>(1);
let limit = ref<number>(3);
let total = ref<number>(0);
let dialogFormVisible = ref<boolean>(false);
let trademarkArr = ref<Records>([]);
let formRef = ref();
let trademarkParams = reactive<TradeMark>({
    tmName: '',
    logoUrl: ''
});

const gethasTrademark = async () => {
    let result: TradeMarkResponseData = await reqHasTradmark(pageNo.value, limit.value);
    if (result.code == 200) {
        total.value = result.data.total;
        trademarkArr.value = result.data.records;
    }
};

const addTradeMark = () => {
    dialogFormVisible.value = true;
    trademarkParams.id = 0;
    trademarkParams.tmName = '';
    trademarkParams.logoUrl = '';
    nextTick(() => {
        formRef.value.clearValidate('tmName');
        formRef.value.clearValidate('logoUrl');
    });
};

const updateTradeMark = (row: TradeMark) => {
    dialogFormVisible.value = true;
    Object.assign(trademarkParams, row);
    nextTick(() => {
        formRef.value.clearValidate('tmName');
        formRef.value.clearValidate('logoUrl');
    });
};

const cnancel = () => {
    dialogFormVisible.value = false;
};

const confirm = async () => {
    await formRef.value.validate();
    let result: any = await reqAddOruPDATEtRADEMARK(trademarkParams);
    if (result.code == 200) {
        dialogFormVisible.value = false;
        ElMessage({
            type: 'success',
            message: trademarkParams.id ? '修改品牌成功' : '添加品牌成功'
        });
        gethasTrademark();
    } else {
        ElMessage({
            type: 'error',
            message: trademarkParams.id ? '修改品牌失败' : '添加品牌失败'
        });
        dialogFormVisible.value = false;
    }
};

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.type == `image/png` || rawFile.type == 'image/jpeg' || rawFile.type == 'image/gif') {
        if (rawFile.size / 1024 / 1024 < 4) {
            return true;
        } else {
            ElMessage({
                type: 'error',
                message: '上传文件太大了'
            });
            return false;
        }
    } else {
        ElMessage({
            type: 'error',
            message: '上传文件格式务必为PNG JPG GIF'
        });
        return false;
    }
};

const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
    trademarkParams.logoUrl = response.data;
};

const validatorTmName = (_rule: any, value: any, callBack: any) => {
    if (value.trim().length >= 2) {
        callBack();
    } else {
        callBack(new Error('品牌名称应该大于等于两位'));
    }
};

const validatorLogoUrl = (_rule: any, value: any, callBack: any) => {
    if (value) {
        callBack();
    } else {
        callBack(new Error('LOGO图片务必上传'));
    }
};

const rules = {
    tmName: [
        { required: true, trigger: 'blur', validator: validatorTmName }
    ],
    logoUrl: [
        { required: true, trigger: 'change', validator: validatorLogoUrl }
    ]
};

const removeTradeMark = async (id: number) => {
    let result = await reqDeleteTrademark(id);
    if (result.code == 200) {
        ElMessage({
            type: 'success',
            message: '删除品牌成功'
        });
        gethasTrademark();
    } else {
        ElMessage({
            type: 'error',
            message: '删除品牌失败'
        });
    }
};

onMounted(() => {
    gethasTrademark();
});
</script>

<style scoped>
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>