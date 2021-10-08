const menus = {
    menus: [
        { key: '/app/baseInfoManagement', title: '企业基础信息管理', component: 'ListPage' },
        { key: '/app/leaderboard', title: '指标排行榜', component: 'ListPage' },
        { key: '/app/systemManagement', title: '基础管理', component: 'ListPage' },
    ],
    others: [
        //非菜单
        { key: '/app/baseInfoManagement/add', title: '新建企业', component: 'EditPage' },
        { key: '/app/systemManagement/add', title: '添加账号', component: 'EditPage' },
        { key: '/app/baseInfoManagement/edit/:id', title: '修改企业', component: 'EditPage' },
        { key: '/app/baseInfoManagement/info/:id', title: '企业详情', component: 'EditPage' },
        { key: '/app/systemManagement/edit/:id', title: '修改企业', component: 'EditPage' },
    ],
}
export default menus