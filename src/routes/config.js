const menus = {
    menus: [
        { key: '/app/baseInfoManagement', title: '企业基础信息管理', component: 'ListPage' },
        { key: '/app/leaderboard', title: '指标排行榜', component: 'ListPage' },
        { key: '/app/systemManagement', title: '基础管理', component: 'ListPage', permission: 'is_admin' },
    ],
    others: [
        //非菜单
        { key: '/app/baseInfoManagement/add', title: '新建企业', component: 'EditPage' },
        { key: '/app/systemManagement/add', title: '添加账号', component: 'EditPage', permission: 'is_admin' },
        { key: '/app/baseInfoManagement/edit/:id', title: '修改企业', component: 'EditPage' },
        { key: '/app/baseInfoManagement/info/:id', title: '企业详情', component: 'EditPage' },
        { key: '/app/systemManagement/edit/:id', title: '修改账号', component: 'EditPage', permission: 'is_admin' },
    ],
}
export default menus