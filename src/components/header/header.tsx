import React, { useEffect, useState } from 'react';
import { Layout, Menu, Button, Avatar, Tooltip } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import styles from './Navbar.module.scss';
import Logo from '../../assets/logo-ccw.png';
import { appDataDir } from '@tauri-apps/api/path';
import { exists, readBinaryFile } from '@tauri-apps/api/fs';
import AvatarIcon from './avatar/index';
import { UserOutlined } from '@ant-design/icons';
import { Window } from '../../globals';

const items = [
    {
        key: 'home',
        label: `主页`,
    },
    {
        key: 'sitting',
        label: `设置`,
    },
    {
        key: 'about',
        label: `关于`,
        children: [
            { key: 'witcat', label: '白猫' },
            { key: 'kuke', label: 'kuke工作室' },
        ],
    },
    {
        key: 'sponsor',
        label: `赞助`,
    },
];
const { Header } = Layout;

const itemSelect = ({ item, key, keyPath, selectedKeys, domEvent }: any) => {
    console.log('Selected key:', key);
    // 处理其他逻辑
};

const Navbar: React.FC = () => {
    const [imgSrc, setImgSrc] = useState<boolean>(false);

    const log = () => {
        if (!imgSrc) {
            Window.createWindow('ccw', 'https://www.ccw.site/profile/personal');
        } else {
            Window.createWindow('ccw', 'https://www.ccw.site/profile/personal');
        }
    }

    useEffect(() => {
        const loadImage = async () => {
            try {
                const appDataDirPath = await appDataDir();
                const imgPath = `${appDataDirPath}/headImg.png`;

                // 检查文件是否存在
                const fileExists = await exists(imgPath);

                if (!fileExists) {
                    setImgSrc(false);
                    return;
                } else {
                    setImgSrc(true);
                    return;
                }
            } catch (error) {
                console.error('Error loading image:', error);
                setImgSrc(false);
            }
        };

        loadImage();
    }, []);


    return (
        <Header
            style={{
                position: 'sticky',
                top: 0,
                zIndex: 999,
                width: '100%',
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <img className={styles.logo} src={Logo} />
            <h1 className={styles.title}>共创世界启动器</h1>
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['home']}
                items={items}
                style={{ flex: 1, minWidth: 0 }}
                onSelect={itemSelect}
            />
            <Button type="primary" style={{ marginRight: '20px' }}>去创作</Button>
            <Tooltip title={imgSrc ? '管理账号' : '点击登录'}>
                <Avatar icon={imgSrc ? <AvatarIcon /> : <UserOutlined />} className={styles.avatar} onClick={log}>USER</Avatar>
            </Tooltip>
        </Header>
    );
};

export default Navbar;
