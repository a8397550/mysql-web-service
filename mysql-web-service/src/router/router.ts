/*
 * @Author: lijunyang
 * @Date: 2021-07-05 10:10:35
 * @LastEditTime: 2021-07-21 15:10:07
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
    {
        path: "/queryTables",
        name: "queryTables",
        component:  () => import('../views/showTables/queryTable.vue'),
    },
];

// 导出路由
const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;