import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import Navbar from './components/header/header';
import styles from './App.module.scss';
import Home from './components/body/home';
import { listen } from '@tauri-apps/api/event';
import { Window } from './globals';
import { invoke } from '@tauri-apps/api';

interface CustomEventPayload {
  payload: string;
}

const App: React.FC = () => {
  const [page, setPage] = useState('home');

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

  useEffect(() => {
    setInterval(() => {
      document.querySelectorAll('a').forEach(anchor => {
        if (anchor.getAttribute('hack') !== 'true') {
          anchor.addEventListener('click', (event) => {
            event.preventDefault(); // 阻止默认跳转行为
            const url = anchor.href;
            // 调用 Tauri 命令来打开链接
            if (url)
              invoke('open_in_browser', { url });
          });
          anchor.setAttribute('hack', 'true');
        }
      });
    }, 1000);
  }, [])

  const MyComponent: React.FC<{ page: string }> = ({ page }) => {
    let content;

    switch (page) {
      case 'home':
        content = <Home />;
        break;
      case 'about':
        content = <div>开发中...</div>;
        break;
      case 'sitting':
        content = <div>开发中...</div>;
        break;
      default:
        content = <div>关于我们</div>;
    }

    return (
      <Layout className={styles.content}>
        {content}
      </Layout>
    );
  };

  return (
    <Layout>
      <Navbar change={setPage} />
      <Layout className={styles.content}>
        {
          MyComponent({ page })
        }
      </Layout>
    </Layout>
  );
};

export default App;