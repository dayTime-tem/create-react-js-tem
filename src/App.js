import React, {useEffect} from "react";
import './style/index.less'
import './style/antdGlobal.less'
import Routes from './routes';
import { ErrorBoundary, HeaderCustom, MenuItems, SliderMainMenu } from "./components";
import { Layout, ConfigProvider, Spin } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import 'moment/locale/zh-cn';
import {useState} from "react";
import systemNameImg from "@/img/title.png"
import menus from '@/routes/config'
const mode = menus.mode
const { Header, Footer, Content, Sider } = Layout;

const RoutesCon = ErrorBoundary(Routes)

const init = () => {
    let props = {}
    const registerInfo = JSON.parse(window.localStorage.getItem('registerInfo') || "{}")
    if (systemNameImg) props.systemNameImg = systemNameImg
    if (registerInfo) props.registerInfo = registerInfo
    window.systemName = '四川省网信企业数据库'
    return props
}


function App(props) {
    const [load, setLoad] = useState(false)
    const [initProps, setInitProps] = useState(false)
    useEffect(() => {
        setInitProps(init())
    }, [])
    return (
        <ConfigProvider locale={zhCN}>
            <Spin spinning={load}>
                <div className="App">
                    { mode === 0 &&<Header className="wrapHeader whole"><HeaderCustom {...initProps} {...{setLoad}} {...props} /></Header>}
                    <Layout>
                        <Sider theme="light" collapsible={[0].includes(mode)} className="slider" width={320}>
                            {mode === 1 && <SliderMainMenu {...{setLoad}} {...props} {...initProps} />}
                            {mode === 0 && <MenuItems {...{setLoad}} {...props} />}
                        </Sider>
                        <Content className="wrapContent whole">
                            <RoutesCon {...{setLoad}} />
                            <Footer className="wrapFooter whole" />
                        </Content>
                    </Layout>
                </div>
            </Spin>
        </ConfigProvider>
    );
}

export default React.memo(App);
