import React, { useEffect } from 'react';
import { Layout } from 'antd';
import Navbar from './components/header/header';
import styles from './App.module.scss';
import Home from './components/body/home';
import { listen } from '@tauri-apps/api/event';

interface CustomEventPayload {
  payload: string;
}

const App: React.FC = () => {

  useEffect(() => {
    console.log('App is mounted');
    listen('ccw', (event: CustomEventPayload) => {
      console.log(event, event.payload, event.payload);
      if (event.payload === 'reload') {
        setTimeout(() => {
          location.reload();
        }, 1000);
      }
    });
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