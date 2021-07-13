import { createRouter,createWebHistory} from "vue-router";
// 路由信息
const routes = [
    {
        path: "/",
        name: "Index",
        component: () => import('../views/index.vue'),
    },
    {
        path: "/showDataBases",
        name: "showDataBases",
        component:  () => import('../views/showDatabases/index.vue'),
    },
    {
        path: "/showTablesDesc",
        name: "showTablesDesc",
        component:  () => import('../views/showTables/indexDesc.vue'),
    },
    {
        path: "/showTables",
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