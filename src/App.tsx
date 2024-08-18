import React from 'react';
import { Breadcrumb, FloatButton, Layout, Menu, MenuProps, theme } from 'antd';
import Navbar from './components/header/header';
import styles from './App.module.scss';
import Home from './components/body/home';
import Sider from 'antd/es/layout/Sider';


const App: React.FC = () => {

  return (
    <Layout>
      <Navbar />
      <Layout className={styles.content}>
        <Home></Home>
      </Layout>
    </Layout>
  );
};

export default App;