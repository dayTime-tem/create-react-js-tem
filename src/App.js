import './style/index.less'
import Routes from './routes';
import './style/index.less'
import {errorBoundary} from "./components/highCom/errorBoundary";
import { Layout } from 'antd';

const { Header, Footer, Content } = Layout;

const RoutesCon = errorBoundary(Routes)


function App() {
  return (
    <div className="App">
      <Header >Header</Header>
      <Content><RoutesCon /></Content>
      <Footer>Footer</Footer>
    </div>
  );
}

export default App;
