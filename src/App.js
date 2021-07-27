import './style/index.less'
import './style/antdGlobal.less'
import Routes from './routes';
import { ErrorBoundary, HeaderCustom } from "./components";
import { Layout, ConfigProvider, Spin } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import 'moment/locale/zh-cn';
import {useState} from "react";


const { Header, Footer, Content } = Layout;

const RoutesCon = ErrorBoundary(Routes)


function App(props) {
    const [load, setLoad] = useState(false)
    return (
        <ConfigProvider locale={zhCN}>
            <Spin spinning={load}>
                <div className="App">
                    <Header className="wrapHeader whole"><HeaderCustom {...{setLoad}} {...props} /></Header>
                    <Content className="wrapContent whole">
                        <RoutesCon {...{setLoad}} />
                        <Footer className="wrapFooter whole" />
                    </Content>
                </div>
            </Spin>
        </ConfigProvider>
    );
}

export default App;
