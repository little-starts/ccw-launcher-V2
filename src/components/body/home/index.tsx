import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import ProjectCard from './ProjectCard';
import { Button, Flex, FloatButton, Menu, MenuProps, theme } from 'antd'
import styles from './Home.module.scss';
import Sider from 'antd/es/layout/Sider';
import { CommentOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import { Content } from 'antd/es/layout/layout';
import {
    AppstoreOutlined,
    ContainerOutlined,
    DesktopOutlined,
    MailOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
} from '@ant-design/icons';
import ccw from '../../../assets/ccw.svg';
import cocrea from '../../../assets/cocrea.svg';

// 作为 React 组件使用
const items2: Array<any> = [
    {
        key: `ccw`,
        icon: <img src={ccw} alt="" style={{ width: '20px' }} />,
        label: `共创世界`,
        children: new Array(4).fill(null).map((_, j) => {
            const subKey = 1 * 4 + j + 1;
            return {
                key: subKey,
                label: `option${subKey}`,
            };
        }),
    }, {
        key: `cocrea`,
        icon: <img src={cocrea} alt="" style={{ width: '20px' }} />,
        label: `cocrea`,
        children: new Array(4).fill(null).map((_, j) => {
            const subKey = 1 * 4 + j + 1;
            return {
                key: subKey,
                label: `option${subKey}`,
            };
        }),
    },
];


const Home: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [collapsedImpotant, setCollapsedImpotant] = useState(false);

    useEffect(() => {
        window.addEventListener('resize', () => {
            if (window.innerWidth < 600) {
                setCollapsedImpotant(true);
            } else {
                setCollapsedImpotant(false);
            }
        });
    }, []);

    return (
        <Content className={styles.content}>
            <Sider collapsible collapsed={collapsedImpotant ? true : collapsed} onCollapse={(value) => setCollapsed(value)} theme={'light'} className={styles.sider}>
                <Menu theme="light" defaultSelectedKeys={['1']} mode="inline" items={items2} className={styles.menu} />
            </Sider>
            <Flex wrap justify="space-evenly" align="flex-start" gap="middle" className={styles.div}>

                {Array.from({ length: 24 }, (_, i) => (
                    <ProjectCard
                        coverURL='https://m.ccw.site/works-covers/54034737-8e76-4816-8ac4-36d99267a8b0.png'
                        title='[先锋测试]MMO联机枪战'
                        description='测试测试测试'
                    ></ProjectCard>
                ))}

            </Flex>

            <FloatButton.Group
                trigger="click"
                type="primary"
                style={{ insetInlineEnd: 24 }}
                icon={<CustomerServiceOutlined />}
            >
                <FloatButton />
                <FloatButton icon={<CommentOutlined />} />
            </FloatButton.Group>
        </Content >
    );
};

export default Home;
