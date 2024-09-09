
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Layout, Menu, Button, Avatar, Tooltip, Dropdown, message, MenuProps } from 'antd';
import styles from './Navbar.module.scss';
import Logo from '../../assets/logo-ccw.png';
import { appDataDir } from '@tauri-apps/api/path';
import { BaseDirectory, readBinaryFile } from '@tauri-apps/api/fs';
import AvatarIcon from './avatar/index';
import { UserOutlined } from '@ant-design/icons';
import { getCode, Window } from '../../globals';

const MenuItems = [
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
    },
    {
        key: 'sponsor',
        label: `赞助`,
    },
];


const HeaderItems: MenuProps['items'] = [
    {
        label: '用户主页',
        key: 'UserHome',
    },
    {
        label: '管理登录',
        key: 'ManagementLogin',
    },
    {
        label: '退出登录',
        key: 'LogOut',
    },
];

const NotLogin: MenuProps['items'] = [
    {
        label: '登录账号',
        key: 'Login',
    },
];

const { Header } = Layout;


interface Navbar {
    change: Dispatch<SetStateAction<string>>;
}

const Navbar: React.FC<Navbar> = ({ change }) => {
    const [imgSrc, setImgSrc] = useState<boolean | string>(false);

    const HeaderItemSelect = ({ key }: any) => {
        switch (key) {
            case 'UserHome':
                Window.createWindow('ManagementLogin', 'https://www.ccw.site/', getCode('userHome'), '个人主页');
                break;
            case 'ManagementLogin':
                Window.createWindow('ManagementLogin', 'https://www.ccw.site/profile/personal', getCode('null'), '管理登录');
                break;
            case 'LogOut':
                Window.createWindow('logout', 'https://www.ccw.site/profile/personal', getCode('logout'), '管理登录');
                message.success('已退出登录');
                break;
            case 'Login':
                Window.createWindow('login', 'https://www.ccw.site/login?redirect=https://www.ccw.site/profile/personal', getCode('login'), '登录');
                break;
            default:
                break;
        }
        console.log('Selected key:', key);
        // 处理其他逻辑
    };
    const itemSelect = ({ key }: any) => {
        console.log('Selected key:', key);
        // 处理其他逻辑
        change(key);
    };

    useEffect(() => {
        const loadImage = async () => {
            try {
                const appDataDirPath = await appDataDir();
                const imgPath = `${appDataDirPath}/headImg.png`;

                // 读取文件内容
                const imageData = await readBinaryFile(imgPath, { dir: BaseDirectory.AppData });
                const imageBlob = new Blob([imageData], { type: 'image/png' });
                const imageUrl = URL.createObjectURL(imageBlob);

                setImgSrc(imageUrl);
            } catch (error) {
                console.error('Error loading image:', error);
                setImgSrc(false);
            }
        };

        loadImage();
    }, []);

    const openGandi = () => {
        Window.createWindow('gandi', 'https://www.ccw.site/workspace/my', getCode('null'), 'Gandi')
    }

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
                items={MenuItems}
                style={{ flex: 1, minWidth: 0 }}
                onSelect={itemSelect}
            />
            <Button type="primary" style={{ marginRight: '20px' }} onClick={openGandi}>去创作</Button>
            <Tooltip title={imgSrc ? '管理账号' : '点击登录'}>
                <Dropdown menu={imgSrc ? { items: HeaderItems, onClick: HeaderItemSelect } : { items: NotLogin, onClick: HeaderItemSelect }} placement="bottomRight" trigger={['click']}>
                    <Avatar icon={imgSrc ? <AvatarIcon /> : <UserOutlined />} className={styles.avatar}>USER</Avatar>
                </Dropdown>
            </Tooltip>
        </Header>
    );

};

export default Navbar;
