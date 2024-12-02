// 引入项目中全部的全局组件
import SvgIcon from './SvgIcon/index.vue';
import Pagination from './Pagination/index.vue'; // 修正路径
import Category from './Category/index.vue'; // 修正拼写错误
import * as ElementPlusIconsVue from '@element-plus/icons-vue';


// 全局对象
// 全局对象
const allGlobalComponents = { SvgIcon, Pagination, Category } as { [key: string]: any };

// 对外暴露插件对象
export default {
    // 务必叫做 install 方法
    install(app: any) {
        // 注册项目全部的全局组件
        Object.keys(allGlobalComponents).forEach(key => {
            // 注册为全局组件
            app.component(key, allGlobalComponents[key]);
        });
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component);
        }
    }
};