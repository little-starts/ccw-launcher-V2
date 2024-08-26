import React, { useEffect, useState } from 'react';
import ProjectCard from './ProjectCard';
import { Button, Empty, Flex, FloatButton, Menu, Tooltip, Typography } from 'antd'
import {
    ProductOutlined,
    HomeOutlined
} from '@ant-design/icons';
import styles from './Home.module.scss';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import ccw from '../../../assets/ccw.svg';
import cocrea from '../../../assets/cocrea.svg';
import Plus from '../../../assets/plus.svg';
import Install from '../../../assets/install.svg';
import { getCode, Value, Window } from '../../../globals';
import ProjectList from './ProjectList';
import { listen } from '@tauri-apps/api/event';

const handleInstallClick = () => {
    Window.createWindow('install', 'https://www.ccw.site', getCode('install'), '导入作品');
};

// 作为 React 组件使用
const items2: Array<any> = [

];

interface CustomEventPayload {
    payload: string;
}

const Home: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [collapsedImpotant, setCollapsedImpotant] = useState(false);
    const [projects, setProjects] = useState<Array<any> | undefined>([]);
    const [tags, setTags] = useState<Array<any>>([]);
    const [tag, setTag] = useState('all');
    const [Home, setHome] = useState(false);

    useEffect(() => {
        Value.getValue("tags")
            .then((e) => {
                let tags: React.SetStateAction<any[]> = [
                    {
                        key: 'home',
                        label: '主页',
                        icon: <HomeOutlined />,
                    },
                    {
                        key: 'tags',
                        label: '作品分类',
                        icon: <ProductOutlined />,
                        children: [
                            {
                                'key': 'all',
                                'label': '全部',
                            }
                        ]
                    },
                ];
                e.forEach((element: string) => {
                    let tag = {
                        'key': element,
                        'label': element,
                    };
                    tags[1].children.push(tag);
                });
                setTags(tags);
            })
    }, [])

    useEffect(() => {
        window.addEventListener('resize', () => {
            if (window.innerWidth < 600) {
                setCollapsedImpotant(true);
            } else {
                setCollapsedImpotant(false);
            }
        });
    }, []);

    const loadProjects = async () => {
        try {
            Value.getValue("ProjectList")
                .then(projects => {
                    console.log(projects);
                    if (projects) {
                        setProjects(projects);
                    } else {
                        setProjects(undefined);
                    }
                })
        } catch (error) {
            setProjects(undefined);
        }
    };

    useEffect(() => {
        loadProjects();
        console.log('App is mounted');
        listen('ProjectList', (event: CustomEventPayload) => {
            console.log(event, event.payload, event.payload);
            if (event.payload === 'reload') {
                setTimeout(() => {
                    loadProjects();
                }, 1000);
            }
        });
    }, [])

    const handleTagClick = (item: any) => {
        if (item.key === 'home') {
            setHome(true);
            return;
        }
        setHome(false);
        setTag(item.key);
    };

    return (
        <Content className={styles.content}>
            <Sider collapsible collapsed={collapsedImpotant ? true : collapsed} onCollapse={(value) => setCollapsed(value)} theme={'light'} className={styles.sider}>
                <Menu theme="light" defaultSelectedKeys={['all']} mode="inline" items={tags} className={styles.menu} onClick={handleTagClick} />
            </Sider>
            <Flex wrap justify="space-evenly" align="flex-start" gap="middle" className={styles.div}>
                <ProjectList projects={projects} tag={tag} home={Home} />
            </Flex>
            <FloatButton.Group
                trigger="click"
                type="primary"
                style={{ insetInlineEnd: 24 }}
                icon={<img src={Plus} alt="" style={{ width: '18px' }} />}
            >
                <Tooltip placement="left" title="导入游戏">
                    <FloatButton icon={<img src={Install} alt="" style={{ width: '18px' }} onClick={handleInstallClick} />} />
                </Tooltip>
            </FloatButton.Group>
        </Content >
    );
};

export default Home;
