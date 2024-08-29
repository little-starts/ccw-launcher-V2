import React from 'react';
import ProjectCard from '../ProjectCard';
import { Empty, Typography, Button, Flex } from 'antd';
import { getCode, Window } from '../../../../globals';
import { Content } from 'antd/es/layout/layout';
import styles from './ProjectList.module.scss';

const handleInstallClick = () => {
    Window.createWindow('install', 'https://www.ccw.site', getCode('install'), '导入作品');
};

interface ProjectListProps {
    projects: Array<{
        name: string,
        url: string,
        cover: string,
        tags: Array<string>,
        description: string,
        authorImg: string,
    }> | undefined;
    tag: string,
    home: boolean,
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, tag, home }) => {


    return (
        <Content className={styles.content}>
            <Flex wrap justify="space-evenly" align="flex-start" gap="middle" className={styles.div}>
                {projects && projects.length > 0 ? projects.map((project, index) => {
                    if (project.tags.includes(tag) || tag === 'all') {
                        return (< ProjectCard
                            key={index}
                            coverURL={project.cover}
                            title={project.name}
                            description={project.description}
                            projectID={project.url.split('/')[4]}
                            authorImg={project.authorImg}
                            local={home}
                        />)
                    }
                }) :
                    <Empty
                        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                        imageStyle={{ height: 60 }}
                        description={
                            <Typography.Text>
                                还没有导入作品哦
                            </Typography.Text>
                        }
                    >
                        <Button type="primary" onClick={handleInstallClick}>立即导入</Button>
                    </Empty>
                }
            </Flex>
        </Content >
    );
};

export default ProjectList;
