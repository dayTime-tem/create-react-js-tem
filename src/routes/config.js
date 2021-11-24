import baseInfoManagement from "./icon/icon-1.png"
import leaderboard from "./icon/icon-2.png"
import systemManagement from "./icon/icon-3.png"
const menus = {
    // mode为0：用户卡片在最上方，antd默认左侧菜单的布局。
    // mode为1：菜单栏在左侧，菜单项不多的情况，且只渲染一级菜单
    mode: 1,
    menus: [
        { key: '/app/baseInfoManagement', title: '企业基础信息管理', component: 'ListPage', icon: (<img src={baseInfoManagement} alt=""/>), iconModal: 'vertical' },
        { key: '/app/leaderboard', title: '指标排行榜', component: 'ListPage', icon: (<img data-mode="vertical" src={leaderboard} alt=""/>), iconModal: 'vertical' },
        { key: '/app/systemManagement', title: '基础管理', component: 'ListPage', permission: 'is_admin', icon: (<img data-mode="vertical" src={systemManagement} alt=""/>), iconModal: 'vertical' },
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