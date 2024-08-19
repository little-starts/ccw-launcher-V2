import React from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import styles from './ProjectCard.module.scss';

const { Meta } = Card;

interface ProjectCardProps {
    coverURL: string;
    title: string;
    description: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ coverURL, title, description }) => (
    <Card className={styles.card}
        cover={
            <img
                alt="cover"
                src={coverURL}
            />
        }
        actions={[
            <SettingOutlined key="setting" />,
            <EditOutlined key="edit" />,
            <EllipsisOutlined key="ellipsis" />,
        ]}
    >
        <Meta
            avatar={<Avatar src="https://m.xiguacity.cn/avatar/6107c5323e593a0c25f850f8/5952b150-6683-4f63-bd41-0f6791cb068d.jpeg" />}
            title={title}
            description={description}
        />
    </Card>
);

export default ProjectCard;