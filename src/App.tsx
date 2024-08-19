import React, { useEffect } from 'react';
import { Breadcrumb, FloatButton, Layout, Menu, MenuProps, theme } from 'antd';
import Navbar from './components/header/header';
import styles from './App.module.scss';
import Home from './components/body/home';
import { Value, Window } from './globals';

const App: React.FC = () => {
  useEffect(() => {
    console.log(Value.getValue('title'));
    Value.setValue('title', '共创世界启动器');
    Window.createWindow('install', '../index.html', 800, 600);
  }, [])

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