/*
 * @Author: lijunyang
 * @Date: 2021-07-05 10:10:35
 * @LastEditTime: 2021-07-20 11:01:48
 * @LastEditors: lijunyang
 * @Description: 
 */
import { createRouter,createWebHistory} from "vue-router";
// 路由信息
const routes = [
    {
        path: "/",
        name: "Index",
        component: () => import('../views/index.vue'),
    },
    {
        path: "/getTables",
        name: "showTables",
        component:  () => import('../views/showTables/index.vue'),
    },
];

// 导出路由
const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;