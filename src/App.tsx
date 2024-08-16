import React from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import Navbar from './components/header/header';
import styles from './App.module.scss';
import Home from './components/body/home';
const { Header, Content, Footer } = Layout;


const App: React.FC = () => {
  return (
    <Layout>
      <Navbar />
      <Content className={styles.content}>
        <Home></Home>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default App;