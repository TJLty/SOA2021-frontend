import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const app=createApp(App).use(store).use(router).use(ElementPlus, {
    locale: zhCn,
}).mount('#app')
// 统一注册el-icon图标
import * as ElIconModules from '@element-plus/icons'
// 导入转换图标名称的函数
import { transElIconName } from './utils/utils.js'
// 统一注册el-icon图标
for (const iconName in ElIconModules) {
    if (Reflect.has(ElIconModules, iconName)) {
        const item = ElIconModules[iconName];
        app.component(iconName, item)
    }
}

