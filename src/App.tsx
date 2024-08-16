import React from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import Navbar from './components/header/header';
const { Header, Content, Footer } = Layout;


const App: React.FC = () => {
  return (
    <Layout>
      <Navbar />
      <Content style={{ padding: '0 48px' }}>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default App;