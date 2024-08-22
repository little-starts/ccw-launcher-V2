import React, { useEffect, useState } from "react";
import { Layout, Menu, Button, Avatar, Tooltip } from "antd";
import styles from "./Navbar.module.scss";
import Logo from "../../assets/logo-ccw.png";
import { appDataDir } from "@tauri-apps/api/path";
import { BaseDirectory, readBinaryFile } from "@tauri-apps/api/fs";
import AvatarIcon from "./avatar/index";
import { UserOutlined } from "@ant-design/icons";
import { Window } from "../../globals";

const items = [
  {
    key: "home",
    label: `主页`,
  },
  {
    key: "setting",
    label: `设置`,
  },
  {
    key: "about",
    label: `关于`,
    children: [
      { key: "witcat", label: "白猫" },
      { key: "kuke", label: "kuke工作室" },
    ],
  },
  {
    key: "sponsor",
    label: `赞助`,
  },
];
const { Header } = Layout;

const itemSelect = ({ key }: any) => {
  console.log("Selected key:", key);
  // 处理其他逻辑
};

const login = `
    window.addEventListener('load', function () {
        console.log('Page loaded');
    });
    setTimeout(() => {
        console.log(window.location.pathname);
        if (window.location.pathname !== '/profile/personal') {
            window.__TAURI_INVOKE__('inject_js_with_delay', { value: 'HACK_URL_LOGIN', id: 'login' })
                .then(() => console.log('Rust function called successfully!'))
                .catch((error) => console.error('Failed to call Rust function:', error));
        }
    }, 100);

    if (window.location.pathname === '/profile/personal') {
        setTimeout(() => {
            alert('登录成功');
            const url = document.querySelectorAll('.c-avatar-img')[0].getAttribute('src');
            const urlObj = new URL(url);
            // 设置新的查询参数
            urlObj.search = 'x-oss-process=image/format,png/resize,h_100';

            window.__TAURI_INVOKE__('save_image', { url: urlObj.toString() })
                .then(() => {
                    console.log('Image saved successfully!');
                    window.__TAURI_INVOKE__('post_message', {
                        title: 'ccw',
                        id: 'main',
                        content: 'reload'
                    });
                })
                .catch((error) => console.error('Failed to call Rust function:', error));
        }, 1000);
    }

    console.log('Hello from Tauri!');
`;

const Navbar: React.FC = () => {
  const [imgSrc, setImgSrc] = useState<boolean | string>(false);

  const log = () => {
    if (!imgSrc) {
      Window.createWindow(
        "login",
        "https://www.ccw.site/login?redirect=https://www.ccw.site/profile/personal",
        login,
        "登录"
      );
    } else {
      Window.createWindow(
        "ManagementLogin",
        "https://www.ccw.site/profile/personal",
        "../src/null.js",
        "管理登录"
      );
    }
  };

  useEffect(() => {
    const loadImage = async () => {
      try {
        const appDataDirPath = await appDataDir();
        const imgPath = `${appDataDirPath}/headImg.png`;

        // 读取文件内容
        const imageData = await readBinaryFile(imgPath, {
          dir: BaseDirectory.AppData,
        });
        const imageBlob = new Blob([imageData], { type: "image/png" });
        const imageUrl = URL.createObjectURL(imageBlob);

        setImgSrc(imageUrl);
      } catch (error) {
        console.error("Error loading image:", error);
        setImgSrc(false);
      }
    };

    loadImage();
  }, []);

  return (
    <Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 999,
        width: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <img className={styles.logo} src={Logo} />
      <h1 className={styles.title}>共创世界启动器</h1>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["home"]}
        items={items}
        style={{ flex: 1, minWidth: 0 }}
        onSelect={itemSelect}
        onClick={(e) => {
          Window.postMessage("main", "goOtherPage", e.key);
        }}
      />
      <Button type="primary" style={{ marginRight: "20px" }}>
        去创作
      </Button>
      <Tooltip title={imgSrc ? "管理账号" : "点击登录"}>
        <Avatar
          icon={imgSrc ? <AvatarIcon /> : <UserOutlined />}
          className={styles.avatar}
          onClick={log}
        >
          USER
        </Avatar>
      </Tooltip>
    </Header>
  );
};

export default Navbar;
