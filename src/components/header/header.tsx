import React, { useEffect, useState } from 'react';
import { Layout, Menu, Button, Avatar } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import styles from './Navbar.module.scss';
import Logo from '../../assets/logo-ccw.png';
import { appDataDir } from '@tauri-apps/api/path';
import { exists, readBinaryFile } from '@tauri-apps/api/fs';
import AvatarIcon from '../avatar';
import { UserOutlined } from '@ant-design/icons';

const items = [
    {
        key: 1,
        label: `主页`,
    },
    {
        key: 2,
        label: `设置`,
    },
    {
        key: 3,
        label: `关于`,
    },
    {
        key: 4,
        label: `赞助`,
    },
];
const { Header } = Layout;

const itemSelect = (e: any) => {
    console.log('item selected:', e);
}

const Navbar: React.FC = () => {
    const [imgSrc, setImgSrc] = useState<boolean>(false);

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
                zIndex: 1,
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
                defaultSelectedKeys={['1']}
                items={items}
                style={{ flex: 1, minWidth: 0 }}
                onSelect={itemSelect}
                onClick={itemSelect}
            />
            <Avatar icon={imgSrc ? <AvatarIcon /> : <UserOutlined />} style={{ backgroundColor: '#bfbfbf' }}>USER</Avatar>
        </Header>
    );
};

export default Navbar;
