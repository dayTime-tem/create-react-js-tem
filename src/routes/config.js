const menus = {
    menus: [
        //菜单
    ],
    others: [
        //非菜单
        {
            key: '/app/mainPage',
            title: '主页',
            subs: [
                { key: '/app/mainPage/replyList', title: '回复列表', component: 'ListPage', params: '?replyStatus=-1' }
            ]
        },
    ],
}
export default menus